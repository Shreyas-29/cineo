import '@/styles/global.css';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { SplashScreen, usePathname, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import Welcome from './(auth)';
import AuthLayout from './(auth)/_layout';
import TabLayout from './(tabs)/_layout';
import Details from './details';
import Settings from './settings';
import Subscription from './subscription';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const Stack = createStackNavigator();

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  }
};

export default function RootLayout() {

  const [loaded, error] = useFonts({
    "Light": require('../assets/fonts/Inter-Light.ttf'),
    "Regular": require('../assets/fonts/Inter-Regular.ttf'),
    "Medium": require('../assets/fonts/Inter-Medium.ttf'),
    "Semibold": require('../assets/fonts/Inter-SemiBold.ttf'),
    "Bold": require('../assets/fonts/Inter-Bold.ttf'),
    "Extrabold": require('../assets/fonts/Inter-ExtraBold.ttf'),
    "Black": require('../assets/fonts/Inter-Black.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache} afterSignInUrl='/(tabs)'>
      <Layout />
    </ClerkProvider>
  )
}

function Loading() {
  return (
    <View className='flex-col items-center justify-center flex-1 w-full'>
      <ActivityIndicator color='#fff' size={24} />
    </View>
  )
}

function Layout() {

  const { user } = useUser();
  console.log("user", user);

  const { isLoaded, isSignedIn } = useAuth();

  const router = useRouter();

  useEffect(() => {
    console.log('isSignedIn', isSignedIn);

    if (!isLoaded) (
      <Loading />
    )

    if (isLoaded && isSignedIn === false) {
      router.push("/(auth)");
    }
    if (isLoaded && isSignedIn === true) {
      router.push("/(tabs)");
    }
  }, [isLoaded, isSignedIn]);

  return (
    <RootLayoutNav />
  );
}

function RootLayoutNav() {

  const name = usePathname();

  const getOffsetBottom = () => {
    // Check if the current route is '/details'
    if (name === '/details' || name === '/settings') {
      return 20;
    } else {
      return 60;
    }
  };

  return (
    <ToastProvider
      animationType='zoom-in'
      offsetBottom={getOffsetBottom()}
      placement='bottom'
      swipeEnabled
      style={{
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#27272a',
      }}
      textStyle={{
        fontSize: 12,
        fontFamily: 'Medium',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <Stack.Navigator screenOptions={{ presentation: 'modal', animationTypeForReplace: 'push' }}>
        <Stack.Screen name='(auth)' component={AuthLayout} options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" component={TabLayout} options={{ headerShown: false }} />
        <Stack.Screen
          name="details"
          component={Details}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureVelocityImpact: 0.5,
            gestureResponseDistance: 400,
            detachPreviousScreen: true,
          }}
        />
        <Stack.Screen
          name='settings'
          component={Settings}
          options={{
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            gestureResponseDistance: 400
          }}
        />
        <Stack.Screen
          name='subscription'
          component={Subscription}
          options={{
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            gestureResponseDistance: 400
          }}
        />
      </Stack.Navigator>
    </ToastProvider>
  );
}
