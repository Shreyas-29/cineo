import { Search as SearchIcon } from '@/components'
import { genres } from '@/constants/genres'
import { cn } from '@/lib/utils'
import { Genre } from '@/types/genre'
import { Movie } from '@/types/movie'
import axios from 'axios'
import { useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Image, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Geners = 28 | 12 | 16 | 35 | 80 | 99 | 18 | 10751 | 14 | 36 | 27 | 10402 | 9648 | 10749 | 878 | 10770 | 53 | 10752 | 37;

type ItemProps = {
    item: Genre;
    index: number;
};

const Search = () => {

    const router = useRouter();

    const inputRef = useRef<any>(null);

    const [selectedGenre, setSelectedGenre] = useState<Geners>(genres[0].id as 28);
    const [selectedGenreMovies, setSelectedGenreMovies] = useState<Movie[]>([]);
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [query, setQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchMoviesByGenre = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_APIKEY}&language=en-US&with_genres=${selectedGenre}`
                );
                setSelectedGenreMovies(response.data.results);
            } catch (error) {
                console.error(`Error fetching movies for genre ${selectedGenre}:`, error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMoviesByGenre();
    }, [selectedGenre]);

    useEffect(() => {
        setQuery('');
    }, [router]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setIsSearching(true);
            try {
                if (query.trim() === '') {
                    setSearchResults([]);
                    return;
                }

                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_APIKEY}&language=en-US&query=${query}`
                );

                setSearchResults(response.data.results);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setIsSearching(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    const renderItem = ({ item, index }: ItemProps) => (
        <TouchableOpacity
            className={cn(
                'flex-row items-center justify-center px-4 h-9 ml-2 py-1 rounded-lg transition-colors duration-500',
                selectedGenre === item.id ? 'bg-zinc-800 border border-transparent' : 'bg-transparent border border-zinc-800'
            )}
            disabled={selectedGenre === item.id || isLoading}
            onPress={() => setSelectedGenre(item.id as Geners)}
        >
            <Text className='text-sm text-white font-[Medium]'>
                {item.name}
            </Text>
        </TouchableOpacity>
    );


    return (
        <SafeAreaView className='flex-1 bg-[#121212]' focusable>
            <ScrollView className='flex-1 bg-[#121212]' keyboardShouldPersistTaps='always'>
                <StatusBar animated barStyle='light-content' />
                <View className='relative flex-col items-center justify-start flex-1'>

                    <View
                        className={cn(
                            'flex-row items-center w-full px-4 mt-4',
                        )}
                    >
                        <SearchIcon width={20} height={20} className='absolute z-10 w-5 h-5 left-7' />
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            blurOnSubmit={false}
                            onFocus={() => inputRef.current?.scrollTo({ x: 0, y: 0, animated: true })}
                            placeholder='Movies, shows and more'
                            className='flex- w-full pl-10 pr-4 py-2 text-base font-[Regular] bg-white rounded-md'
                        />
                    </View>

                    {!query && (
                        <>
                            <View className='flex-col items-start h-24 mt-4'>
                                <Text className='font-[Medium] text-lg text-white px-4 mb-4'>
                                    People Search For
                                </Text>
                                <FlatList
                                    horizontal
                                    data={genres}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                            <View className='relative flex-col items-center flex-1 w-full h-full mt-2'>
                                {isLoading ? (
                                    <View className='flex-col items-center justify-center mt-20'>
                                        <ActivityIndicator size='large' color='white' />
                                    </View>
                                ) : (
                                    <View className='flex-row flex-wrap items-start w-full mb-16 justify-evenly'>
                                        {selectedGenreMovies?.slice(0, 15).map((item: any, index: number) => (
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
                        </>
                    )}

                    {query && (
                        <View className='relative flex-1 mt-8 mb-20'>
                            <View className='flex-row flex-wrap items-start w-full justify-evenly'>
                                {isSearching ? (
                                    <ActivityIndicator size='large' color='#fff' className='mt-80' />
                                ) : (
                                    searchResults?.map((item: any, index: number) => (
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
                                    ))
                                )}
                            </View>
                        </View>
                    )}

                    {query && searchResults?.length === 0 && (
                        <View className='flex-col items-center justify-center flex-1 mt-24'>
                            <Text className='text-white text-lg font-[Medium]'>
                                No results found
                            </Text>
                        </View>
                    )}

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Search