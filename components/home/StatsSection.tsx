import StatCard from '@/components/stats/StatCard';
import { View } from '@/components/Themed';
import { StyleSheet } from 'react-native';
import clock from '@/assets/icons/clock.png';
import lineGraph from '@/assets/icons/line-graph.png';

export function StatsSection() {
  return (
    <View style={styles.stats}>
      <StatCard label="Total Time Spend on Exercise" value="1" icon={clock} />
      <StatCard label="Total XP Earned" value="500" icon={lineGraph} />
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