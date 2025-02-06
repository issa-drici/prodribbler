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
             <Stack.Screen
                name="faq"
                options={{
                    headerTransparent: true,
                    header: () => <Header title="FAQ" />,
                  }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    headerTransparent: true,
                    header: () => <Header title="Account Setting" />,
                  }}
            />
        </Stack>
    );
} 