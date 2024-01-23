import { Movie } from '@/types/movie';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';

interface Props {
    data: Movie[] | null;
}

const List = ({ data }: Props) => {
    return (
        <View className='flex-row items-center mt-2 l-4'>
            <FlatList
                data={data}
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
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
        </View>
    )
}

export default List