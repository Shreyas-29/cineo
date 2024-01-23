import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import languages from '@/constants/languages'
import getColors from '@/lib/colors'
import { LinearGradient } from 'expo-linear-gradient'

type Language = {
    code: string,
    name: string
}


const Languages = () => {

    const renderItem = ({ item }: { item: Language }) => {

        const colors = getColors(item.code);

        return (
            <TouchableOpacity className='ml-4'>
                <LinearGradient
                    colors={colors}
                    className='flex-row items-center justify-center rounded-lg w-28 h-14'
                // start={{ x: 0, y: 0.5 }}
                // end={{ x: 1, y: 0.5 }}
                >
                    <Text className='text-sm font-[Medium] text-white z-50'>
                        {item.name}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }


    return (
        <View className='flex-col items-start w-full my-6'>
            <View className='flex-row items-start px-4'>
                <Text className='text-xl font-[Semibold] text-white'>
                    Popular Languages
                </Text>
            </View>
            <View className='flex-row items-center justify-center w-full mt-2'>
                <FlatList
                    data={languages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.toString() + Math.random()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 16 }}
                />
            </View>
        </View>
    )
}

export default Languages