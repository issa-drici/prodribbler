import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';

type PropsStatCard = {
  label: string,
  value: string,
  icon: keyof typeof Entypo.glyphMap,
  fullWidth?: boolean,
  backgroundColor?: string,
}

export default function StatCard({ label, value, icon, fullWidth, backgroundColor }: PropsStatCard) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={backgroundColor ? [backgroundColor, backgroundColor] : ['#1C2324', '#181E20']}
      style={[styles.card, fullWidth ? {
        paddingVertical: 20,
        paddingHorizontal: 18
      } : {
        paddingTop: 11,
        paddingBottom: 14,
        paddingLeft: 11,
        paddingRight: 9,
      }]}>
      <View style={styles.cardContent}>
        <Text
          style={styles.value}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {value}
        </Text>
        <Image source={icon} style={{ width: fullWidth ? 53 : 32, height: fullWidth ? 53 : 32 }} resizeMode="contain" />
      </View>
      <Text
        style={[styles.label, { fontSize: fullWidth ? 13 : 9 }]}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)">
        {label}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#1C2324',
    borderRadius: 20,
    gap: 7,
  },
  value: {
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    fontSize: 11,
    color: '#C4DCD9',
  },
});
