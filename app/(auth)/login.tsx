import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image, Platform, ActivityIndicator } from 'react-native';
import { Text, View, ViewScreen } from '@/components/Themed';
// import { useAuth } from '@/contexts/AuthContext';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '@/context/AuthProvider';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useContext(AuthContext);

  // const handleLogin = async () => {
  //   try {
  //     await login(email, password);
  //     router.replace('/(tabs)');
  //   } catch (error: any) {
  //     setError(error.message);
  //   }
  // };

  return (
    <ImageBackground
      source={require('@/assets/images/background.png')}
      style={styles.backgroundImage}
      blurRadius={5}
    >
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />

      <ViewScreen style={styles.overlay} withoutPadding>
        <View style={[styles.container, Platform.OS === 'ios' ? { paddingTop: 50 } : {}]}>


          <Text style={styles.title}>Login</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder='Your Email'
              placeholderTextColor='#fff'
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={password}
                onChangeText={setPassword}
                placeholder='Password'
                placeholderTextColor='#fff'
                onSubmitEditing={() => login(email, password)}
                secureTextEntry
              />
              <TouchableOpacity style={styles.eyeIcon}>
                {/* Ajouter l'icône œil ici */}
              </TouchableOpacity>
            </View>

            <View style={styles.rememberContainer}>
              {/* <View style={styles.checkboxRow}>
                <TouchableOpacity style={styles.checkbox}>

                </TouchableOpacity>
                <Text style={styles.rememberText}>Remember me</Text>
              </View> */}
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => login(email, password)}>
              <LinearGradient
                colors={['#6FD3D1', '#0FB9ED']}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
              </LinearGradient>
            </TouchableOpacity>
            {/* {error && <Text style={styles.error}>{error}</Text>} */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
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
  overlay: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    flex: 1,
    marginHorizontal: 15,
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
  tagline: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
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
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#666',
    marginRight: 10,
    borderRadius: 4,
  },
  rememberText: {
    color: '#fff',
  },
  forgotPassword: {
    color: '#6FD3D1',
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  signupText: {
    color: '#ABABAB',
    fontSize: 14,
  },
  signupLink: {
    color: '#0FB9ED',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  error: {
    color: '#ff4444',
    marginBottom: 15,
    textAlign: 'center',
  },
}); 