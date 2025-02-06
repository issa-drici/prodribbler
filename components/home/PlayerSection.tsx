import { Image, StyleSheet, View } from 'react-native';
import { Text } from '../Themed';

export function PlayerSection({ user, totalTime, drills }: { user: any, totalTime: string, drills: string }) {
    return (
        <View style={styles.playerContainer}>
            <Image
                source={require('@/assets/images/player-card.png')}
                style={styles.playerImage}
            />
            <View style={styles.imageContainer}>
                <Image
                    source={require('@/assets/images/profile-default.png')}
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
    }
}); 
