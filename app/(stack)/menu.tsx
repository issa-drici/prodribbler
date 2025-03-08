import { Image, ImageBackground, Platform, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Text, View, ViewScreen } from '@/components/Themed';
import { Link, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { GradientText } from '@/components/GradientText';
import { AuthContext } from '@/context/AuthProvider';
// @ts-ignore
import menu from '@/assets/icons/menu.png';
// @ts-ignore
import homeActive from '@/assets/icons/home-active.png';
// @ts-ignore
import exercisesActive from '@/assets/icons/exercises-active.png';
// @ts-ignore
import trainingStatsActive from '@/assets/icons/training-stats-active.png';
// @ts-ignore
import faqActive from '@/assets/icons/faq-active.png';
// @ts-ignore
import settingsActive from '@/assets/icons/settings-active.png';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function MenuScreen() {
    const { logout } = useContext(AuthContext);
    const router = useRouter();
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const handleLogout = async () => {
        await logout();
        router.replace('/(auth)/login');
    };

    return (
        <ViewScreen flexGrow={1} withoutPadding>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    {/* <Link href="/(stack)/menu" asChild>
                        <Pressable>
                            <Image source={menu} style={{ width: 32, height: 32 }} resizeMode="contain" />
                        </Pressable>
                    </Link> */}
                    <Text style={{
                        color: '#fff',
                        fontSize: 20,
                        fontFamily: 'Montserrat-Medium',
                        marginHorizontal: 'auto'
                    }}>Welcome to ProDribbler</Text>
                    <Link href="/modal" asChild>
                        <Pressable>
                            {/* <Image source={notification} style={{ width: 32, height: 32 }} resizeMode="contain" /> */}
                        </Pressable>
                    </Link>
                </View>
                <View style={styles.divider} />
                <View style={styles.profileContainer}>

                    <View style={styles.profileImageContainer}>
                        <Image
                            source={require('@/assets/images/profile-default.png')}
                            style={styles.profileImage}
                        />
                    </View>
                    <View style={styles.profileInfo}>
                        <GradientText style={styles.profileName} colors={['#6ED3D3', '#74D3D5', '#6FCBE4', '#00B6F1']}>{user?.full_name}</GradientText>
                        <Text style={styles.profileRole}>Player</Text>
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            pressed && { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
                        ]}
                        onPress={() => {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: '(tabs)' }],
                                })
                            );
                        }}
                    >
                        <Image source={homeActive} style={{ width: 24, height: 24 }} resizeMode="contain" />
                        <Text style={styles.buttonText}>Home</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            pressed && { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
                        ]}
                        onPress={() => {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: '(tabs)', params: { screen: 'exercises' } }],
                                })
                            );
                        }}
                    >
                        <Image source={exercisesActive} style={{ width: 24, height: 24 }} resizeMode="contain" />
                        <Text style={styles.buttonText}>Exercises</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            pressed && { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
                        ]}
                        onPress={() => {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: '(tabs)', params: { screen: '(stats-ranking)' } }],
                                })
                            );
                        }}
                    >
                        <Image source={trainingStatsActive} style={{ width: 24, height: 24 }} resizeMode="contain" />
                        <Text style={styles.buttonText}>Ranking & stats</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            pressed && { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
                        ]}
                        onPress={() => {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [
                                        { name: '(tabs)' },
                                        { name: '(stack)', params: { screen: 'faq' } }
                                    ],
                                })
                            );
                        }}
                    >
                        <Image source={faqActive} style={{ width: 24, height: 24 }} resizeMode="contain" />
                        <Text style={styles.buttonText}>FAQ</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            pressed && { backgroundColor: 'rgba(255, 255, 255, 0.05)' }
                        ]}
                        onPress={() => {
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 1,
                                    routes: [
                                        { name: '(tabs)' },
                                        { name: '(stack)', params: { screen: 'settings' } }
                                    ],
                                })
                            );
                        }}
                    >
                        <Image source={settingsActive} style={{ width: 24, height: 24 }} resizeMode="contain" />
                        <Text style={styles.buttonText}>Settings</Text>
                    </Pressable>
                </View>

                <Image
                    source={require('@/assets/images/screens-menu.png')}
                    style={styles.screensImage}
                />

                <Pressable
                    style={({ pressed }) => [
                        styles.logout,
                        pressed && { backgroundColor: '#1A1A1A' }
                    ]}
                    onPress={handleLogout}
                >
                    <GradientText
                        style={styles.logoutText}
                        colors={['#6ED3D3', '#74D3D5', '#6FCBE4', '#00B6F1']}
                    >
                        Logout
                    </GradientText>
                </Pressable>
            </SafeAreaView>
        </ViewScreen >
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        position: 'relative'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20
    },
    divider: {
        height: 1,
        backgroundColor: '#fff',
        opacity: 0.25,
        marginTop: 25,
        marginBottom: 37
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 25
    },
    profileInfo: {
        flexDirection: 'column',
        gap: 8
    },
    profileImageContainer: {
        width: 75,
        height: 75,
        backgroundColor: 'transparent',
        shadowColor: '#5BD1C1',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 20.9,
        elevation: 20,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    profileName: {
        fontSize: 24,
        fontFamily: 'Montserrat-Bold',
    },
    profileRole: {
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        color: '#fff'
    },
    buttonsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? '20%' : '25%',
        width: 206,
        gap: 14
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: '#fff'
    },
    screensImage: {
        position: 'absolute',
        height: Platform.OS === 'android' ? 600 : 700,
        width: Platform.OS === 'android' ? 175 : 200,
        right: Platform.OS === 'android' ? -45 : -35,
        top: '60%',
        resizeMode: 'contain',
        transform: [{ translateY: '-50%' }]
    },
    logout: {
        position: 'absolute',
        bottom: Platform.OS === 'android' ? -70 : -40,
        left: Platform.OS === 'android' ? -45 : -40,
        backgroundColor: '#000',
        borderRadius: 100,
        width: 124,
        height: 124,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#5BD1C1',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 20.9,
        elevation: 20,
    },
    logoutText: {
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
    }
})
