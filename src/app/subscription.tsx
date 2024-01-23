import { plans } from '@/lib/plans'
import { cn } from '@/lib/utils'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Toast } from 'react-native-toast-notifications'

const Subscription = () => {

    const router = useRouter();

    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const selectPlan = plans?.find((item, index) => index === activeIndex);

    const handleSubscribe = () => {
        Toast.show('Subscription will be added soon!');
    };

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <TouchableOpacity
            className={cn(
                'py-2 px-3 rounded-lg border ml-3 w-28 border-zinc-700 flex-col items-start relative',
                activeIndex === index ? 'border-white' : 'border-zinc-700'
            )}
            onPress={() => setActiveIndex(index)}
        >
            {activeIndex === index && (
                <View className='flex-row items-center justify-center bg-blue-500 rounded-full w-6 h-6 absolute -top-1.5 -right-1.5'>
                    <LinearGradient
                        colors={['#0ea5e9', '#1d4ed8']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: '100%',
                            borderRadius: 50,
                        }}
                    />
                    <Octicons name='check' size={16} color='#fff' />
                </View>
            )}
            <Text className='text-sm font-[Medium] text-amber-400'>
                {item.title}
            </Text>
            <Text className='text-lg font-[Semibold] text-white'>
                ₹{item.price}
            </Text>
            <Text className='text-xs font-[Regular] text-zinc-200'>
                {item.duration}
            </Text>
        </TouchableOpacity>
    );


    return (
        <SafeAreaView className='flex-1 !bg-[#121212]'>
            <StatusBar animated style='light' />
            <View className='relative flex-col w-full mt-2'>
                <View className='flex-row items-center justify-between w-full mt-2'>
                    <View className='flex-row items-start'>
                        <TouchableOpacity className='p-4 rounded-full' onPress={() => router.back()}>
                            <Ionicons name='close-outline' size={24} color='#fff' />
                        </TouchableOpacity>
                        <Text className='text-lg font-[Medium] text-white mt-4'>
                            CINEO
                        </Text>
                    </View>
                    <View className='items-center'>
                        <TouchableOpacity className='p-4 rounded-full'>
                            <Ionicons name='language-outline' size={24} color='#fff' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className='absolute top-0 left-0 right-0 w-full bg-transparent h-44 -z-10'>
                    <Image
                        source={require('@/assets/images/background.jpg')}
                        className='w-full h-full'
                    />
                    <LinearGradient
                        colors={['transparent', '#121212']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0,
                            height: 100,
                        }}
                    />
                </View>
                <View className='items-center mt-16'>
                    <Text className='text-lg font-[Medium] text-center text-white'>
                        Subscribe now and start watching
                    </Text>
                </View>
                <View className='flex-row w-full px-4 mt-6'>
                    <View className='mt-8 w-[40%] items-start pr-2'>
                        <View className='flex-col items-start'>
                            <Text className='text-xs text-zinc-100 font-[Regular]'>
                                All content
                            </Text>
                            <Text className='text-xs text-zinc-500 font-[Regular]'>
                                Movies, Live sports, TV shows, and more
                            </Text>
                        </View>
                        <View className='flex-col items-start mt-8'>
                            <Text className='text-xs text-zinc-100 font-[Regular]'>
                                Watch on TV or Mobile
                            </Text>
                        </View>
                        <View className='flex-col items-start mt-8'>
                            <Text className='text-xs text-zinc-100 font-[Regular]'>
                                Ads free movies and shows
                            </Text>
                        </View>
                        <View className='flex-col items-start mt-8'>
                            <Text className='text-xs text-zinc-100 font-[Regular]'>
                                No of devices you can watch on
                            </Text>
                        </View>
                        <View className='flex-col items-start mt-11'>
                            <Text className='text-xs text-zinc-100 font-[Regular]'>
                                Max resolution
                            </Text>
                        </View>
                        <View className='flex-col items-start mt-11'>
                            <Text className='text-xs text-zinc-100 font-[Regular]'>
                                Max audio quality
                            </Text>
                            <Text className='text-xs text-zinc-500 font-[Regular]'>
                                Atoms available on select titles
                            </Text>
                        </View>
                    </View>
                    <View className='w-[60%] items-start flex-1'>
                        <View className='flex-row items-center w-full gap-1'>
                            <View className='relative flex-col items-center p-2 -mt-2'>
                                {selectPlan?.title === 'Mobile' && (
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.2)', 'transparent']}
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            height: '100%',
                                            borderRadius: 4,
                                        }}
                                    />
                                )}
                                <Text className={cn(
                                    'text-sm font-[Medium]',
                                    selectPlan?.title === 'Mobile' ? 'text-amber-400' : 'text-zinc-400'
                                )}>
                                    Mobile
                                </Text>
                                <View className='flex-col items-center mt-4'>
                                    <Ionicons name='checkmark-outline' size={24} color={selectPlan?.title === 'Mobile' ? '#fff' : '#a1a1aa'} />
                                    <Ionicons name='close-outline' size={24} color={selectPlan?.title === 'Mobile' ? '#fff' : '#a1a1aa'} style={{ marginTop: 40 }} />
                                    <Ionicons name='close-outline' size={24} color={selectPlan?.title === 'Mobile' ? '#fff' : '#a1a1aa'} style={{ marginTop: 40 }} />
                                    <Text className='text-sm mt-10 font-[Regular] text-zinc-400'>
                                        1
                                    </Text>
                                    <Text className={cn(
                                        'text-xs flex-wrap mt-10 font-[Regular] text-white',
                                        selectPlan?.title === 'Mobile' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        HD
                                    </Text>
                                    <Text className={cn(
                                        'text-xs mt-1 text-white font-[Regular]',
                                        selectPlan?.title === 'Mobile' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        720p
                                    </Text>
                                    <Text className={cn(
                                        'text-xs mt-10 text-white font-[Regular]',
                                        selectPlan?.title === 'Mobile' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        Stereo
                                    </Text>
                                    <Text className={cn(
                                        'text-xs mt-1 text-white font-[Regular]',
                                        selectPlan?.title === 'Mobile' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        {" "}
                                    </Text>
                                </View>
                            </View>
                            <View className='relative flex-col items-center p-2'>
                                {selectPlan?.title === 'Super' && (
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.2)', 'transparent']}
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            height: '100%',
                                            borderRadius: 4,
                                        }}
                                    />
                                )}
                                <Text className={cn(
                                    'text-sm font-[Medium]',
                                    selectPlan?.title === 'Super' ? 'text-amber-400' : 'text-zinc-400'
                                )}>
                                    Super
                                </Text>
                                <View className='flex-col items-center mt-4'>
                                    <Ionicons name='checkmark-outline' size={24} color={selectPlan?.title === 'Super' ? '#fff' : '#a1a1aa'} />
                                    <Ionicons name='checkmark-outline' size={24} color={selectPlan?.title === 'Super' ? '#fff' : '#a1a1aa'} style={{ marginTop: 40 }} />
                                    <Ionicons name='close-outline' size={24} color={selectPlan?.title === 'Super' ? '#fff' : '#a1a1aa'} style={{ marginTop: 40 }} />
                                    <Text className={cn(
                                        'text-xs mt-10 text-white font-[Regular]',
                                        selectPlan?.title === 'Super' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        2
                                    </Text>
                                    <Text className={cn(
                                        'text-xs mt-10 text-white font-[Regular]',
                                        selectPlan?.title === 'Super' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        Full HD
                                    </Text>
                                    <Text className={cn(
                                        'text-xs mt-1 font-[Regular]',
                                        selectPlan?.title === 'Super' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        1080p
                                    </Text>
                                    <Text className={cn(
                                        'text-xs mt-10 text-zinc-400 font-[Regular]',
                                        selectPlan?.title === 'Super' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        Dolby
                                    </Text>
                                    <Text className={cn(
                                        'text-xs mt-1 font-[Regular]',
                                        selectPlan?.title === 'Super' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        Atmos
                                    </Text>
                                </View>
                            </View>
                            <View className='relative flex-col items-center p-2'>
                                {selectPlan?.title === 'Premium' && (
                                    <LinearGradient
                                        colors={['rgba(255,255,255,0.2)', 'transparent']}
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            height: '100%',
                                            borderRadius: 4,
                                        }}
                                    />
                                )}
                                <Text className={cn(
                                    'text-sm font-[Medium]',
                                    selectPlan?.title === 'Premium' ? 'text-amber-400' : 'text-zinc-400'
                                )}>
                                    Premium
                                </Text>
                                <View className='flex-col items-center mt-4'>
                                    <Ionicons name='checkmark-outline' size={24} color={selectPlan?.title === 'Premium' ? '#fff' : '#a1a1aa'} />
                                    <Ionicons name='checkmark-outline' size={24} color={selectPlan?.title === 'Premium' ? '#fff' : '#a1a1aa'} style={{ marginTop: 40 }} />
                                    <Ionicons name='checkmark-outline' size={24} color={selectPlan?.title === 'Premium' ? '#fff' : '#a1a1aa'} style={{ marginTop: 40 }} />
                                    <Text className={cn(
                                        'text-xs mt-10 text-zinc-400 font-[Regular]',
                                        selectPlan?.title === 'Premium' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        4
                                    </Text>
                                    <Text className={cn(
                                        'text-xs mt-10 text-zinc-400 font-[Regular]',
                                        selectPlan?.title === 'Premium' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        4K
                                    </Text>
                                    <Text className={cn(
                                        'text-xs mt-1 font-[Regular]',
                                        selectPlan?.title === 'Premium' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        2160p
                                    </Text>
                                    <Text className={cn(
                                        'text-xs mt-10 text-zinc-400 font-[Regular]',
                                        selectPlan?.title === 'Premium' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        Dolby
                                    </Text>
                                    <Text className={cn(
                                        'text-xs mt-1 font-[Regular]',
                                        selectPlan?.title === 'Premium' ? 'text-white' : 'text-zinc-400'
                                    )}>
                                        Atmos
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='items-start w-full mt-8'>
                    <FlatList
                        data={plans}
                        horizontal={true}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingRight: 16, paddingTop: 8 }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View className='flex-row items-center w-full px-4 mt-4'>
                    <TouchableOpacity className='flex-row items-center justify-center w-full h-12' onPress={handleSubscribe}>
                        <LinearGradient
                            colors={['#0ea5e9', '#1d4ed8']}
                            className='absolute top-0 left-0 right-0 flex-row items-center justify-center w-full h-12 py-3 rounded-lg'
                        />
                        <Text className='text-center text-[16px] font-[Medium] text-white'>
                            Continue
                        </Text>
                        <Ionicons name='chevron-forward-outline' size={20} color='#fff' />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Subscription