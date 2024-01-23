import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const SubscriptionCard = () => {

    const router = useRouter();

    return (
        <View>
            <TouchableOpacity
                className='flex-row items-center justify-center px-6 rounded-lg h-9'
                onPress={() => {
                    router.push('/subscription');
                }}
            >
                <LinearGradient
                    colors={['#0ea5e9', '#1d4ed8']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: '100%',
                        borderRadius: 8,
                    }}
                />
                <Text className='text-sm font-[Medium] text-white'>
                    Subscribe
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default SubscriptionCard