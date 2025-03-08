import { StyleSheet } from 'react-native';
import { Text, View, ViewScreen } from '@/components/Themed';
import { useContext, useEffect, useState, useCallback } from 'react';
import GradientToggleButton from '@/components/common/GradientToggleButton';
import axios from 'axios';
import { AuthContext } from '@/context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import { LevelCard } from '@/components/LevelCard';
import { useHeader } from '@/context/HeaderContext';

interface Exercise {
  id: string;
  title: string;
  banner_url: string;
  video_url: string;
  duration_seconds: number;
  isCompleted: boolean;
}

interface Level {
  id: string;
  name: string;
  banner_url: string;
  exercises: Exercise[];
  description?: string;
}

interface Categories {
  beginner: Level[];
  intermediate: Level[];
  advanced: Level[];
  [key: string]: Level[];
}

interface ApiResponse {
  categories: Categories;
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m${remainingSeconds.toString().padStart(2, '0')}s`;
};

export default function LevelsScreen() {
  const { setTitle } = useHeader();

  const experienceSteps = [
    '500 XP',
    '1000 XP',
    '1500 XP',
    '2000 XP',
    '2500 XP'
  ];
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [data, setData] = useState<ApiResponse | undefined>();
  const { user } = useContext(AuthContext);

  const getAllExercises = useCallback(async () => {
    if (user) {
      axios.get(`https://api.prodribbler.alliance-tech.fr/api/exercises/user/${user.id}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error while fetching exercises:', error);
        });
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      getAllExercises();
    }, [getAllExercises])
  );

  // console.log(data?.categories?.[selectedLevel][0])

  return (
    <ViewScreen headerComponent={
      <View style={styles.rangeSelector}>
        {['beginner', 'intermediate', 'advanced'].map((level) => (
          <GradientToggleButton
            key={level}
            text={level.charAt(0).toUpperCase() + level.slice(1)}
            isActive={selectedLevel === level}
            onPress={() => setSelectedLevel(level)}
          />
        ))}
      </View>
    }>

      {data?.categories?.[selectedLevel]?.map((level: Level) => {
        const duration = level.exercises.reduce((acc: number, curr: Exercise) => acc + curr.duration_seconds, 0)
        const isCompleted = level.exercises.every((exercise: Exercise) => exercise.isCompleted)
        const totalExercises = level.exercises.length
        const completedExercises = level.exercises.filter((exercise: Exercise) => exercise.isCompleted).length

        return (
          <LevelCard
            key={level.id}
            id={level.id}
            blackBackground
            image={level.banner_url}
            title={level.name}
            description={level.description || ''}
            isCompleted={isCompleted}
            duration={duration}
            totalExercises={totalExercises}
            completedExercises={completedExercises}
          />
        )
      })}
    </ViewScreen>
  );
}

const styles = StyleSheet.create({
  rangeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    gap: 10,
  },
});
