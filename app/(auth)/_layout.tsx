import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animation: 'none',
                navigationBarHidden: true,
            }}
        >
            <Stack.Screen
                name="login"
                options={{
                    gestureEnabled: false,
                }}
            />
            <Stack.Screen
                name="signup"
                options={{
                    gestureEnabled: false,
                }}
            />
        </Stack>
    );
} 