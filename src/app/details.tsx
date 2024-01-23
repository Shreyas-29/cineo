import { Add, Check, Download, List, Share as ShareIcon } from '@/components'
import useWatchlist from '@/lib/watchlist'
import { Movie } from '@/types/movie'
import { Feather, Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native'
import { Toast } from 'react-native-toast-notifications'

const Details = () => {

    const router = useRouter();

    const route = useRoute();

    const params = useLocalSearchParams();

    const movieId = params?.id;

    const { setWatchlist } = useWatchlist();

    let isTv = params?.media_type === 'tv';

    const [data, setData] = useState<Movie>();
    const [relatedMovies, setRelatedMovies] = useState<Movie[] | null>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);

    const getReleaseYear = (releaseDate: Date) => {
        const dateObject = new Date(releaseDate);
        return dateObject.getFullYear();
    };

    const releaseYear = getReleaseYear(data?.release_date! ?? data?.first_air_date!);

    const formatRuntime = (runtime: number): string => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;

        const hoursText = hours > 0 ? `${hours} hr` : '';
        const minutesText = minutes > 0 ? `${minutes} mins` : '';

        return `${hoursText} ${minutesText}`.trim();
    };

    const formatVoteAverage = (voteAverage: number): string => {
        // Round the vote average to one decimal place
        const roundedVoteAverage = Math.round(voteAverage * 10) / 10;
        return roundedVoteAverage.toString();
    };

    const runtime = formatRuntime(data?.runtime!);

    const handleShare = async () => {
        try {
            await Share.share({
                title: 'Cineo',
                message: 'Watch movie on Cineo: ' + data?.title + ' ' + data?.homepage,
            });
        } catch (error) {
            console.log(error);
            Toast.show('Something went wrong');
        }
    };

    const handleDownload = () => {
        Toast.show('This feature will be available soon!');
    };

    const handleToggleWatchlist = async () => {
        try {
            const watchlistState = await AsyncStorage.getItem(`@watchlist-${data?.id!}`) || 'false';
            const newWatchlistState = watchlistState === 'true' ? 'false' : 'true';

            await AsyncStorage.setItem(`@watchlist-${data?.id!}`, newWatchlistState);

            const watchlistData = await AsyncStorage.getItem('@watchlist') || '[]';
            const parsedWatchlistData = JSON.parse(watchlistData);

            const existingIndex = parsedWatchlistData.findIndex((item: Movie) => item?.id === data?.id);

            if (existingIndex !== -1) {
                parsedWatchlistData.splice(existingIndex, 1);
            } else {
                parsedWatchlistData.push(data ?? {});
            }

            await AsyncStorage.setItem('@watchlist', JSON.stringify(parsedWatchlistData));

            setIsInWatchlist(newWatchlistState === 'true');

            // Update state in the Favorites page
            setWatchlist(parsedWatchlistData);

            Toast.show(newWatchlistState === 'true' ? 'Added to watchlist' : 'Removed from watchlist');
        } catch (error: any) {
            console.log('Error adding/removing movie:', error.message);
            Toast.show('Something went wrong');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?&api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_APIKEY}&language=en-US`);
                let response;

                if (isTv) {
                    response = await axios.get(`https://api.themoviedb.org/3/tv/${params?.id}?api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_APIKEY}&language=en-US`);
                } else {
                    response = await axios.get(`https://api.themoviedb.org/3/movie/${params?.id}?api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_APIKEY}&language=en-US`);
                }

                setData(response.data);
            } catch (error) {
                console.log("Error fetching movie data from Details: ", error)
            } finally {
                setIsLoading(false);
            }
        };

        const fetchRelatedMovies = async () => {
            try {
                // const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?&api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_APIKEY}&language=en-US&page=1`);
                let response;

                if (isTv) {
                    response = await axios.get(`https://api.themoviedb.org/3/tv/${params?.id}/similar?api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_APIKEY}&language=en-US&page=1`);
                } else {
                    response = await axios.get(`https://api.themoviedb.org/3/movie/${params?.id}/similar?api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_APIKEY}&language=en-US&page=1`);
                }

                setRelatedMovies(response.data.results);
            } catch (error) {
                console.log("Error fetching related movies from Details: ", error)
            }
        };

        fetchData();
        fetchRelatedMovies();
    }, [movieId, route]);

    useEffect(() => {
        const getWatchlistState = async () => {
            try {
                const watchlistState = await AsyncStorage.getItem(`@watchlist-${data?.id!}`) || 'false';
                setIsInWatchlist(watchlistState === 'true');
            } catch (error: any) {
                console.log('Error getting watchlist state:', error.message);
            }
        };

        getWatchlistState();
    }, [data?.id]);

    if (!data) {
        return (
            <View className='items-center flex-1 justify-center bg-[#121212] w-full'>
                <Text className='text-xl font-[Semibold] text-zinc-200'>
                    Movie not found
                </Text>
                <TouchableOpacity className='flex-row items-center justify-center px-5 py-2 mt-4 bg-blue-500 rounded-lg' onPress={() => router.back()}>
                    <Text className='text-blue-50 text-sm font-[Semibold]'>
                        Go home
                    </Text>
                </TouchableOpacity>
            </View>
        )
    };


    return (
        <ScrollView className='flex-1 bg-[#121212] z-50' scrollEnabled={!isLoading} showsVerticalScrollIndicator={false}>
            <StatusBar animated style='light' backgroundColor='transparent' />

            {isLoading && (
                <View className='absolute top-0 bottom-0 left-0 right-0 z-50 flex-row items-center justify-center w-full h-full bg-black/50'>
                    <ActivityIndicator size='large' color='white' />
                </View>
            )}

            <View className='absolute left-0 right-0 z-40 flex-row items-center justify-between w-full px-4 py-2 top-10'>
                <TouchableOpacity className='flex-row items-center justify-center w-10 h-10 rounded-full bg-black/40' onPress={() => router.push('..')}>
                    <Feather name='chevron-left' size={28} color='#f5f5f4' />
                </TouchableOpacity>
                <View className='flex-row items-center justify-end'>
                    <TouchableOpacity className='flex-row items-center justify-center w-8 h-8'>
                        <Image source={require('@/assets/images/profile.jpg')} className='object-cover w-full h-full rounded-md' />
                    </TouchableOpacity>
                </View>
            </View>

            <View className='relative w-full'>
                <Image source={{
                    uri:
                        data?.poster_path ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
                            : `https://image.tmdb.org/t/p/w500/${data?.backdrop_path}`
                }} className='w-full h-80' />
                <LinearGradient
                    colors={['transparent', '#121212']}
                    className='absolute bottom-0 left-0 right-0 h-24'
                />
            </View>

            <View className='flex-col items-center justify-center w-full px-4'>
                <Text className='text-2xl font-[Semibold] text-center text-white mt-2'>
                    {data?.title ?? data?.name}
                </Text>
                {data?.tagline && (
                    <Text className='text-sm font-[Regular] text-center text-zinc-500 mt-2'>
                        {data?.tagline}
                    </Text>
                )}
                <View className='flex-row items-center justify-center mt-2 gap-x-1'>
                    <Text className='text-sm text-zinc-400 font-[Regular]'>
                        {releaseYear}
                    </Text>
                    <Text className='text-white'>
                        •
                    </Text>
                    {runtime && (
                        <Text className='text-sm text-zinc-400 font-[Regular]'>
                            {runtime}
                        </Text>
                    )}
                    <Text className='text-white'>
                        {runtime && '•'}
                    </Text>
                    <Text className='text-sm text-zinc-400 font-[Regular]'>
                        {data?.spoken_languages?.length} Languages
                    </Text>
                    <Text className='text-white'>
                        •
                    </Text>
                    <Text className='text-sm text-zinc-400 font-[Regular]'>
                        {formatVoteAverage(data?.vote_average!)}
                    </Text>
                    <Text className='px-1 py-px rounded-sm mt-0.5 bg-yellow-500 font-[Medium] text-[8px] text-black'>
                        IMDB
                    </Text>
                </View>
                <TouchableOpacity className='flex-row items-center justify-center w-full py-3 mt-5 bg-white rounded-md shadow-md shadow-white'>
                    {data?.status === 'Released' ? (
                        <Ionicons name='play' size={20} color='black' />
                    ) : (
                        <Feather name='info' size={20} color='black' />
                    )}
                    <Text className='text-sm text-black ml-1.5 font-[Semibold]'>
                        {data?.status === 'Released' ? 'Watch Now' : 'Coming Soon'}
                    </Text>
                </TouchableOpacity>
                <View className='flex-col mt-5'>
                    <Text className='text-sm text-zinc-200 font-[Medium] text-center'>
                        {data?.genres?.map((genre: any) => genre.name).join(' • ')}
                    </Text>
                    <Text className='text-sm text-zinc-400 font-[Regular] mt-4'>
                        {data?.overview}
                    </Text>
                </View>
                <View className='flex-row items-center justify-start w-full mt-10 gap-x-2'>
                    <TouchableOpacity
                        className='flex-col items-center px-4 py-2 bg-black/0'
                        onPress={handleToggleWatchlist}
                    >
                        {isInWatchlist ? (
                            <Check style={[{ width: 24, height: 24 }]} />
                        ) : (
                            <Add style={[{ width: 24, height: 24 }]} />
                        )}
                        <Text className='text-2xs text-zinc-400 mt-1 font-[Regular]'>
                            {isInWatchlist ? 'Added' : 'Watchlist'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='items-center px-4 py-2' onPress={handleShare}>
                        <ShareIcon className='w-4 h-4' />
                        <Text className='text-2xs text-zinc-400 mt-1 font-[Regular]'>
                            Share
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='items-center px-4 py-2' onPress={handleDownload}>
                        <Download className='w-4 h-4' />
                        <Text className='text-2xs text-zinc-400 mt-1 font-[Regular]'>
                            Download
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {relatedMovies?.length! > 0 && (
                <View className='flex-col items-start justify-start my-10'>
                    <Text className='px-4 text-lg font-[Medium] text-white'>
                        More Like This
                    </Text>
                    <List data={relatedMovies} />
                </View>
            )}
        </ScrollView>
    )
}

export default Details