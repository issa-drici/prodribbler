import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View, ViewScreen } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <ViewScreen withoutPadding>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Notifications
          </Text>
        </View>
        <ScrollView style={styles.notificationContainer}>
          <Text style={styles.noNotification}>
            No notifications
          </Text>
        </ScrollView>
      </View>
    </ViewScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium'
  },
  notificationContainer: {
    flex: 1,
    margin: 0,
    padding: 0,
    paddingTop: 300,
  },
  noNotification: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular'
  }
});
