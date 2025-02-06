import { GradientText } from "@/components/GradientText";
import { Text, View } from "@/components/Themed";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";

type ActivityCardProps = {
  image: any;
  title: string;
  description: string;
  exerciseData: any;
  gradient?: boolean;
  blackBackground?: boolean;
  isCompleted?: boolean;
};
const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m${remainingSeconds.toString().padStart(2, '0')}s`;
};


export function ActivityCard({ image, title, description, exerciseData, isCompleted = false, blackBackground = false, gradient = false }: ActivityCardProps) {
  const CardWrapper = gradient ? LinearGradient : View;
  const gradientProps = gradient ? {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    colors: ['#6FD3D1', '#0FB9ED']
  } : {};

  return (
    <CardWrapper style={[styles.activityCard, { backgroundColor: blackBackground ? '#121212' : '#1E201F' }]} {...gradientProps}>
      {isCompleted && <View style={styles.completedBadge}>
        <Text style={styles.completedText}>Completed</Text>
      </View>}
     <View style={styles.timeBadge}>
        <Text style={styles.timeText}>🕑 {formatDuration(exerciseData?.duration)}</Text>
      </View>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <Link href={{
        pathname: '/(stack)/exercise',
        params: { data: JSON.stringify(exerciseData) },
      }} asChild>
        <Pressable>
          {({ pressed }) => (
            <GradientText style={[styles.viewExerciseLink, { opacity: pressed ? 0.5 : 1 }]}>
              View Exercise
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
    height: 160,
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
}); 