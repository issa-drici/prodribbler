import { GradientText } from "@/components/GradientText";
import { Text, View } from "@/components/Themed";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";

type LevelCardProps = {
  id: string;
  image: any;
  title: string;
  description: string;
  duration: number;
  totalExercises: number;
  completedExercises: number;
  gradient?: boolean;
  blackBackground?: boolean;
  isCompleted?: boolean;
};
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h${minutes.toString().padStart(2, '0')}m`;
  } else {
    return `${minutes}m`;
  }
};


export function LevelCard({ id, image, title, description, duration, totalExercises, completedExercises, isCompleted = false, blackBackground = false, gradient = false }: LevelCardProps) {
  const CardWrapper = gradient ? LinearGradient : View;
  const gradientProps = gradient ? {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    colors: ['#6FD3D1', '#0FB9ED']
  } : {};

  const progressPercentage = Math.min(Math.max((completedExercises / totalExercises) * 100, 0), 100);
  const progressDotPosition = 100 - progressPercentage;


  return (
    <CardWrapper style={[styles.activityCard, { backgroundColor: blackBackground ? '#121212' : '#1E201F' }]} {...gradientProps}>
      {isCompleted && <View style={styles.completedBadge}>
        <Text style={styles.completedText}>Completed</Text>
      </View>}
      <View style={styles.timeBadge}>
        <Text style={styles.timeText}>🕑 {formatDuration(duration)}</Text>
      </View>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <View style={styles.titleContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.videosWatched}>Videos Watched: <Text style={styles.videosWatchedCount}>{completedExercises} / {totalExercises}</Text></Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#97D8C5', '#25BEE6']}
            style={[styles.progressGradient, { width: `${progressPercentage}%` }]}
          />
          <View style={[styles.progressDot, { right: `${progressDotPosition}%` }]} />
        </View>
      </View>



      <Text style={styles.cardDescription}>{description}</Text>
      <Link href={{
        pathname: '/(levels)/exercises',
        params: { level_id: id },
      }} asChild>
        <Pressable>
          {({ pressed }) => (
            <GradientText style={[styles.viewExerciseLink, { opacity: pressed ? 0.5 : 1 }]}>
              View Level
            </GradientText>
          )}
        </Pressable>
      </Link>
    </CardWrapper>
  );
}

const styles = StyleSheet.create({
  activityCard: {
    backgroundColor: '#1E201F',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%'
  },
  cardImage: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
    borderRadius: 10
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    marginBottom: 5,
    fontWeight: '500'
  },
  cardDescription: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.5,
    marginBottom: 10
  },
  viewExerciseLink: {
    fontSize: 14,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  completedBadge: {
    backgroundColor: '#2FB0A4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 10,
  },
  completedText: {
    fontSize: 16,
    color: '#fff',
  },
  timeBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.61)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#fff',
  },
  progressContainer: {
    flexDirection: 'column',
    gap: 10,
    padding: 10,
    borderRadius: 10
  },
  progressBar: {
    width: '100%',
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
  },
  progressGradient: {
    width: '60%',
    height: '100%',
    borderRadius: 5,
    position: 'relative'
  },
  progressDot: {
    position: 'absolute',
    right: '40%',
    top: -4,
    bottom: 0,
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: '#25BEE6',
    borderWidth: 2,
    borderColor: '#fff'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videosWatched: {
    fontSize: 12,
    fontFamily: 'Montserrat-Light',
    color: '#fff',
  },
  videosWatchedCount: {
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: '#00B6F1',
    opacity: 1,
  },

}); 