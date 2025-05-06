import { Pressable, StyleSheet, Alert, TextInput, Modal, TouchableOpacity, Image } from 'react-native';
import { Text, View, ViewScreen } from '@/components/Themed';
import { PlayerSection } from '@/components/home/PlayerSection';
import { RecentActivities } from '@/components/home/RecentActivities';
import StatCard from '@/components/stats/StatCard';
// @ts-ignore
import clock from '@/assets/icons/clock.png';
// @ts-ignore
import drills from '@/assets/icons/drills.png';
// @ts-ignore
import analytics from '@/assets/icons/analytics.png';
import { useContext, useState, useCallback } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityCard } from '@/components/home/RecentActivities/ActivityCard';
import { GradientText } from '@/components/GradientText';

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { user: userAuth } = useContext(AuthContext);
  const [profileData, setProfileData] = useState<any>(null);
  // const [goals, setGoals] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.");
  const [goals, setGoals] = useState<string>('Set your progression goals to track your development in football training.');
  const [modalVisible, setModalVisible] = useState(false);
  const [tempGoals, setTempGoals] = useState<string>('');

  const fetchProfileData = useCallback(() => {
    if (userAuth) {
      setIsLoading(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth?.token}`;
      axios.get('https://api.prodribbler.alliance-tech.fr/api/profile')
        .then(response => {
          setProfileData(response.data);
          setGoals(response?.data?.current_goals || '');
        })
        .catch(error => {
          console.error('Error while fetching profile data:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userAuth]);

  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, [fetchProfileData])
  );

  const formatTime = (totalSeconds: number): string => {
    if (!totalSeconds) return '0s';

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h${minutes}m`;
    }

    if (minutes > 0) {
      return `${minutes}m${seconds}s`;
    }

    return `${seconds}s`;
  };

  const handleEditGoals = () => {
    setTempGoals(goals);
    setModalVisible(true);
  };

  const handleSaveGoals = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth?.token}`;
      await axios.put('https://api.prodribbler.alliance-tech.fr/api/user/goals', {
        current_goals: tempGoals
      });

      setModalVisible(false);
      fetchProfileData();
    } catch (error) {
      console.error('Error while updating goals:', error);
      Alert.alert(
        'Error',
        'An error occurred while updating your goals.'
      );
    }
  };

  return (
    <ViewScreen>
      <PlayerSection
        user={userAuth}
        totalTime={formatTime(profileData?.stats?.total_training_time)}
        drills={profileData?.stats?.completed_videos}
        profileImageUrl={profileData?.user?.avatar_url}
        withEditImage
        userAuth={userAuth}
        fetchProfileData={fetchProfileData}
      />

      <View style={styles.goalsContainer}>
        <View style={styles.editContainer}>
          <GradientText style={styles.headerTitle} colors={['#fff', '#38A8E0']}>Current Goals</GradientText>
          <Pressable style={styles.editButton} onPress={handleEditGoals}>
            <Image source={require('@/assets/icons/edit.png')} style={styles.editIcon} />
            <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>
        </View>
        <Text style={styles.goals}>
          {profileData?.current_goals ?? 'No goals entered.'}
        </Text>
      </View>
      <View style={styles.statsContainer}>
        <StatCard backgroundColor="#121212C7" label="Total drills completed" value={profileData?.stats?.completed_videos} icon={drills} fullWidth />
        <StatCard backgroundColor="#121212C7" label="Total XP earned" value={profileData?.stats?.total_xp} icon={analytics} fullWidth />
        <StatCard backgroundColor="#121212C7" label="Total training time" value={formatTime(profileData?.stats?.total_training_time)} icon={clock} fullWidth />
      </View>

      {profileData?.favorites?.length > 0 && (
        <View style={styles.container}>
          <GradientText style={styles.headerTitle} colors={['#fff', '#38A8E0']}>Recent Favorites</GradientText>
          <Text style={styles.headerDescription}>
            Your most recently saved training exercises and drills for quick access.
          </Text>

          {profileData?.favorites?.map((activity: any) => (
            <ActivityCard
              key={activity.id}
              image={activity.banner_url}
              title={activity.title}
              description={activity.description}
              exerciseData={activity}
            />
          ))}
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <GradientText style={styles.modalTitle} colors={['#fff', '#38A8E0']}>Edit goals</GradientText>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={6}
              defaultValue={profileData?.current_goals}
              onChangeText={(text) => setTempGoals(text)}
              placeholderTextColor="#666"
              placeholder="Enter your goals..."
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSaveGoals}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ViewScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161817',
    borderRadius: 20,
    marginTop: 30,
    padding: 20
  },
  goalsContainer: {
    backgroundColor: '#161817',
    borderRadius: 20,
    marginVertical: 10,
    padding: 20
  },
  goals: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#fff',
  },
  headerDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    marginBottom: 25
  },
  statsContainer: {
    gap: 10,
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#161817',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    marginBottom: 15
  },
  textArea: {
    width: '100%',
    height: 150,
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 15,
    color: '#fff',
    textAlignVertical: 'top',
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#333',
  },
  saveButton: {
    backgroundColor: '#0FB9ED',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    gap: 5
  },
  editIcon: {
    width: 16,
    height: 16,
  }
});
