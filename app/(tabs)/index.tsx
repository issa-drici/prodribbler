import { StyleSheet } from 'react-native';
import { ViewScreen } from '@/components/Themed';
import { StatsSection } from '@/components/home/StatsSection';
import { PlayerSection } from '@/components/home/PlayerSection';
import { ActionButtons } from '@/components/home/ActionButtons';
import { ExperienceCard } from '@/components/home/ExperienceCard';
import { RecentActivities } from '@/components/home/RecentActivities';
import { AuthContext } from '@/context/AuthProvider';
import { useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { user: userAuth } = useContext(AuthContext);
  const [homeData, setHomeData] = useState<any>(null);

  const fetchHomeData = useCallback(() => {
    if (userAuth) {
      setIsLoading(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth?.token}`;
      axios.get('https://api.prodribbler.alliance-tech.fr/api/home')
        .then(response => {
          setHomeData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        }).finally(() => {
          setIsLoading(false);
        });
    }
  }, [userAuth]);

  useFocusEffect(
    useCallback(() => {
      fetchHomeData();
    }, [fetchHomeData])
  );

  const formatTime = (totalSeconds: number): string => {
    if (!totalSeconds) return '0s';
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h${minutes}m`;
    }
    
    if (minutes > 0) {
      return `${minutes}m${seconds}s`;
    }

    return `${seconds}s`;
  };

  return (
    <ViewScreen>
      <StatsSection totalTime={formatTime(homeData?.stats?.total_training_time)} totalXp={homeData?.stats?.total_xp} />
      <PlayerSection user={userAuth} totalTime={formatTime(homeData?.stats?.total_training_time)} drills={homeData?.stats?.completed_videos} profileImageUrl={homeData?.user?.avatar_url} />
      <ActionButtons />
      <ExperienceCard totalXp={homeData?.stats?.total_xp} />
      <RecentActivities activities={homeData?.recent_exercises} />
    </ViewScreen>
  );
}