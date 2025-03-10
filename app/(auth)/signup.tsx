import React, { useContext, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View, ViewScreen } from '@/components/Themed';
// import { useAuth } from '@/contexts/AuthContext';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { AuthContext } from '@/context/AuthProvider';

export default function SignupScreen() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const { register, error, isLoading } = useContext(AuthContext);
  const [hidePassword, setHidePassword] = useState(true);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleSignup = async () => {
    try {
      if (step === 1) {
        // Validations de base
        if (!name || !email || !password || !confirmPassword) {
          throw new Error('All fields are required');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (password.length < 8) {
          throw new Error('Password must be at least 8 characters long');
        }

        // Si tout est OK, passer à l'étape du code de vérification
        setStep(2);
      } else {
        // Étape finale : inscription avec le code de vérification
        if (!verificationCode) {
          throw new Error('Verification code is required');
        }

        await register(email, password, name, verificationCode);
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/background.png')}
      style={styles.backgroundImage}
      blurRadius={5}
    >
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
      <ViewScreen style={styles.overlay} withoutPadding>
        <View style={[styles.container, Platform.OS === 'ios' ? { paddingTop: 50 } : {}]}>
          <Text style={styles.title}>
            {step === 1 ? 'Sign Up' : 'Enter Code'}
          </Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {step === 1 ? (
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#fff"
                value={name}
                onChangeText={setName}
              />

              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#fff"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={hidePassword}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                  <Image source={require('@/assets/icons/eye.png')} style={styles.eyeIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Confirm Password"
                  placeholderTextColor="#fff"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={hidePassword}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                  <Image source={require('@/assets/icons/eye.png')} style={styles.eyeIcon} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Text style={styles.instructions}>
                A code has been sent to your email
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Enter verification code"
                placeholderTextColor="#fff"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>
          )}

          <TouchableOpacity onPress={handleSignup}>
            <LinearGradient
              colors={['#6FD3D1', '#0FB9ED']}
              style={styles.button}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>
                {isLoading ? <ActivityIndicator size="small" color="#fff" /> : step === 1 ? 'Sign Up' : 'Verify'}

              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {step === 1 && (
            <View style={styles.linkContainer}>
              <Text style={styles.alreadyText}>Already have an account ?</Text>

              <Link href="/(auth)/login" asChild>
                <TouchableOpacity style={styles.linkButton}>
                  <Text style={styles.linkText}>Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          )}
        </View>
      </ViewScreen>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  logo: {
    width: '70%',
    height: undefined,
    aspectRatio: 4,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 125,
    marginBottom: 100,
  },
  overlay: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
  },
  instructions: {
    color: '#fff',
    fontFamily: 'Montserrat-Light',
    marginBottom: 20,
    fontSize: 16,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    paddingTop: 8,
    paddingBottom: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    borderCurve: 'continuous',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  error: {
    color: '#ff4444',
    marginBottom: 15,
    textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  linkButton: {
    alignItems: 'center',
  },
  linkText: {
    color: '#0FB9ED',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  alreadyText: {
    color: '#ABABAB',
    fontSize: 14,
  },
}); 
