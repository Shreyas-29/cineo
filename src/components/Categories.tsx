import { genres } from '@/constants/genres';
import { getGenreImagePath } from '@/lib/images';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

const Categories = () => {

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity className='relative ml-4 w-28 h-14'>
                <Text className='text-xs font-[Medium] text-white absolute left-2 bottom-1 z-50'>
                    {item.name}
                </Text>
                <View className='absolute top-0 bottom-0 left-0 right-0 z-10'>
                    <Image
                        source={getGenreImagePath(item.name)}
                        className='w-full h-full'
                    />
                </View>
            </TouchableOpacity>
        )
    };

    return (
        <View className='flex-col items-start w-full'>
            <View className='flex-row items-start px-4'>
                <Text className='text-xl font-[Semibold] text-white'>
                    Category
                </Text>
            </View>
            <View className='flex-row items-center justify-center w-full mt-2'>
                <FlatList
                    data={genres}
                    horizontal={true}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingRight: 16 }}
                />
            </View>
        </View>
    )
}

export default Categories