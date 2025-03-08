import { StyleSheet } from 'react-native';
import { Text, View, ViewScreen } from '@/components/Themed';
import { ActivityCard } from '@/components/home/RecentActivities/ActivityCard';
import { useContext, useEffect, useState, useCallback } from 'react';
import GradientToggleButton from '@/components/common/GradientToggleButton';
import axios from 'axios';
import { AuthContext } from '@/context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { useHeader } from '@/context/HeaderContext';

// Définition des types pour les données
interface Exercise {
  id: string;
  title: string;
  banner_url: string;
  video_url: string;
  duration_seconds: number;
  isCompleted: boolean;
}

interface ExerciseData {
  name: string;
  exercises: Exercise[];
}

interface ApiResponse {
  data: ExerciseData;
}

export default function ExercisesScreen() {
  const params = useLocalSearchParams();
  const levelId = params.level_id;

  const [data, setData] = useState<ApiResponse | undefined>();
  const { user } = useContext(AuthContext);
  const { setTitle } = useHeader();

  const getAllExercisesByLevelId = useCallback(async () => {
    if (user) {
      setTitle(null);
      
      await axios.get(`https://api.prodribbler.alliance-tech.fr/api/exercises/level/${levelId}/user/${user.id}`)
        .then((response) => {
          setData(response.data);
          if (response.data?.data?.name) {
            setTitle(response.data.data.name);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user, levelId, setTitle]);

  useFocusEffect(
    useCallback(() => {
      setTitle("Exercices");
      getAllExercisesByLevelId();
    }, [getAllExercisesByLevelId, setTitle])
  );


  console.log(data)

  return (
    <ViewScreen>

      {data?.data?.exercises?.map((video: Exercise) => (
        <ActivityCard
          key={video.id}
          blackBackground
          image={video.banner_url}
          title={video.title}
          description={`Discover this exercise of ${video.title} of level now !`}
          isCompleted={video.isCompleted}
          exerciseData={{
            id: video.id,
            name: video.title,
            duration: video.duration_seconds,
            level: data?.data?.category.charAt(0).toUpperCase() + data?.data?.category.slice(1),
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
