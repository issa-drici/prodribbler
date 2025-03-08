import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';

type GradientToggleButtonProps = {
    text: string;
    isActive: boolean;
    onPress: () => void;
    activeColors?: string[];
    style?: object;
};

export default function GradientToggleButton({
    text,
    isActive,
    onPress,
    activeColors = ['#6FD3D1', '#0FB9ED'],
    style
}: GradientToggleButtonProps) {
    return (
        <Pressable onPress={onPress} style={styles.pressable}>
            {({ pressed }) => (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={isActive ? activeColors : ['transparent', 'transparent']}
                    style={[
                        styles.button,
                        { opacity: pressed ? 0.8 : 1 },
                        style
                    ]}
                >
                    <Text style={[styles.text, isActive && styles.textActive]}>
                        {text}
                    </Text>
                </LinearGradient>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        flex: 1,
    },
    button: {
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 8,
        borderRadius: 12,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: '#333333',
    },
    text: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },
    textActive: {
        color: '#000',
    },
}); 