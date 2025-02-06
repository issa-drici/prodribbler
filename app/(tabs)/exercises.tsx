import { StyleSheet } from 'react-native';
import { View, ViewScreen } from '@/components/Themed';
import { ActivityCard } from '@/components/home/RecentActivities/ActivityCard';
import { useContext, useEffect, useState, useCallback } from 'react';
import GradientToggleButton from '@/components/common/GradientToggleButton';
import axios from 'axios';
import { AuthContext } from '@/context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m${remainingSeconds.toString().padStart(2, '0')}s`;
};

export default function ExercisesScreen() {
  const experienceSteps = [
    '500 XP',
    '1000 XP',
    '1500 XP',
    '2000 XP',
    '2500 XP'
  ];
  const [selectedLevel, setSelectedLevel] = useState('beginner');
  const [data, setData] = useState();
  const { user } = useContext(AuthContext);

  const getAllExercises = useCallback(async () => {
    if (user) {
      axios.get(`https://api.prodribbler.alliance-tech.fr/api/exercises/user/${user.id}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      getAllExercises();
    }, [getAllExercises])
  );

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

      {data?.levels[selectedLevel].map((video) => (
        <ActivityCard
          key={video.id}
          blackBackground
          image={video.banner_url}
          title={video.title}
          description={`Découvrez cet exercice de ${video.title} de niveau ${selectedLevel} dès maintenant !`}
          isCompleted={video.isCompleted}
          exerciseData={{
            id: video.id,
            name: video.title,
            duration: video.duration_seconds,
            level: selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1),
            completed: true,
            thumbnail: video.banner_url,
            link: video.video_url,
           
          }}
        />))}
    </ViewScreen>
  );
}

const styles = StyleSheet.create({
  rangeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 8,
    padding: 4,
    gap: 10,
  },
});
