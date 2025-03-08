import React from 'react';
import { Pressable, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Text } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';

type GradientButtonProps = {
    onPress?: () => void;
    text: string;
    icon?: ImageSourcePropType;
    colors?: readonly [string, string, ...string[]];
    style?: object;
    textStyle?: object;
};

const GradientButton = React.forwardRef<any, GradientButtonProps>(({ 
    onPress, 
    text, 
    icon, 
    colors = ['#6FD3D1', '#0FB9ED'] as const,
    style,
    textStyle
}, ref) => {
    return (
        <Pressable ref={ref} onPress={onPress} style={styles.pressable}>
            {({ pressed }) => (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={colors}
                    style={[styles.gradientButton, { opacity: pressed ? 0.5 : 1 }, style]}
                >
                    {icon && <Image source={icon} style={styles.icon} />}
                    <Text style={[styles.buttonText, textStyle]}>{text}</Text>
                </LinearGradient>
            )}
        </Pressable>
    );
});

// Pour éviter les problèmes avec React DevTools
GradientButton.displayName = 'GradientButton';

export default GradientButton;

const styles = StyleSheet.create({
    pressable: {
        width: '100%',
    },
    gradientButton: {
        height: 48,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5
    },
    buttonText: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#000',
        fontSize: 12
    },
    icon: {
        width: 20,
        height: 20,
    }
}); 