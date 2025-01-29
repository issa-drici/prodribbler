import { Stack } from 'expo-router';
import React from 'react';

export default function RankingsLayout() {
    return (
        <Stack screenOptions={{ 
            headerShown: false,
            gestureEnabled: false
        }}>
            <Stack>
                <Stack.Screen
                    name="login"
                />
                <Stack.Screen
                    name="signup"
                />
            </Stack>
        </Stack>
    );
} 