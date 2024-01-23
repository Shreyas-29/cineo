import { Setting, SubscriptionCard } from '@/components'
import useWatchlist from '@/lib/watchlist'
import { useUser } from '@clerk/clerk-expo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {

    const { user } = useUser();

    const router = useRouter();

    const navigation = useNavigation();

    const { watchlist, setWatchlist } = useWatchlist();

    const getWatchlist = async () => {
        try {
            const watchlist = await AsyncStorage.getItem('@watchlist') || '[]';

            const parsedWatchlist = JSON.parse(watchlist);

            setWatchlist(parsedWatchlist);
        } catch (error) {
            console.log('Error getting watchlist', error);
        }
    };

    useEffect(() => {
        getWatchlist();
    }, []);


    return (
        <SafeAreaView className='flex-1 !bg-[#121212]'>
            <StatusBar animated barStyle='light-content' />
            <View className='flex-row items-center justify-between w-full px-4 py-4'>
                <View className='flex-row items-center'>
                    <Text className='text-xl font-[Semibold] text-white'>
                        CINEO
                    </Text>
                </View>
                <Setting />
            </View>
            <View className='flex-row items-start justify-between px-4 mt-8'>
                <View className='flex-col items-start max-w-[50%]'>
                    <Text className='text-base font-[Medium] text-zinc-100 flex-row items-start'>
                        Subscribe to Cineo Premium
                    </Text>
                    <Text className='mt-1 text-xs text-zinc-500'>
                        {user?.emailAddresses[0].emailAddress}
                    </Text>
                </View>
                <View className='flex-col items-center'>
                    <SubscriptionCard />
                    <Text className='mt-1 text-2xs text-zinc-400'>
                        Manage Subscription
                    </Text>
                </View>
            </View>
            <View className='bg-zinc-700 w-full h-px my-8 mx-auto max-w-[90%]'></View>
            <View className='flex-col items-start px-4'>
                <Text className='text-xl font-[Medium] text-white'>
                    Profile
                </Text>
                <Text className='mt-1 text-xs text-zinc-400'>
                    Manage your profile and account settings
                </Text>
                <Image
                    source={require('@/assets/images/profile.jpg')}
                    className='w-12 h-12 mt-4 rounded-lg'
                />
                <Text className='text-xs capitalize font-[Regular] text-zinc-300 mt-1'>
                    {user?.firstName} {user?.lastName}
                </Text>
            </View>
            <View className='flex-col items-start w-full pb-20 mt-8'>
                <Text className='text-xl px-4 font-[Medium] text-white'>
                    Watchlist
                </Text>
                {watchlist?.length === 0 && (
                    <View className='items-center mt-4 ml-4'>
                        <Text className='font-[Regular] text-sm text-zinc-400'>
                            Your watchlist is empty
                        </Text>
                    </View>
                )}
                <View className='flex-row items-start w-full mt-4 overflow-x-scroll'>
                    <FlatList
                        data={watchlist}
                        renderItem={({ item }: any) => (
                            <TouchableOpacity
                                className='mr-2'
                                onPress={() => router.push({
                                    pathname: '/details',
                                    params: item,
                                })}
                            >
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w500${item?.poster_path ?? item?.backdrop_path}` }}
                                    className='object-cover h-40 rounded-md w-28'
                                />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.toString() + Math.random()}
                        horizontal={true}
                        contentContainerStyle={{ paddingHorizontal: 16 }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profile