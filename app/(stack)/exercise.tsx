import { Dimensions, ImageBackground, Platform, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

import { Text, View, ViewScreen } from '@/components/Themed';
import videos from '@/assets/data/videos.json';
import GradientToggleButton from '@/components/common/GradientToggleButton';
import { ActivityCard } from '@/components/home/RecentActivities/ActivityCard';
import { Link, useGlobalSearchParams } from 'expo-router';
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { GradientText } from '@/components/GradientText';
import { LinearGradient } from 'expo-linear-gradient';
import { ResizeMode, Video } from 'expo-av';

export default function ExerciseScreen() {
    const { data } = useGlobalSearchParams();

    const parsedData = data ? JSON.parse(data) : {};

    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <ViewScreen headerComponent={
            <>
                <Link href={{
                    pathname: '/(stack)/menu',
                }} asChild style={{ flex: 1 }}>
                    <Pressable>
                        {({ pressed }) => (
                            <View
                                style={{
                                    height: 48,
                                    opacity: pressed ? 0.5 : 1,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    gap: 5,
                                    borderWidth: 1,
                                    borderColor: '#38A8E0',
                                }}
                            >
                                <FontAwesome5 name="heart" size={14} color='#fff' />
                                <GradientText style={{ fontWeight: 'bold', fontSize: 13 }} colors={['#fff', '#38A8E0']}>Add to Favourites</GradientText>
                            </View>
                        )}
                    </Pressable>
                </Link>
                <Pressable style={styles.favouriteButton} onPress={() => setIsPlaying(true)}>
                    {({ pressed }) => (
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#6FD3D1', '#0FB9ED']}
                            style={[styles.startTrainingButton, { opacity: pressed ? 0.5 : 1 }]}
                        >
                            <FontAwesome5 name="running" size={14} />
                            <Text style={styles.startTrainingText}>Start Training</Text>
                        </LinearGradient>
                    )}
                </Pressable>
            </>
        }>
            <View style={styles.imageContainer}>
                {!isPlaying ? (
                    <ImageBackground source={{ uri: parsedData.thumbnail }} resizeMode="cover" style={styles.image}>
                        {parsedData.completed && <View style={styles.completedBadge}>
                            <Text style={styles.completedText}>Completed</Text>
                        </View>}

                        <Pressable onPress={() => setIsPlaying(true)} style={styles.playButton}>
                            <View style={styles.playButtonInner}>
                                <Entypo name="controller-play" size={40} color="#fff" />
                            </View>
                        </Pressable>
                    </ImageBackground>
                ) : (
                    <Video
                        source={{ uri: parsedData.link }}
                        style={styles.video}
                        useNativeControls
                        resizeMode={ResizeMode.COVER}
                        isMuted={false}
                        isLooping
                        shouldPlay
                    />
                )}
            </View>

            <View style={styles.infoRow}>
                <View style={styles.durationContainer}>
                    <Ionicons name="time-outline" size={20} color="#fff" />
                    <Text style={{ color: '#fff', fontSize: 16 }}>{parsedData.duration}</Text>
                </View>
                <View style={styles.difficultyContainer}>
                    <Text style={{ color: '#fff' }}>Difficulty Level:</Text>
                    <GradientText style={{ color: '#fff', fontWeight: 'bold' }} colors={['#fff', '#34819A']}>{parsedData.level}</GradientText>
                </View>
            </View>

            <Text style={styles.title}>{parsedData?.name}</Text>
            <View style={styles.divider} />
            <GradientText style={styles.sectionTitle} colors={['#fff', '#124473']}>Before You Begin</GradientText>
            {parsedData?.beforeYouBegin?.map((instruction: string, index: number) => (
                <View key={index} style={styles.instructionItem}>
                    <View style={styles.instructionBullet} />
                    <Text style={styles.instructionText}>{instruction}</Text>
                </View>
            ))}
            <GradientText style={styles.sectionTitle} colors={['#fff', '#124473']}>Step-by-Step Instructions</GradientText>
            {parsedData?.instructions?.map((instruction: string, index: number) => (
                <View key={index} style={styles.instructionItem}>
                    <View style={styles.instructionBullet} />
                    <Text style={styles.instructionText}>{instruction}</Text>
                </View>
            ))}
            <Text style={styles.description}>
                {parsedData?.description}
            </Text>
            <View style={styles.bottomSpacing} />
        </ViewScreen >
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Header styles
    favouriteButton: {
        flex: 1,
    },
    startTrainingButton: {
        height: 48,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
    },
    startTrainingText: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    // Image section
    imageContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#25BEE6',
    },
    image: {
        flex: 1,
        height: Dimensions.get('window').height * 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        position: 'relative',
    },
    completedBadge: {
        backgroundColor: '#2FB0A4',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 7,
        position: 'absolute',
        top: 15,
        right: 15,
    },
    completedText: {
        fontSize: 16,
        color: '#fff',
    },
    playButton: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 15,
        borderRadius: 110,
    },
    playButtonInner: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 110,
    },
    // Info section
    infoRow: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    durationContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    difficultyContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        backgroundColor: '#171918',
        padding: 10,
        borderRadius: 5,
    },
    // Text styles
    title: {
        fontSize: 28,
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
    },
    sectionTitle: {
        textDecorationLine: 'underline',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
    },
    description: {
        color: '#fff',
        opacity: 0.8,
        fontSize: 14,
        fontFamily: 'Montserrat-Light',
        marginTop: 20,
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#fff',
        opacity: 0.3,
    },
    // Instructions
    instructionItem: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        marginTop: 15,
    },
    instructionBullet: {
        width: 4,
        height: 4,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginTop: 8,
    },
    instructionText: {
        color: '#fff',
        fontSize: 16,
        flex: 1,
        fontWeight: '600',
    },
    bottomSpacing: {
        height: 50,
    },
    video: {
        width: '100%',
        height: Dimensions.get('window').height * 0.25,
    },
});

