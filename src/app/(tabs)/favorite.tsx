import useWatchlist from '@/lib/watchlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';

const Favorite = () => {

    const router = useRouter();
    const route = useRoute();

    const { watchlist, setWatchlist } = useWatchlist();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getWatchlist = async () => {
        setIsLoading(true);
        try {
            const watchlist = await AsyncStorage.getItem('@watchlist') || '[]';

            const parsedWatchlist = JSON.parse(watchlist);

            setWatchlist(parsedWatchlist);
        } catch (error) {
            console.log('Error getting watchlist', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlRefresh = () => {
        getWatchlist();
    };

    useEffect(() => {
        getWatchlist();
    }, []);


    return (
        <SafeAreaView className='flex-1 !bg-[#121212]'>
            <ScrollView
                className='flex-1'
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handlRefresh} />}
            >
                <StatusBar animated barStyle='light-content' />
                <View className='flex-col items-start py-4'>
                    <Text className='text-xl text-start items-start font-[Semibold] text-white px-4'>
                        Watchlist
                    </Text>

                    {!isLoading && watchlist?.length === 0 && (
                        <View className='flex-col items-center justify-center mt-12'>
                            <Text className='text-lg font-[Regular] text-zinc-300 px-4'>
                                No movies or shows added to watchlist
                            </Text>
                        </View>
                    )}

                    {isLoading ? null : (
                        <View className='flex-row flex-wrap items-start w-full mt-8 justify-evenly'>
                            {watchlist?.map((item: any, index: number) => (
                                <TouchableOpacity
                                    key={index}
                                    className='basis-[30%] mb-2'
                                    onPress={() => router.push({
                                        pathname: '/details',
                                        params: item,
                                    })}
                                >
                                    <Image
                                        source={{ uri: `https://image.tmdb.org/t/p/w500${item?.poster_path ?? item?.backdrop_path}` }}
                                        className='object-cover w-full h-40 rounded-md'
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Favorite