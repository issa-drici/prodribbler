import React from 'react';
import {  Tabs } from 'expo-router';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// @ts-ignore
import homeActive from '@/assets/icons/home-active.png';
// @ts-ignore
import homeInactive from '@/assets/icons/home-inactive.png';

// @ts-ignore
import exercisesActive from '@/assets/icons/exercises-active.png';
// @ts-ignore
import exercisesInactive from '@/assets/icons/exercises-inactive.png';

// @ts-ignore
import trainingStatsActive from '@/assets/icons/training-stats-active.png';
// @ts-ignore
import trainingStatsInactive from '@/assets/icons/training-stats-inactive.png';

// @ts-ignore
import profileActive from '@/assets/icons/profile-active.png';
// @ts-ignore
import profileInactive from '@/assets/icons/profile-inactive.png';


import { Header } from '@/components/Header';
import { TabBarButton } from '@/components/TabBarButton';
import { Platform } from 'react-native';


const TAB_BAR_STYLE = {
  backgroundColor: '#000',
  borderTopWidth: 0,
  borderTopLeftRadius: 15.35,
  borderTopRightRadius: 15.35,
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: Platform.OS === 'android' ? 75 : 100,
  paddingTop: 8,
} as const;

interface TabConfig {
  name: string;
  title?: string;
  label: string;
  activeIcon: any;
  inactiveIcon: any;
  withoutRounding?: boolean;
}

const TABS_CONFIG: TabConfig[] = [
  {
    name: 'index',
    title: 'Welcome to ProDribbler',
    label: 'Home',
    activeIcon: homeActive,
    inactiveIcon: homeInactive,
  },
  {
    name: '(levels)',
    // title: 'ProDribbler Levels',
    label: 'Levels',
    activeIcon: exercisesActive,
    inactiveIcon: exercisesInactive,
    withoutRounding: true,

  },

  {
    name: '(stats-ranking)',
    // title: 'Training & Stats',
    label: 'Training/Stats',
    activeIcon: trainingStatsActive,
    inactiveIcon: trainingStatsInactive,
    withoutRounding: true,
  },

  {
    name: 'profile',
    title: 'Your Profile',
    label: 'Profile',
    activeIcon: profileActive,
    inactiveIcon: profileInactive,
  },

] as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: useClientOnlyValue(false, true),
      }}>
      {TABS_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            headerTransparent: true,
            header: () => <Header title={tab.title} withoutRounding={tab.withoutRounding ?? false} />,
            tabBarStyle: TAB_BAR_STYLE,
            tabBarButton: (props: any) => (
              <TabBarButton
                {...props}
                activeIcon={tab.activeIcon}
                inactiveIcon={tab.inactiveIcon}
                label={tab.label}
                isSelected={props.accessibilityState?.selected}
              />
            ),
            tabBarLabel: () => null,
          }}
        />
      ))}
    </Tabs>
  );
}
