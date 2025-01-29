import React from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import podium from '@/assets/icons/podium.png';
import GradientButton from '@/components/common/GradientButton';
import GradientToggleButton from '@/components/common/GradientToggleButton';

type TrainingStatsHeaderProps = {
    selectedRange: 'day' | 'week' | 'month';
    setSelectedRange: (range: 'day' | 'week' | 'month') => void;
};

export default function TrainingStatsHeader({ selectedRange, setSelectedRange }: TrainingStatsHeaderProps) {
    return (
        <View style={styles.header}>
            <View style={styles.rangeSelector}>
                {['day', 'week', 'month'].map((range) => (
                    <GradientToggleButton
                        key={range}
                        text={range.charAt(0).toUpperCase() + range.slice(1)}
                        isActive={selectedRange === range}
                        onPress={() => setSelectedRange(range as 'day' | 'week' | 'month')}
                    />
                ))}
            </View>
            <Link href={{
                pathname: '/(tabs)/(stats-ranking)/rankings',
                params: {
                    data: JSON.stringify({
                        category: 'Dribbling Drill',
                        name: 'Kids Soccer Agility Drills',
                        duration: '3h45m',
                        level: 'Intermediate',
                        completed: true,
                        link: 'https://videos.pexels.com/video-files/8938122/8938122-uhd_2560_1440_25fps.mp4',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.',
                        instructions: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed do eiusmod.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Sed do eiusmod.']

                    }),
                },
            }} asChild style={styles.linkContainer}>
                <GradientButton
                    text="Pro Dribbler Rankings"
                    icon={podium}
                />
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        marginVertical: 18,
        gap: 10,
    },
    rangeSelector: {
        width: '100%',
        flexDirection: 'row',
        borderRadius: 8,
        gap: 10,
    },
    pressable: {
        flex: 1,
    },
    rangeButton: {
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 8,
        borderRadius: 12,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: '#333333',
    },
    rangeButtonText: {
        color: '#fff',
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },
    rangeButtonTextActive: {
        color: '#000',
    },
    linkContainer: {
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
    podium: {
        width: 20,
        height: 20,
    }
}); 