import { StyleSheet } from 'react-native';
import { ViewScreen } from '@/components/Themed';
import { StatsSection } from '@/components/home/StatsSection';
import { PlayerSection } from '@/components/home/PlayerSection';
import { ActionButtons } from '@/components/home/ActionButtons';
import { ExperienceCard } from '@/components/home/ExperienceCard';
import { RecentActivities } from '@/components/home/RecentActivities';

export default function HomeScreen() {
  return (
    <ViewScreen>
      <StatsSection />
      <PlayerSection />
      <ActionButtons />
      <ExperienceCard />
      <RecentActivities />
    </ViewScreen>
  );
}