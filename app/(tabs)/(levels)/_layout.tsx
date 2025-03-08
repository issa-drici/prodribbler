import { Stack } from 'expo-router';
import React from 'react';

export default function RankingsLevels() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="index"
            />
            <Stack.Screen
                name="exercises"
            />
        </Stack>
    );
} 