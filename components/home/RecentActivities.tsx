import { StyleSheet } from "react-native";
import { GradientText } from "../GradientText";
import { Text, View } from "../Themed";
import { ActivityCard } from "./RecentActivities/ActivityCard";


const MOCK_EXERCISE_DATA = {
  category: 'Dribbling Drill',
  name: 'Kids Soccer Agility Drills',
  duration: '3h45m',
  level: 'Intermediate',
  completed: true,
  link: 'https://videos.pexels.com/video-files/8938122/8938122-uhd_2560_1440_25fps.mp4',
  description: 'Lorem ipsum dolor sit amet...',
  instructions: ['Lorem ipsum dolor sit amet...']
};

export function RecentActivities() {
  return (
    <View style={styles.container}>
      <GradientText style={styles.headerTitle}>Recent Activities</GradientText>
      <Text style={styles.headerDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.
      </Text>

      <ActivityCard
        image={require('@/assets/images/kids-1.jpeg')}
        title="Kids Soccer Agility Drill"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod."
        exerciseData={MOCK_EXERCISE_DATA}
      />

      <ActivityCard
        image={require('@/assets/images/kids-2.webp')}
        title="Kids Soccer Agility Drill"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod."
        exerciseData={MOCK_EXERCISE_DATA}
      />

      <ActivityCard
        image={require('@/assets/images/kids-3.jpg')}
        title="Kids Soccer Agility Drill"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod."
        exerciseData={MOCK_EXERCISE_DATA}
      />

      {/* <ViewAllButton /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161817',
    borderRadius: 20,
    marginTop: 30,
    padding: 20
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5
  },
  headerDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    marginBottom: 25
  }
});