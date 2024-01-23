import { useAuth } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = () => {

    const { isLoaded, isSignedIn, signOut } = useAuth();

    return (
        <SafeAreaView className='flex-1 bg-[#180609 bg-[#121212] g-[#221f1f]'>
            <StatusBar animated barStyle='light-content' />
            {!isLoaded && (
                <View className='items-center justify-center flex-1 absolute top-0 bottom-0 left-0 right-0 bg-[#121212] z-50'>
                    <ActivityIndicator color='#fff' size={24} />
                </View>
            )}
            <View className='flex-col items-center justify-center flex-1 w-full'>
                <View className='flex-col items-center justify-center'>
                    <Image source={require("@/assets/images/icon.png")} className='w-40 h-40' />
                </View>
                <View className='flex-col items-center justify-center px-4 mt-20'>
                    <Text className='text-3xl font-[Bold] text-white text-center'>
                        Unlimited movies, TV shows, and more.
                    </Text>
                    <Text className='text-sm text-center font-[Regular] text-zinc-300 mt-5 px-8'>
                        Watch anywhere. Cancel anytime. Tap the button below to sign up.
                    </Text>
                    <Link href={isSignedIn ? '/(tabs)' : '/login'} asChild>
                        <TouchableOpacity>
                            <LinearGradient
                                colors={['#0ea5e9', '#1d4ed8']}
                                // start={[0, 0]}
                                // end={[0.6, 2]}
                                className='flex-row items-center px-16 py-3 mx-4 mt-8 rounded-lg'>
                                <Text className='text-white font-[Semibold] text-base'>
                                    {isSignedIn ? 'Start Watching' : 'Get Started'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome