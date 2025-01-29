import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';

import { View, ViewScreen } from '@/components/Themed';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import { GradientText } from '@/components/GradientText';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

export default function MenuScreen() {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.replace('/login');
    };

    return (
        <ViewScreen>
            <Pressable onPress={handleLogout}>
                {({ pressed }) => (
                    <View>
                        <GradientText colors={['#fff', '#38A8E0']}>
                            Se déconnecter
                        </GradientText>
                    </View>
                )}
            </Pressable>
        </ViewScreen>
    );
}
