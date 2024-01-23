import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import List from '../List';

const Upcoming = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // using try catch fetch the popular movies from themoviesdb
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.EXPO_PUBLIC_THEMOVIEDB_APIKEY}&language=en-US&page=1&`);

                setMovies(response.data.results);
            } catch (error) {
                console.log('Error from upcoming movies', error);
            }
        };

        fetchData();
    }, []);

    return (
        <View className='flex-col items-start w-full mt-6'>
            <View className='flex-row items-center justify-between w-full px-4'>
                <Text className='text-xl font-[Semibold] text-white'>
                    Upcoming
                </Text>
                <TouchableOpacity>
                    <Ionicons name="chevron-forward-outline" size={20} color="#a1a1aa" />
                </TouchableOpacity>
            </View>

            <List data={movies?.slice(0, 20)} />
        </View>
    )
}

export default Upcoming