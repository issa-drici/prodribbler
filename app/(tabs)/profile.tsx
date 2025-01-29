import { StyleSheet } from 'react-native';
import { View, ViewScreen } from '@/components/Themed';
import { PlayerSection } from '@/components/home/PlayerSection';
import { ExperienceCard } from '@/components/home/ExperienceCard';
import { RecentActivities } from '@/components/home/RecentActivities';
import StatCard from '@/components/stats/StatCard';
import clock from '@/assets/icons/clock.png';
import drills from '@/assets/icons/drills.png';
import analytics from '@/assets/icons/analytics.png';

export default function ProfileScreen() {
  return (
    <ViewScreen>
      <PlayerSection />
      <View style={styles.statsContainer}>
        <StatCard backgroundColor="#121212C7" label="Total drills completed" value="50" icon={drills} fullWidth />
        <StatCard backgroundColor="#121212C7" label="Total XP earned" value="2500" icon={analytics} fullWidth />
        <StatCard backgroundColor="#121212C7" label="Total training time" value="3h 45min" icon={clock} fullWidth />
      </View>
      <ExperienceCard />
      <RecentActivities />
    </ViewScreen>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    gap: 10,
    width: '100%',
  },
});