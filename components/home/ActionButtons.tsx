import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { GradientText } from '@/components/GradientText';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '@/components/Themed';

export function ActionButtons() {
    return (
        <View style={styles.buttonsContainer}>
            <Link href='/(tabs)/(stats-ranking)' asChild style={styles.linkContainer}>
                <Pressable>
                    {({ pressed }) => (
                        <View style={[styles.statsButton, { opacity: pressed ? 0.5 : 1 }]}>
                            <FontAwesome5 name="chart-line" size={14} color='#fff' />
                            <GradientText style={styles.buttonText} colors={['#fff', '#38A8E0']}>
                                Check My Stats
                            </GradientText>
                        </View>
                    )}
                </Pressable>
            </Link>

            <Link href={{ pathname: '/exercises' }} asChild style={styles.linkContainer}>
                <Pressable>
                    {({ pressed }) => (
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#6FD3D1', '#0FB9ED']}
                            style={[styles.gradientButton, { opacity: pressed ? 0.5 : 1 }]}
                        >
                            <FontAwesome5 name="running" size={14} />
                            <Text style={styles.buttonText}>Start Training</Text>
                        </LinearGradient>
                    )}
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 30,
        alignItems: 'center',
        width: '100%'
    },
    linkContainer: {
        flex: 1
    },
    statsButton: {
        height: 48,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        borderWidth: 1,
        borderColor: '#38A8E0'
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
        color: '#000',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12
    }
});
