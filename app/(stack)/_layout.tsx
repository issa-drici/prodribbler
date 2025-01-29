import { Header } from '@/components/Header';
import { Stack } from 'expo-router';
import React from 'react';

export default function RankingsLayout() {
    return (

        <Stack>
            <Stack.Screen
                name="menu"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="exercise"
                options={{
                    title: 'Exercise',
                    headerTransparent: true,
                    header: () => <Header title="Exercise" withoutRounding />,
                
                  }}
            />
        </Stack>
    );
} 