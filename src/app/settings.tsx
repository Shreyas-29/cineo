import { useAuth } from '@clerk/clerk-expo'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Toast } from 'react-native-toast-notifications'

const Settings = () => {

    const router = useRouter();

    const { signOut } = useAuth();

    const handleSignOut = () => {
        try {
            signOut();
            router.push('/login');
            Toast.show('Logged out successfully');
        } catch (error) {
            console.log('Error signing out', error);
        }
    };

    return (
        <SafeAreaView className='flex-1 !bg-[#121212]'>
            <StatusBar animated style='light' />
            <View className='flex-col w-full mt-2'>
                <View className='flex-row items-start w-full py-2 border-b border-zinc-700'>
                    <TouchableOpacity className='flex-row items-start px-4 py-2' onPress={() => router.back()}>
                        <Ionicons name='arrow-back-outline' size={24} color='#fff' />
                        <Text className='text-white text-base ml-2 font-[Semibold]'>
                            Help & Settings
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className='flex-col items-start divide-y divide-zinc-700'>
                    <TouchableOpacity className='flex-row items-start justify-between w-full px-8 py-4'>
                        <View className='flex-row items-center'>
                            <Ionicons name='person-circle-outline' size={24} color='#fff' />
                            <View className='flex-col items-start'>
                                <Text className='text-white flex-col items-start text-base ml-4 font-[Medium]'>
                                    Account Settings
                                </Text>
                                <Text className='text-xs ml-4 text-zinc-500 font-[Regular]'>
                                    Subscription, Payments, etc.
                                </Text>
                            </View>
                        </View>
                        <Entypo name='chevron-small-right' size={24} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-start justify-between w-full px-8 py-4'>
                        <View className='flex-row items-center'>
                            <Ionicons name='download-outline' size={24} color='#fff' />
                            <View className='flex-col items-start'>
                                <Text className='text-white flex-col items-start text-base ml-4 font-[Medium]'>
                                    Downloads
                                </Text>
                                <Text className='text-xs ml-4 text-zinc-500 font-[Regular]'>
                                    Download quality, storage, etc.
                                </Text>
                            </View>
                        </View>
                        <Entypo name='chevron-small-right' size={24} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-start justify-between w-full px-8 py-4'>
                        <View className='flex-row items-center'>
                            <Ionicons name='language-outline' size={24} color='#fff' />
                            <View className='flex-col items-start'>
                                <Text className='text-white flex-col items-start text-base ml-4 font-[Medium]'>
                                    App Language
                                </Text>
                                <Text className='text-xs ml-4 text-zinc-500 font-[Regular]'>
                                    English
                                </Text>
                            </View>
                        </View>
                        <Entypo name='chevron-small-right' size={24} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-start justify-between w-full px-8 py-4'>
                        <View className='flex-row items-center'>
                            <Ionicons name='lock-closed-outline' size={24} color='#fff' />
                            <View className='flex-col items-start'>
                                <Text className='text-white flex-col items-start text-base ml-4 font-[Medium]'>
                                    Parental Controls
                                </Text>
                                <Text className='text-xs ml-4 text-zinc-500 font-[Regular]'>
                                    Restrict content, etc.
                                </Text>
                            </View>
                        </View>
                        <Entypo name='chevron-small-right' size={24} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-start justify-between w-full px-8 py-4'>
                        <View className='flex-row items-center'>
                            <Ionicons name='help-circle-outline' size={24} color='#fff' />
                            <View className='flex-col items-start'>
                                <Text className='text-white flex-col items-start text-base ml-4 font-[Medium]'>
                                    Help & Support
                                </Text>
                                <Text className='text-xs ml-4 text-zinc-500 font-[Regular]'>
                                    Help center, contact us
                                </Text>
                            </View>
                        </View>
                        <Entypo name='chevron-small-right' size={24} color='#fff' />
                    </TouchableOpacity>
                </View>
                <View className='flex-col items-center justify-center mt-28'>
                    <TouchableOpacity className='p-5' onPress={handleSignOut}>
                        <Text className='text-blue-500 text-base font-[Semibold]'>
                            Log Out
                        </Text>
                    </TouchableOpacity>
                    <Text className='text-sm mt-2 font-[Regular] text-gray-400 text-center mt-'>
                        App Version 1.0.0
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Settings