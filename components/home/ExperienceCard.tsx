import { ImageBackground, StyleSheet } from 'react-native';
import { GradientText } from '@/components/GradientText';
import { Text, View } from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';

export function ExperienceCard() {
  const experienceSteps = [
    '500 XP',
    '1000 XP',
    '1500 XP',
    '2000 XP',
    '2500 XP'
  ];

  return (
    <View style={styles.cardContainer}>
      <ImageBackground source={require('@/assets/images/football.avif')} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay} />

        <GradientText style={styles.title} colors={['#fff', '#34819A']}>
          Do Not Give Up on Your Dreams!
        </GradientText>
        
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.
        </Text>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>XP Level Progress Bar</Text>
          <View style={styles.progressBar}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#97D8C5', '#25BEE6']}
              style={styles.progressGradient}
            />
            <View style={styles.progressDot} />
          </View>
          <View style={styles.stepsContainer}>
            {experienceSteps.map((step, index) => (
              <Text key={index} style={styles.stepText}>{step}</Text>
            ))}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#25BEE6'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.7
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    marginBottom: 10
  },
  progressContainer: {
    flexDirection: 'column',
    gap: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 10
  },
  progressTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },
  progressBar: {
    width: '100%',
    height: 10,
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
    top: -1.5,
    bottom: 0,
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: '#25BEE6',
    borderWidth: 2,
    borderColor: '#fff'
  },
  stepsContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  stepText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'light'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
  