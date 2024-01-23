import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Setting = () => {

    const router = useRouter();

    return (
        <View>
            <TouchableOpacity className='flex-row items-center' onPress={() => {
                router.push({
                    pathname: '/settings',
                });
            }}>
                <Ionicons name='settings-outline' size={16} color='#e4e4e7' />
                <Text className='ml-1.5 text-xs font-[Medium] text-zinc-200'>
                    Help & Settings
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Setting