import { Image, Pressable, StyleSheet, TouchableOpacity, View, Alert, Animated, Easing } from 'react-native';
import { Text } from '../Themed';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

export function PlayerSection({ user, totalTime, drills, withEditImage, userAuth, fetchProfileData, profileImageUrl }: {
    user: any,
    totalTime: string,
    drills: string,
    withEditImage?: boolean,
    userAuth?: any,
    profileImageUrl?: string,
    fetchProfileData?: () => void
}) {
    const [isLoading, setIsLoading] = useState(false);
    const rotation = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        let rotationAnimation;
        if (isLoading) {
            // Réinitialiser la valeur
            rotation.setValue(0);
            
            // Créer l'animation
            rotationAnimation = Animated.timing(rotation, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            });
            
            // Créer une animation en boucle
            Animated.loop(rotationAnimation).start();
        }
        
        return () => {
            if (rotationAnimation) {
                rotationAnimation.stop();
            }
        };
    }, [isLoading]);
    
    // Convertir la valeur d'animation en degrés de rotation
    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const pickImage = async () => {
        Alert.alert(
            "Change profile picture",
            "Choose source",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Take a photo",
                    onPress: async () => {
                        const { status } = await ImagePicker.requestCameraPermissionsAsync();
                        if (status !== 'granted') {
                            alert('Sorry, we need permissions to access your camera!');
                            return;
                        }
                        launchCamera();
                    }
                },
                {
                    text: "Choose from gallery",
                    onPress: async () => {
                        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                        if (status !== 'granted') {
                            alert('Sorry, we need permissions to access your photos!');
                            return;
                        }
                        launchLibrary();
                    }
                }
            ]
        );
    };

    const launchCamera = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            handleImageResult(result);
        } catch (error) {
            console.error('Error while taking photo:', error);
            alert('An error occurred while taking the photo');
        }
    };

    const launchLibrary = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            handleImageResult(result);
        } catch (error) {
            console.error('Error while selecting image:', error);
            alert('An error occurred while selecting the image');
        }
    };

    const handleImageResult = async (result: ImagePicker.ImagePickerResult) => {
        if (!result.canceled) {
            try {
                setIsLoading(true);
                
                const formData = new FormData();
                formData.append('avatar', {
                    uri: result.assets[0].uri,
                    type: 'image/jpeg',
                    name: 'avatar.jpg'
                } as any);

                axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth?.token}`;
                const response = await axios.post('https://api.prodribbler.alliance-tech.fr/api/profile/avatar', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.status === 200) {
                    fetchProfileData?.();
                }
            } catch (error) {
                console.error('Error while uploading image:', error);
                alert('An error occurred while uploading the image');
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        }
    };

    return (
        <View style={styles.playerContainer}>
            <Image
                source={require('@/assets/images/player-card.png')}
                style={styles.playerImage}
            />
            {withEditImage && (
                <View style={styles.editButtonContainer}>
                    <TouchableOpacity style={styles.editButton} onPress={pickImage} disabled={isLoading}>
                        {isLoading ? (
                            <Animated.Image 
                                source={require('@/assets/icons/clock.png')} 
                                style={[styles.editIcon, { transform: [{ rotate: spin }] }]} 
                            />
                        ) : (
                            <Image source={require('@/assets/icons/edit.png')} style={styles.editIcon} />
                        )}
                        <Text style={styles.editButtonText}>{isLoading ? 'Chargement...' : 'Edit'}</Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.imageContainer}>
                <Image
                    source={profileImageUrl ? { uri: profileImageUrl } : require('@/assets/images/profile-default.png')}
                    style={styles.profileImage}
                />

            </View>
            <View style={styles.playerInfo}>
                {user && <Text style={styles.playerName}>{user.full_name}</Text>}
            </View>
            <View style={styles.trainingTime}>
                <Text style={styles.statLabel}>Training Time</Text>
                <Text style={styles.statValue}>{totalTime}</Text>
            </View>
            <View style={styles.drills}>
                <Text style={styles.statLabel}>Drills</Text>
                <Text style={styles.statValue}>{drills}</Text>
            </View>
            <View style={styles.streak}>
                <Text style={styles.statLabel}>Streak</Text>
                <Text style={styles.statValue}>0</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    playerContainer: {
        marginTop: 30,
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 250,
        height: 388,
    },

    playerImage: {
        width: 250,
        height: 388,
        resizeMode: 'stretch'
    },
    imageContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 10,
        left: 0,
        right: 0,
        zIndex: -1,
    },
    profileImage: {
        width: 166,
        height: 170,
        resizeMode: 'cover',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    playerInfo: {
        position: 'absolute',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        top: 170,
        bottom: 178,
        left: 0,
        right: 0,
    },
    playerName: {
        fontFamily: 'Montserrat-BoldItalic',
        fontSize: 16,
        color: '#fff',
    },

    trainingTime: {
        position: 'absolute',
        textAlign: 'center',
        // backgroundColor: 'rgba(255, 255, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 18,
        top: 205,
        bottom: 143,
        left: 0,
        right: 0,
    },
    drills: {
        position: 'absolute',
        textAlign: 'center',
        // backgroundColor: 'rgba(255, 255, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 18,
        top: 245,
        bottom: 103,
        left: 0,
        right: 0,
    },
    streak: {
        position: 'absolute',
        textAlign: 'center',
        // backgroundColor: 'rgba(255, 255, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 18,
        top: 285,
        bottom: 63,
        left: 0,
        right: 0,
    },
    statLabel: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: '#1A1A1A',
    },
    statValue: {
        fontFamily: 'Montserrat-BoldItalic',
        fontSize: 24,
        color: '#1A1A1A',
    },
    editButtonContainer: {
        position: 'absolute',
        top: 85,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButton: {
        backgroundColor: '#1A1A1AB3',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        gap: 7
    },
    editButtonText: {
        fontSize: 14,
        color: '#fff',
    },
    editIcon: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        tintColor: '#fff'
    }
}); 