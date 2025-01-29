import { StyleSheet } from 'react-native';
import { View, ViewScreen } from '@/components/Themed';
import { ActivityCard } from '@/components/home/RecentActivities/ActivityCard';
import { useState } from 'react';
import GradientToggleButton from '@/components/common/GradientToggleButton';
import videos from '@/assets/data/videos.json';

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m${remainingSeconds.toString().padStart(2, '0')}s`;
};

export default function ExercisesScreen() {
  const experienceSteps = [
    '500 XP',
    '1000 XP',
    '1500 XP',
    '2000 XP',
    '2500 XP'
  ];
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  return (
    <ViewScreen headerComponent={
      <View style={styles.rangeSelector}>
        {['beginner', 'intermediate', 'advanced'].map((level) => (
          <GradientToggleButton
            key={level}
            text={level.charAt(0).toUpperCase() + level.slice(1)}
            isActive={selectedLevel === level}
            onPress={() => setSelectedLevel(level)}
          />
        ))}
      </View>
    }>

      {videos.levels[selectedLevel].map((video) => (
        <ActivityCard
          blackBackground
          image={video.thumbnail}
          title={video.name}
          description={`Découvrez cet exercice de ${video.name} de niveau ${selectedLevel} dès maintenant !`}
          exerciseData={{
            name: video.name,
            duration: formatDuration(video.duration_seconds),
            level: selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1),
            completed: true,
            thumbnail: video.thumbnail,
            link: video.url,
            beforeYouBegin: [
              'Repeat each drill at least 3 times for 30 seconds',
              'Rest for 15 seconds between sets',
              'Choose your own tempo'
            ],
            instructions: [
              'Identify the part of the foot that will contact the ball in each drill',
              'Each drill focuses on training a different aspect of the game',
              'For more information, tap on each foot shown below each drill'
            ],
            description: 'Remember, the lines and numbers on the Ball Mastery Mat are simply guides to help players understand and learn the drills more quickly. Don’t get frustrated if the ball doesn’t follow the lines and numbers perfectly. What’s most important is that the move you’re trying to execute is correct.',
          }}
        />))}
    </ViewScreen>
  );
}

const styles = StyleSheet.create({
  rangeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 8,
    padding: 4,
    gap: 10,
  },
});
