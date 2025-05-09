import { StyleSheet } from "react-native";
import { GradientText } from "../GradientText";
import { Text, View } from "../Themed";
import { ActivityCard } from "./RecentActivities/ActivityCard";

export function RecentActivities({ activities }: { activities: any }) {
  return (
    <View style={styles.container}>
      <GradientText style={styles.headerTitle}>Recent Activities</GradientText>
      <Text style={styles.headerDescription}>
        Keep track of your latest training sessions, drills completed, and milestones hit — all in one place.
      </Text>

      {activities?.map((activity: any) => (
        <ActivityCard
          key={activity.id}
          image={activity.banner_url}
          title={activity.title}
          description={activity.description}
          exerciseData={activity}
        />
      ))}

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