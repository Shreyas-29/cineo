import { AnimeMovies, Categories, Discover, Header, Languages, Playing, Popular, SciFiMovies, TopRated, TrendingMovie, TrendingTv, Upcoming } from '@/components';
import { StatusBar, View } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';

export default function Home() {
  return (
    <ScrollView className='flex-1 bg-[#121212] h-full flex-col' showsVerticalScrollIndicator={false}>
      <StatusBar animated barStyle='light-content' backgroundColor='transparent' />
      <Header />
      <View className='flex-col flex-1 pb-24'>
        <Playing />
        <Popular />
        <TopRated />
        <Upcoming />
        <Discover />
        <Languages />
        <Categories />
        <TrendingTv />
        <TrendingMovie />
        <SciFiMovies />
        <AnimeMovies />
      </View>
    </ScrollView>
  );
}

