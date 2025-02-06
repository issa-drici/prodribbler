import { Dimensions, ImageBackground, Platform, Pressable, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

import { Text, View, ViewScreen } from '@/components/Themed';
import { Link, useGlobalSearchParams } from 'expo-router';
import { Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { GradientText } from '@/components/GradientText';
import { LinearGradient } from 'expo-linear-gradient';
import { ResizeMode, Video } from 'expo-av';
import { AuthContext } from '@/context/AuthProvider';

export default function ExerciseScreen() {
    const beforeYouBeginSteps = [
        'Repeat each drill at least 3 times for 30 seconds',
        'Rest for 15 seconds between sets',
        'Choose your own tempo'
    ];

    const instructionSteps = [
        'Identify the part of the foot that will contact the ball in each drill',
        'Each drill focuses on training a different aspect of the game',
        'For more information, tap on each foot shown below each drill'
    ];

    const descriptionText = 'Remember, the lines and numbers on the Ball Mastery Mat are simply guides to help players understand and learn the drills more quickly. Don\'t get frustrated if the ball doesn\'t follow the lines and numbers perfectly. What\'s most important is that the move you\'re trying to execute is correct.';

    const { data } = useGlobalSearchParams();
    const parsedData = data ? JSON.parse(data) : {};
    const [isPlaying, setIsPlaying] = useState(false);
    const [watchTime, setWatchTime] = useState(0);
    const videoRef = useRef(null);
    const { user: userAuth } = useContext(AuthContext);
    const lastProcessedTime = useRef(0);
    const [exerciseData, setExerciseData] = useState(null);

    const fetchExerciseData = useCallback(async () => {
        if (userAuth && parsedData.id) {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth?.token}`;
                const response = await axios.get(
                    `https://api.prodribbler.alliance-tech.fr/api/exercises/${parsedData.id}/user/${userAuth.id}`
                );
                setExerciseData(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'exercice:', error);
            }
        }
    }, [userAuth, parsedData.id]);

    useFocusEffect(
        useCallback(() => {
            fetchExerciseData();
        }, [fetchExerciseData])
    );

    // Fonction pour mettre à jour le temps de visionnage
    const updateProgress = async (currentTime: number) => {
        try {
            // console.log(parsedData)
            axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth?.token}`;
            await axios.post(`https://api.prodribbler.alliance-tech.fr/api/user-exercises/${parsedData.id}/progress`, {
                watch_time: Math.floor(currentTime)
            });
            setWatchTime(currentTime);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du progrès:', error);
        }
    };

    // Fonction pour marquer l'exercice comme complété
    const markAsCompleted = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth?.token}`;
            await axios.post(`https://api.prodribbler.alliance-tech.fr/api/user-exercises/${parsedData.id}/complete`);
        } catch (error) {
            console.error('Erreur lors du marquage comme complété:', error);
        }
    };

    // Gestionnaire de l'état de lecture
    const onPlaybackStatusUpdate = (status: any) => {
        // Vérifions d'abord que status existe et contient les données nécessaires
        if (!status || !status.isLoaded) return;

        if (status.isPlaying) {
            // Convertir les millisecondes en secondes et arrondir pour éviter les décimales
            const currentTimeInSeconds = Math.floor(status.positionMillis / 1000);
            
            // Vérifier si le temps actuel est un multiple de 5 et qu'il est différent du dernier temps traité
            if (currentTimeInSeconds % 5 === 0 && currentTimeInSeconds > lastProcessedTime.current) {
                console.log('Sending update for time:', currentTimeInSeconds);
                updateProgress(5);
                setWatchTime(currentTimeInSeconds);
                lastProcessedTime.current = currentTimeInSeconds;
                return;
            }
        }

        // Détecter quand la vidéo est terminée
        if (status.didJustFinish) {
            const remainingTime = Math.floor((status.positionMillis / 1000) - watchTime);
            if (remainingTime > 0) {
                updateProgress(remainingTime);
            }
            markAsCompleted();
        }
    };

    // Assurons-nous que la vidéo est bien configurée
    useEffect(() => {
        if (videoRef.current) {
            // @ts-ignore - L'API de la vidéo n'est pas bien typée
            videoRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        }
    }, []);

    const formatDuration = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m${remainingSeconds.toString().padStart(2, '0')}s`;
      };

    return (
        <ViewScreen headerComponent={
            <>
                <Pressable 
                    onPress={async () => {
                        try {
                            axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth?.token}`;
                            if (exerciseData?.is_favorite) {
                                await axios.delete(`https://api.prodribbler.alliance-tech.fr/api/favorites/exercise/${parsedData.id}`);
                                Alert.alert('Succès', 'Exercice retiré des favoris');
                            } else {
                                await axios.post('https://api.prodribbler.alliance-tech.fr/api/favorites', {
                                    exercise_id: parsedData.id
                                });
                                Alert.alert('Succès', 'Exercice ajouté aux favoris');
                            }
                            // Rafraîchir les données après le succès
                            setExerciseData(null);
                            fetchExerciseData();
                        } catch (error) {
                            console.error('Erreur lors de la modification des favoris:', error);
                            Alert.alert('Erreur', 'Impossible de modifier les favoris');
                        }
                    }} 
                    style={{ flex: 1 }}
                >
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
                            <FontAwesome5 name={exerciseData?.is_favorite ? 'trash' : 'heart'} size={14} color='#fff' />
                            <GradientText style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 12 }} colors={['#fff', '#38A8E0']}>{exerciseData?.is_favorite ? 'Remove Favourites' : 'Add to Favourites'}</GradientText>
                        </View>
                    )}
                </Pressable>
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
                    <ImageBackground source={{ uri: exerciseData?.banner_url }} resizeMode="cover" style={styles.image}>
                        {exerciseData?.user_progress?.is_completed && <View style={styles.completedBadge}>
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
                        ref={videoRef}
                        source={{ uri: exerciseData?.video_url }}
                        style={styles.video}
                        useNativeControls
                        resizeMode={ResizeMode.COVER}
                        isMuted={false}
                        shouldPlay
                        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
                    />
                )}
            </View>

            <View style={styles.infoRow}>
                <View style={styles.durationContainer}>
                    <Ionicons name="time-outline" size={20} color="#fff" />
                    <Text style={{ color: '#fff', fontSize: 16 }}>{formatDuration(exerciseData?.duration_seconds)}</Text>
                </View>
                <View style={styles.difficultyContainer}>
                    <Text style={{ color: '#fff' }}>Difficulty Level:</Text>
                    <GradientText style={{ color: '#fff', fontWeight: 'bold' }} colors={['#fff', '#34819A']}>{parsedData.level}</GradientText>
                </View>
            </View>

            <Text style={styles.title}>{exerciseData?.title}</Text>
            <View style={styles.divider} />
            <GradientText style={styles.sectionTitle} colors={['#fff', '#124473']}>Before You Begin</GradientText>
            {beforeYouBeginSteps.map((instruction: string, index: number) => (
                <View key={index} style={styles.instructionItem}>
                    <View style={styles.instructionBullet} />
                    <Text style={styles.instructionText}>{instruction}</Text>
                </View>
            ))}
            <GradientText style={styles.sectionTitle} colors={['#fff', '#124473']}>Step-by-Step Instructions</GradientText>
            {instructionSteps.map((instruction: string, index: number) => (
                <View key={index} style={styles.instructionItem}>
                    <View style={styles.instructionBullet} />
                    <Text style={styles.instructionText}>{instruction}</Text>
                </View>
            ))}
            <Text style={styles.description}>
                {descriptionText}
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
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        color: '#000',
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

