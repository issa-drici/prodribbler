import { View, StyleSheet, Platform, Pressable, Image } from 'react-native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Text, View as ThemedView } from '../components/Themed';
import { usePermissions } from '@/context/PermissionsProvider';
import { router } from 'expo-router';

export default function PermissionsScreen() {
    const { cameraPermission, libraryPermission, checkPermissions } = usePermissions();
    const [isRequesting, setIsRequesting] = useState(false);

    const requestCameraPermission = async () => {
        if (isRequesting) return;
        setIsRequesting(true);
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            await checkPermissions();
        } finally {
            setIsRequesting(false);
        }
    };

    const requestLibraryPermission = async () => {
        if (isRequesting) return;
        setIsRequesting(true);
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            await checkPermissions();
        } finally {
            setIsRequesting(false);
        }
    };

    useEffect(() => {
        if (cameraPermission === 'granted' && libraryPermission === 'granted') {
            router.replace('/(auth)/login');
        }
    }, [cameraPermission, libraryPermission]);

    const renderPermissionScreen = (type: 'camera' | 'library') => {
        const isCamera = type === 'camera';
        const permission = isCamera ? cameraPermission : libraryPermission;
        const requestPermission = isCamera ? requestCameraPermission : requestLibraryPermission;

        return (
            <View style={styles.container}>
                <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>
                    {isCamera ? 'Camera Access' : 'Photo Library Access'}
                </Text>

                <Text style={styles.description}>
                    {isCamera
                        ? 'To personalize your player card, we need access to your camera to take photos.'
                        : 'To personalize your player card, we need access to your photo library to select images.'}
                </Text>

                <ThemedView style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.button, isRequesting && styles.buttonDisabled]}
                        onPress={requestPermission}
                        disabled={isRequesting}
                    >
                        <Text style={styles.buttonText}>
                            {permission === 'denied' ? 'Try Again' : 'Allow Access'}
                        </Text>
                    </Pressable>
                </ThemedView>
            </View>
        );
    };

    // Show camera screen if permissions are not granted
    if (cameraPermission !== 'granted') {
        return renderPermissionScreen('camera');
    }

    // Show library screen if camera is granted but not library
    return renderPermissionScreen('library');
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1F2120',
    },
    logo: {
        width: '70%',
        height: undefined,
        aspectRatio: 2,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 150,
        marginBottom: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
        color: '#FFFFFF',
    },
    buttonContainer: {
        width: '100%',
        maxWidth: 300,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
}); 