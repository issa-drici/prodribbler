import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ViewScreen } from '@/components/Themed';
import GradientToggleButton from '@/components/common/GradientToggleButton';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

// Définir l'interface pour les données de classement
interface RankingItem {
    rank: number;
    full_name: string;
    avatar_url: string | null;
    is_current_user: boolean;
    streak: number;
    total_xp: number;
}

interface RankingData {
    rankings: RankingItem[];
}

export default function RankingsScreen() {
    const [selectedRange, setSelectedRange] = React.useState<'day' | 'week' | 'month'>('week');
    const [rankingData, setRankingData] = useState<RankingData>({ rankings: [] });
    const { user: userAuth } = useContext(AuthContext);

    const fetchRankings = useCallback(async () => {
        try {
            if (userAuth) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth?.token}`;
                const response = await axios.get('https://api.prodribbler.alliance-tech.fr/api/rankings', {
                    params: {
                        range: selectedRange
                    }
                });
                setRankingData(response.data);
            }
        } catch (error) {
            console.error('Error while fetching ranking:', error);
        }
    }, [userAuth, selectedRange]);

    useFocusEffect(
        useCallback(() => {
            fetchRankings();
        }, [fetchRankings])
    );

    return (
        <ViewScreen headerComponent={
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
            </View>
        }>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#6FD3D1', '#0FB9ED']}
                style={styles.headerRow}
            >
                <Text style={styles.headerText}>Ranking</Text>
                <Text style={styles.headerText}>User</Text>
                <Text style={[styles.headerText, styles.XPText]}>XP Earned</Text>
            </LinearGradient>

            {rankingData?.rankings?.map((item) => (
                <View key={item.rank} style={styles.rankingContainer}>
                    <View style={styles.rankWrapper}>
                        <Text style={styles.rankText}>{item.rank}<Text style={styles.rankSuffix}>st</Text></Text>
                    </View>
                    <View style={[styles.rankingRow, item.is_current_user ? { backgroundColor: 'rgba(0, 0, 0, 0.31)', borderWidth: 1, borderColor: '#0FB9ED' } : { backgroundColor: 'rgba(255, 255, 255, 0.04)' }]}>
                        <Image
                            source={{
                                uri: item.avatar_url || 'https://img.freepik.com/vecteurs-libre/illustration-du-jeune-homme-souriant_1308-174669.jpg'
                            }}
                            style={styles.avatar}
                        />
                        <Text style={styles.userName}>{item.full_name}</Text>
                        <View style={styles.statsContainer}>
                            <Image source={item.is_current_user ? require('@/assets/icons/streak-blue.png') : require('@/assets/icons/streak.png')} style={styles.icon} />
                            <Text style={[styles.statText, item.is_current_user ? { color: '#0FB9ED' } : {}]}>{item.streak}</Text>
                            <Text style={[styles.separator, item.is_current_user ? { color: '#0FB9ED' } : {}]}>|</Text>
                            <Image source={item.is_current_user ? require('@/assets/icons/xp-blue.png') : require('@/assets/icons/xp.png')} style={styles.icon} />
                            <Text style={[styles.statText, item.is_current_user ? { color: '#0FB9ED' } : {}]}>{item.total_xp}</Text>
                        </View>
                    </View>
                </View>
            ))}
        </ViewScreen>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },
    rangeSelector: {
        width: '100%',
        flexDirection: 'row',
        borderRadius: 8,
        gap: 10,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderCurve: 'continuous',
        marginBottom: 8,
        gap: 25,

    },
    headerText: {
        color: '#000',
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
    },
    XPText: {
        marginLeft: 'auto',
    },
    rankingContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    rankingRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 12,
        marginBottom: 8,

    },
    rankWrapper: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rankText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Bold',
    },
    rankSuffix: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Montserrat-Regular',
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 8,
        borderCurve: 'continuous',
        marginRight: 14,
    },
    userName: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'Montserrat-Regular',
        flex: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 10,
        gap: 4,
    },
    icon: {
        width: 10,
        height: 10,
    },
    statText: {
        color: '#fff',
        fontSize: 13,
        fontFamily: 'Montserrat-SemiBold',
    },
    separator: {
        color: '#fff',
        fontSize: 16,
        marginHorizontal: 4,
    },
});
