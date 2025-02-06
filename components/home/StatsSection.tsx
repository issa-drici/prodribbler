import StatCard from '@/components/stats/StatCard';
import { View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import clock from '@/assets/icons/clock.png';
import lineGraph from '@/assets/icons/line-graph.png';

export function StatsSection({ totalTime, totalXp }: { totalTime: string, totalXp: string }) {

  return (
    <View style={styles.stats}>
      <StatCard label="Total Time Spend on Exercise" value={totalTime} icon={clock} />
      <StatCard label="Total XP Earned" value={totalXp} icon={lineGraph} />
    </View>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
}); 