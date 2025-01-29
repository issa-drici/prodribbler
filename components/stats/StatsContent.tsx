import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type StatsContentProps = {
    selectedRange: 'day' | 'week' | 'month';
    drillData: any;
    isRankingView?: boolean;
};

export default function StatsContent({ selectedRange, drillData, isRankingView = false }: StatsContentProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isRankingView ? "Classement Global" : "Statistiques d'entraînement"}
            </Text>
            {/* Ajoutez ici le contenu spécifique aux classements si isRankingView est true */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
}); 