import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect, useState } from 'react';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { HeaderProvider } from '@/context/HeaderContext';
// import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Text, View } from '@/components/Themed';
import { ActivityIndicator, Image } from 'react-native';
import { AuthContext, AuthProvider } from '@/context/AuthProvider';
import { PermissionsProvider, usePermissions } from '@/context/PermissionsProvider';
import * as SecureStore from "expo-secure-store";
import { useVersionCheck } from '@/hooks/useVersionCheck';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AuthStackNavigator() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'none',
          navigationBarHidden: true,
        }}
      />
    </Stack>
  );
}

function HomeStackNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(stack)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}

function PermissionsStackNavigator() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
      }}
    >
      <Stack.Screen name="permissions" options={{ headerShown: false }} />
    </Stack>
  );
}

function RootLayoutNav() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const { permissionsGranted, cameraPermission, libraryPermission } = usePermissions();
  const segments = useSegments();
  const router = useRouter();

  // Effet pour l'initialisation de l'utilisateur
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const userData = await SecureStore.getItemAsync("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'utilisateur:', error);
        setIsInitialized(true);
      }
    };

    initializeUser();
  }, []); // Dépendances vides car on ne veut l'exécuter qu'une fois

  // Effet pour la navigation
  useEffect(() => {
    if (!isInitialized || cameraPermission === null || libraryPermission === null) {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';
    const isSignupScreen = segments[1] === 'signup';
    const isPermissionsScreen = segments[0] === 'permissions';

    if (!permissionsGranted && !isPermissionsScreen) {
      router.replace('/permissions');
    } else if (!user && !isSignupScreen && permissionsGranted) {
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup && permissionsGranted) {
      router.replace('/(tabs)');
    }

    setIsLoading(false);
    SplashScreen.hideAsync();
  }, [isInitialized, user, segments, permissionsGranted, cameraPermission, libraryPermission]);

  if (isLoading) {
    return null; // Le splash screen sera affiché pendant le chargement
  }

  return (
    <HeaderProvider>
      <ThemeProvider value={DefaultTheme}>
        <StatusBar style="light" />
        {!permissionsGranted ? (
          <PermissionsStackNavigator />
        ) : user ? (
          <HomeStackNavigator />
        ) : (
          <AuthStackNavigator />
        )}
      </ThemeProvider>
    </HeaderProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Montserrat-Black': require('../assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-BlackItalic': require('../assets/fonts/Montserrat-BlackItalic.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-BoldItalic': require('../assets/fonts/Montserrat-BoldItalic.ttf'),
    'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-ExtraBoldItalic': require('../assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
    'Montserrat-ExtraLight': require('../assets/fonts/Montserrat-ExtraLight.ttf'),
    'Montserrat-ExtraLightItalic': require('../assets/fonts/Montserrat-ExtraLightItalic.ttf'),
    'Montserrat-Italic': require('../assets/fonts/Montserrat-Italic.ttf'),
    'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-LightItalic': require('../assets/fonts/Montserrat-LightItalic.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-MediumItalic': require('../assets/fonts/Montserrat-MediumItalic.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-SemiBoldItalic': require('../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
    'Montserrat-Thin': require('../assets/fonts/Montserrat-Thin.ttf'),
    'Montserrat-ThinItalic': require('../assets/fonts/Montserrat-ThinItalic.ttf'),
    ...FontAwesome.font,
  });

  const { checkVersion, showUpdateDialog, needsUpdate, isForceUpdate } = useVersionCheck();

  useEffect(() => {
    checkVersion();
  }, []);

  useEffect(() => {
    if (needsUpdate) {
      showUpdateDialog();
    }
  }, [needsUpdate]);

  // if (isForceUpdate && needsUpdate) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Une mise à jour est nécessaire pour continuer</Text>
  //     </View>
  //   );
  // }

  return (
    <AuthProvider>
      <PermissionsProvider>
        <RootLayoutNav />
      </PermissionsProvider>
    </AuthProvider>
  );
}