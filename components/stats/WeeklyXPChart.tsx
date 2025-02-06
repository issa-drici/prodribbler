import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type WeeklyXPChartProps = {
  data: {
    day: string;
    xp: number;
  }[];
  maxValue?: number;
  selectedRange?: string;
};

export default function WeeklyXPChart({ data, maxValue = 1500, selectedRange }: WeeklyXPChartProps) {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const getBarHeight = (value: number) => {
    if (value === 0) return 5; // Hauteur minimale pour les barres à 0 XP
    return Math.max(10, (value / maxValue) * 250); // 250px est la hauteur maximale de la barre
  };

  const handleBarPress = (day: string) => {
    setSelectedDay(day === selectedDay ? null : day);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overall XP Earned In a {selectedRange}</Text>
      
      <View style={styles.chart}>
        {/* Lignes horizontales */}
        <View style={styles.gridLines}>
          <View style={styles.gridLineContainer}>
            <Text style={styles.gridValue}>{maxValue}</Text>
            <View style={styles.gridLine} />
          </View>
          <View style={styles.gridLineContainer}>
            <Text style={styles.gridValue}>{Math.round(maxValue * 2/3)}</Text>
            <View style={styles.gridLine} />
          </View>
          <View style={styles.gridLineContainer}>
            <Text style={styles.gridValue}>{Math.round(maxValue * 1/3)}</Text>
            <View style={styles.gridLine} />
          </View>
          <View style={styles.gridLineContainer}>
            <Text style={styles.gridValue}>0</Text>
            <View style={styles.gridLine} />
          </View>
        </View>

        {/* Barres du graphique */}
        <View style={styles.barsContainer}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.day}
              style={[
                styles.barWrapper,
                { width: data.length === 1 ? '100%' : '12%' },
                selectedDay === item.day && styles.selectedBarWrapper
              ]}
              onPress={() => handleBarPress(item.day)}
            >
              <View style={styles.barContainer}>
                {selectedDay === item.day ? (
                  <>
                    <LinearGradient
                      colors={['#64D2FF', '#64D2FF']}
                      style={[styles.bar, { height: getBarHeight(item.xp) }]}
                    />
                    <View style={styles.xpBubble}>
                      <Text style={styles.xpValue}>{item.xp}</Text>
                      <Text style={styles.xpLabel}>XP earned</Text>
                    </View>
                  </>
                ) : (
                  <View 
                    style={[
                      styles.bar, 
                      { height: getBarHeight(item.xp), backgroundColor: '#1C1C1C' }
                    ]} 
                  />
                )}
              </View>
              <Text style={styles.dayLabel}>{item.day}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    color: '#fff',
    marginBottom: 20,
  },
  chart: {
    height: 286,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  gridLines: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 13,
    justifyContent: 'space-between',
  },
  gridLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  gridLine: {
    height: 1,
    flex: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: 'transparent',
  },
  gridValue: {
    color: '#FFFFFF',
    fontSize: 14,
    width: 35,
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: 40,
  },
  barWrapper: {
    alignItems: 'center',
    width: '12%',
    zIndex: 1,
  },
  selectedBarWrapper: {
    zIndex: 10,
  },
  barContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  bar: {
    width: '100%',
    borderRadius: 8,
    minHeight: 5, // Assure une hauteur minimale
  },
  dayLabel: {
    color: '#FFFFFF',
    marginTop: 10,
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    width: '100%',
  },
  xpBubble: {
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    width: 100,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  xpValue: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#000000',
  },
  xpLabel: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#666666',
  },
}); 