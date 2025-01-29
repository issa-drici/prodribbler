import { Stack } from 'expo-router';
import React from 'react';

export default function RankingsLayout() {
    return (

        <Stack screenOptions={{ headerShown: false }}>
            <Stack>
                <Stack.Screen
                    name="index"
                />
                <Stack.Screen
                    name="rankings"
                />
            </Stack>
        </Stack>
    );
} 