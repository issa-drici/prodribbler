import { StyleSheet } from 'react-native';
import { Text, View, ViewScreen } from '@/components/Themed';
import { PlayerSection } from '@/components/home/PlayerSection';
import { RecentActivities } from '@/components/home/RecentActivities';
import StatCard from '@/components/stats/StatCard';
import clock from '@/assets/icons/clock.png';
import drills from '@/assets/icons/drills.png';
import analytics from '@/assets/icons/analytics.png';
import { useContext, useState, useCallback } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityCard } from '@/components/home/RecentActivities/ActivityCard';
import { GradientText } from '@/components/GradientText';

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { user: userAuth } = useContext(AuthContext);
  const [profileData, setProfileData] = useState<any>(null);

  const fetchProfileData = useCallback(() => {
    if (userAuth) {
      setIsLoading(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth?.token}`;
      axios.get('https://api.prodribbler.alliance-tech.fr/api/profile')
        .then(response => {
          setProfileData(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données du profil:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userAuth]);

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, [fetchProfileData])
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
      <PlayerSection user={userAuth} totalTime={formatTime(profileData?.stats?.total_training_time)} drills={profileData?.stats?.completed_videos} />

      <View style={styles.goalsContainer}>
        <GradientText style={styles.headerTitle}>Current Goals</GradientText>
        <Text style={styles.goals}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <StatCard backgroundColor="#121212C7" label="Total drills completed" value={profileData?.stats?.completed_videos} icon={drills} fullWidth />
        <StatCard backgroundColor="#121212C7" label="Total XP earned" value={profileData?.stats?.total_xp} icon={analytics} fullWidth />
        <StatCard backgroundColor="#121212C7" label="Total training time" value={formatTime(profileData?.stats?.total_training_time)} icon={clock} fullWidth />
      </View>

      {profileData?.favorites?.length > 0 && (
        <View style={styles.container}>
          <GradientText style={styles.headerTitle}>Recent Favorites</GradientText>
          <Text style={styles.headerDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.
          </Text>

          {profileData?.favorites?.map((activity: any) => (
            <ActivityCard
              key={activity.id}
              image={activity.banner_url}
              title={activity.title}
              description={`Découvrez cet exercice ${activity.title} dès maintenant !`}
              exerciseData={activity}
            />
          ))}
        </View>
      )}
    </ViewScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161817',
    borderRadius: 20,
    marginTop: 30,
    padding: 20
  },
  goalsContainer: {
    backgroundColor: '#161817',
    borderRadius: 20,
    marginVertical: 10,
    padding: 20
  },
  goals: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5
  },
  headerDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    marginBottom: 25
  },
  statsContainer: {
    gap: 10,
    width: '100%',
  },
});