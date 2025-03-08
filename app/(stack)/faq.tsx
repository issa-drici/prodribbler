import { Animated, StyleSheet, TouchableOpacity, Easing } from 'react-native';
import React from 'react';
import { Text, View, ViewScreen } from '@/components/Themed';
import { ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ContactSupport = () => {
    const [issue, setIssue] = React.useState('');

    return (
        <View style={styles.supportContainer}>
            <Text style={styles.supportTitle}>Contact Support</Text>
            {/* <Text style={styles.supportDescription}>
                Lorem ipsum dolor sit amet consectetur. Quam laoreet ornare massa ut sed sed ut nisl. Etiam facilisi morbi laoreet parturient ultricies. Pellentesque tincidunt placerat lacus tellus purus.
            </Text> */}

            <View style={styles.issueContainer}>
                <Text style={styles.issueTitle}>What issue are you experiencing?</Text>

                <View style={styles.textAreaContainer}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Please explain the problem you're facing..."
                        placeholderTextColor="rgba(255, 255, 255, 0.6)"
                        multiline
                        numberOfLines={6}
                        value={issue}
                        onChangeText={setIssue}
                    />
                </View>

                <TouchableOpacity style={styles.loadMoreButton}>
                    <LinearGradient
                        colors={['#5BD1C1', '#74D3D5', '#6FCBE4', '#00B6F1']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    >
                        <Text style={styles.buttonText}>Send</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function FAQScreen() {
    const faqItems = [
        {
            title: "About ProDribbler",
            content: "Welcome to ProDribbler, the ultimate training app for developing top-tier ball control and refining your football skills.\n\nOur program is designed specifically for young players and beginners looking to enhance their close-range ball control and master key techniques. By following a structured routine, setting clear objectives, and staying disciplined, players can make significant progress in a short time. ProDribbler encourages focus and consistency, helping athletes unlock their full potential while steadily improving their performance.\n\nStay engaged, complete each drill with dedication, and earn rewards as you advance. With ProDribbler, every session brings you closer to mastering the art of ball control."
        },
        {
            title: "Where is my activation code?",
            content: "After your purchase, you will have received an e-mail with a code enabling you to activate your access to the application. Be sure to check your spam folder.\n\n⚠️ This code is for one-time use only! ⚠️\n\nIf you think you haven't received anything, contact us at contact@prodribbler.com"
        },
        {
            title: "How do I unlock the ProDribbler training videos?",
            content: "Unlock the ProDribbler training videos with your verification code - your unique code can be found on the email you received after your purchase.\n\nSimply enter the code when you register on the app to unlock the training program. You can do this on your phone or tablet."
        },
        {
            title: "How to update my ProDribbler profile?",
            content: "1. Open the ProDribbler app and sign in\n2. Go to \"Profile\"\n3. Add your profile photo\n4. Complete your information\n5. Set your current goals"
        },
        {
            title: "App Usage on different devices",
            content: "We support cross-platform access! You can use our app on iOS, Android, TV or PC.\n\n- iOS & Android: Download the ProDribbler app directly from the App Store or Play Store.\n- TV/PC: Simply cast the video of your choice onto your compatible TV or computer. If your device is compatible, make sure both are connected to the same internet connection."
        }
    ];

    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
    const animatedHeights = React.useRef(faqItems.map(() => new Animated.Value(0))).current;
    const animatedRotations = React.useRef(faqItems.map(() => new Animated.Value(0))).current;

    const toggleExpand = (index: number) => {
        const isExpanding = expandedIndex !== index;

        // Animation de fermeture de l'élément précédent
        if (expandedIndex !== null) {
            Animated.parallel([
                Animated.timing(animatedHeights[expandedIndex], {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: false,
                }),
                Animated.timing(animatedRotations[expandedIndex], {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.ease,
                    useNativeDriver: true,
                })
            ]).start();
        }

        // Animation d'ouverture du nouvel élément
        if (isExpanding) {
            Animated.parallel([
                Animated.spring(animatedHeights[index], {
                    toValue: 1,
                    damping: 20,
                    mass: 1,
                    stiffness: 100,
                    useNativeDriver: false,
                }),
                Animated.spring(animatedRotations[index], {
                    toValue: 1,
                    damping: 20,
                    mass: 1,
                    stiffness: 100,
                    useNativeDriver: true,
                })
            ]).start();
        }

        setExpandedIndex(isExpanding ? index : null);
    };

    return (
        <ViewScreen>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    {faqItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.faqItem,
                                expandedIndex === index && styles.faqItemExpanded
                            ]}
                            onPress={() => toggleExpand(index)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.faqHeader}>
                                <Animated.Image
                                    source={require('@/assets/icons/play.png')}
                                    style={[
                                        styles.playIcon,
                                        {
                                            transform: [{
                                                rotate: animatedRotations[index].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['0deg', '90deg']
                                                })
                                            }]
                                        }
                                    ]}
                                />
                                <Text style={styles.faqTitle}>{item.title}</Text>
                                <Animated.Image
                                    source={expandedIndex === index ? require('@/assets/icons/minus.png') : require('@/assets/icons/plus.png')}
                                    style={[
                                        styles.expandIcon,
                                        {
                                            transform: [{
                                                scale: animatedRotations[index].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [1, 1.1]
                                                })
                                            }]
                                        }
                                    ]}
                                />
                            </View>
                            <Animated.View
                                style={[
                                    styles.faqContentContainer,
                                    {
                                        maxHeight: animatedHeights[index].interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 500]
                                        }),
                                        opacity: animatedHeights[index].interpolate({
                                            inputRange: [0, 0.5, 1],
                                            outputRange: [0, 0.3, 1]
                                        }),
                                        transform: [{
                                            translateY: animatedHeights[index].interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-20, 0]
                                            })
                                        }]
                                    }
                                ]}
                            >
                                <View style={styles.divider} />
                                <Text style={styles.faqContent}>
                                    {item.content}
                                </Text>
                            </Animated.View>
                        </TouchableOpacity>
                    ))}
                </View>
                <ContactSupport />
            </ScrollView>
        </ViewScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10
    },
    faqItem: {
        backgroundColor: 'rgba(18, 18, 18, 0.5)',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(91, 209, 193, 0.2)',
        transform: [{
            scale: 1
        }]
    },
    faqItemExpanded: {
    },
    faqHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12
    },
    playIcon: {
        width: 10,
        height: 10,
        resizeMode: 'contain',
        marginTop: 5
    },
    expandIcon: {
        width: 15,
        height: 15,
        position: 'absolute',
        right: 0,
        resizeMode: 'contain',
        marginTop: 5

    },
    faqTitle: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
        color: '#fff',
        paddingRight: 32
    },
    faqContentContainer: {
        overflow: 'hidden'
    },
    faqContent: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: '#fff',
        lineHeight: 24,
    },
    scrollView: {
        flex: 1,
    },
    supportContainer: {
        padding: 20,
        marginTop: 20,
        backgroundColor: 'rgba(12, 12, 12, 0.78)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(91, 209, 193, 0.2)',
    },
    supportTitle: {
        fontSize: 24,
        fontFamily: 'Montserrat-Medium',
        color: '#fff',
        marginBottom: 14,
    },
    supportDescription: {
        fontSize: 12,
        fontFamily: 'Montserrat-Light',
        color: '#C4DCD9',
        lineHeight: 18,
        marginBottom: 20,
        opacity: 0.8,
    },
    issueContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderRadius: 20,
    },
    issueTitle: {
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: '#fff',
        marginBottom: 14,
    },
    textAreaContainer: {
        backgroundColor: 'rgba(15, 15, 15, 1)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(91, 209, 193, 0.2)',
        paddingHorizontal: 14,
        paddingVertical: 4,
        marginBottom: 24,
    },
    textArea: {
        color: '#fff',
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        lineHeight: 18,
        minHeight: 120,
        textAlignVertical: 'top',
    },
    loadMoreButton: {
        borderRadius: 12,
        borderCurve: 'continuous',
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    buttonText: {
        color: '#000',
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(91, 209, 193, 0.2)',
        marginVertical: 12,
    },
});
