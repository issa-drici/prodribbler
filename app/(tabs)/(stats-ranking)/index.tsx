import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import axios from 'axios';

import { Text, View, ViewScreen } from '@/components/Themed';
import StatCard from '@/components/stats/StatCard';
import clock from '@/assets/icons/clock.png';
import drills from '@/assets/icons/drills.png';
import analytics from '@/assets/icons/analytics.png';
import TrainingCalendar from '@/components/stats/TrainingCalendar';
import TrainingStatsHeader from '@/components/stats/TrainingStatsHeader';
import WeeklyXPChart from '@/components/stats/WeeklyXPChart';
import { ActivityCard } from '@/components/home/RecentActivities/ActivityCard';
import { useHeader } from '@/context/HeaderContext';
import { AuthContext } from '@/context/AuthProvider';


export default function TrainingStats() {
  const [selectedRange, setSelectedRange] = React.useState<'day' | 'week' | 'month'>('day');
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [statsData, setStatsData] = React.useState(null);
  const { user: userAuth } = useContext(AuthContext);

  const fetchStats = useCallback(async (startDate: Date, endDate: Date, period: 'day' | 'week' | 'month') => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth?.token}`;
      const response = await axios.get('https://api.prodribbler.alliance-tech.fr/api/user/stats', {
        params: {
          start_date: format(startDate, 'yyyy-MM-dd'),
          end_date: format(endDate, 'yyyy-MM-dd'),
          period
        }
      });
      setStatsData(response.data);
    } catch (error) {
      console.error('Error while fetching stats:', error);
    }
  }, [userAuth]);

  const handleDateSelect = (selection: {
    day: Date;
    week: Date[];
    month: Date;
    year: number;
    start_date: Date;
    end_date: Date;
  }) => {
    setSelectedDate(selection.day);
    fetchStats(selection.start_date, selection.end_date, selectedRange);
  };

  useEffect(() => {
    // On utilise selectedDate au lieu de today
    let startDate = new Date(selectedDate);
    let endDate = new Date(selectedDate);

    switch (selectedRange) {
      case 'day':
        break;
      case 'week':
        endDate.setDate(selectedDate.getDate() + 6);
        break;
      case 'month':
        if (selectedDate.getDate() === 1) {
          endDate.setMonth(selectedDate.getMonth() + 1, 0);
        } else {
          endDate.setDate(selectedDate.getDate() + 29);
        }
        break;
    }

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    fetchStats(startDate, endDate, selectedRange);
  }, [selectedRange, selectedDate]); // On ajoute selectedDate aux dépendances

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
    <ViewScreen
      headerComponent={
        <TrainingStatsHeader
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
        />
      }
    >
      <View style={styles.container}>
        <TrainingCalendar 
          selectedRange={selectedRange} 
          onDateSelect={handleDateSelect}
        />
        <View style={styles.statsContainer}>
          <View style={styles.stats}>
            <Text style={styles.statsTitle}>Cumulative Metrics</Text>
            <StatCard label="Total drills completed" value={statsData?.videos_completed} icon={drills} fullWidth />
            <StatCard label="Total XP earned" value={statsData?.total_xp} icon={analytics} fullWidth />
            <StatCard label="Total training time" value={formatTime(statsData?.total_training_time)} icon={clock} fullWidth />
          </View>
        </View>
        {statsData?.overall_xp && <WeeklyXPChart data={statsData?.overall_xp} selectedRange={selectedRange} />}
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
