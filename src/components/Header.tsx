import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { genres } from '@/constants/genres';
import { Movie } from '@/types/movie';
import { useUser } from '@clerk/clerk-expo';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Toast } from 'react-native-toast-notifications';

const Header = () => {

    const { width } = Dimensions.get('window');

    const router = useRouter();

    const { user } = useUser();

    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getGenreNames = (genreIds: number[]) => {
        const maxGenres = 3;
        const selectedGenres = genreIds.slice(0, maxGenres);

        return selectedGenres.map((genreId) => {
            const genre = genres.find((g) => g.id === genreId);
            return genre ? genre.name : 'Unknown Genre';
        });
    };

    const getReleaseYear = (releaseDate: Date) => {
        const dateObject = new Date(releaseDate);
        return dateObject.getFullYear();
    };

    const renderItem = ({ item, index }: any) => {

        const genreNames = getGenreNames(item?.genre_ids);
        const releaseYear = getReleaseYear(item?.release_date);

        return (
            <View className='flex-col items-center justify-center w-full'>
                <View className='flex-col items-center justify-center w-full h-[300px]'>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item?.poster_path}` }} className='object-cover object-top w-full h-full' />
                    <LinearGradient
                        colors={['transparent', '#121212']}
                        locations={[0, 1]}
                        className='h-20 w-full -bottom-1 !z-0 absolute'
                    />
                </View>
                <View className='flex-col items-center justify-start w-full px-4 pb-2 bg-violet100'>
                    <Text className='text-2xl font-[Semibold] text-white text-center'>
                        {item?.title.substring(0, 22)}
                    </Text>
                    <Text className='text-sm font-[Medium] text-zinc-200 text-center'>
                        {releaseYear} • {genreNames?.join(' • ')}
                    </Text>
                    <View className='flex-row items-center justify-evenly w-full !z-50'>
                        <TouchableOpacity
                            className='flex-col items-center justify-center p-4 rounded-lg bg-white/2'
                            onPress={() => {
                                router.push({
                                    pathname: '/details',
                                    params: item,
                                })
                            }}
                        >
                            <Ionicons name='add' size={20} color='white' />
                            <Text className='text-white mt-0.5 font-[Medium] text-sm'>
                                List
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='flex-row items-center justify-center px-8 py-3 rounded-lg bg-zinc-50'
                            onPress={() => {
                                router.push({
                                    pathname: '/details',
                                    params: item,
                                })
                            }}
                        >
                            <Ionicons name='play' size={20} color='black' />
                            <Text className='text-zinc-900 font-[Semibold] ml-1.5 text-base'>
                                Play
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className='flex-col items-center justify-center p-4 rounded-lg bg-white/2'
                            onPress={() => {
                                router.push({
                                    pathname: '/details',
                                    params: item,
                                })
                            }}
                        >
                            <Ionicons name='information' size={20} color='white' />
                            <Text className='text-white mt-0.5 font-[Medium] text-sm'>
                                Info
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };

    const pagination = (
        <Pagination
            dotsLength={movies?.slice(0, 10).length}
            renderDots={(activeIndex: number) => {
                return (
                    <View className='flex-row items-center justify-center w-full -mt-8'>
                        {movies?.slice(0, 10).map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    className={`mx-1 rounded-full ${activeIndex === index ? 'bg-[#fff]' : 'bg-[#3f3f46]'}`}
                                    style={{
                                        height: activeIndex === index ? 7 : 5,
                                        width: activeIndex === index ? 7 : 5,
                                    }}
                                />
                            )
                        })}
                    </View>
                )
            }}
            activeDotIndex={activeSlide}
            containerStyle={{ backgroundColor: 'transparent' }}
            dotContainerStyle={{
                // marginHorizontal: 2,
                flexDirection: 'row',
                justifyContent: 'center'
            }}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                // marginHorizontal: 8,
                backgroundColor: 'white'
            }}
            inactiveDotStyle={{
                backgroundColor: '#71717a'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
        />
    );

    const handleProfile = () => {
        Toast.show(`Hello, ${user?.firstName}!`);
    };

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_APIKEY}&language=en-US&page=1`);
                // const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_APIKEY}&language=en-US&page=1`);

                setMovies(response.data.results);
            } catch (error) {
                console.log("Error fetching movie data from Header: ", error)
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <View className='relative flex-col items-center justify-start flex-1 w-full h-full'>
            <View className='absolute left-0 right-0 z-50 flex-row items-center justify-between w-full px-4 py-2 bg-transparent top-8'>
                <View className='flex-row items-center'>
                    <Text className='text-xl font-[Semibold] text-white'>
                        CINEO
                    </Text>
                </View>
                <TouchableOpacity onPress={handleProfile}>
                    <View className='flex-row items-center w-8 h-8'>
                        <Image source={require('@/assets/images/profile.jpg')} className='object-cover w-full h-full rounded-md' />
                    </View>
                </TouchableOpacity>
            </View>
            {isLoading && (
                <View className='flex-row items-center justify-center w-full h-[436px]'>
                    <ActivityIndicator color='#fff' size='large' />
                </View>
            )}
            <View className='flex-col items-center justify-center w-full -mb-4'>
                {!isLoading && (
                    <Carousel
                        loop
                        autoplay
                        data={movies?.slice(0, 10)}
                        vertical={false}
                        itemWidth={width}
                        sliderWidth={width}
                        keyExtractor={(item, index) => index.toString()}
                        autoplayDelay={9000}
                        autoplayInterval={5000}
                        onSnapToItem={(index) => setActiveSlide(index)}
                        renderItem={({ item, index }: any) => renderItem({ item, index })}
                    />
                )}
                {pagination}
            </View>
        </View>
    )
}

export default Header
