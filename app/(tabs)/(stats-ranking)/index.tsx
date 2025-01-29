import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';

import { Text, View, ViewScreen } from '@/components/Themed';
import StatCard from '@/components/stats/StatCard';
import clock from '@/assets/icons/clock.png';
import drills from '@/assets/icons/drills.png';
import analytics from '@/assets/icons/analytics.png';
import TrainingCalendar from '@/components/stats/TrainingCalendar';
import TrainingStatsHeader from '@/components/stats/TrainingStatsHeader';
import WeeklyXPChart from '@/components/stats/WeeklyXPChart';
import { ActivityCard } from '@/components/home/RecentActivities/ActivityCard';
import { useHeader } from '@/contexts/HeaderContext';


export default function TrainingStats() {
  const [selectedRange, setSelectedRange] = React.useState<'day' | 'week' | 'month'>('week');

  const weeklyData = [
    { day: 'Mon', xp: 750 },
    { day: 'Tue', xp: 0 },
    { day: 'Wed', xp: 0 },
    { day: 'Thu', xp: 750 },
    { day: 'Fri', xp: 300 },
    { day: 'Sat', xp: 300 },
    { day: 'Sun', xp: 1500 },
  ];

  return (
    <ViewScreen
      headerComponent={
        <TrainingStatsHeader
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
        />
      }
    >
      <View style={styles.container}>
        <TrainingCalendar selectedRange={selectedRange} />
        <View style={styles.statsContainer}>
          <View style={styles.stats}>
            <Text style={styles.statsTitle}>Cumulative Metrics</Text>
            <StatCard label="Total drills completed" value="50" icon={drills} fullWidth />
            <StatCard label="Total XP earned" value="2500" icon={analytics} fullWidth />
            <StatCard label="Total training time" value="3h 45min" icon={clock} fullWidth />
          </View>
        </View>
      
        <WeeklyXPChart data={weeklyData} />
      </View>
    </ViewScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    paddingTop: Platform.OS === 'android' ? 15 : 0,
  },
  statsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#121212',
    borderRadius: 20,
    padding: 20,
  },
  stats: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
  },
  statsTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    marginBottom: 10,
  },
});
