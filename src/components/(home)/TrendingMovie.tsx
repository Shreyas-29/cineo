import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import List from '../List';

const TrendingMovie = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_APIKEY}&language=en-US`);

                setMovies(response.data.results);
            } catch (error) {
                console.log('Error from popular movies', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View className='flex-col items-start w-full mt-5'>
            <View className='flex-row items-center justify-between w-full px-4'>
                <Text className='text-xl font-[Semibold] text-white'>
                    Trending Movies
                </Text>
                <TouchableOpacity>
                    <Ionicons name="chevron-forward-outline" size={20} color="#a1a1aa" />
                </TouchableOpacity>
            </View>

            <List data={movies} />
        </View>
    )
}

export default TrendingMovie