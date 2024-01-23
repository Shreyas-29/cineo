import { HeartActive, Heart as HeartIcon, HomeActive, Home as HomeIcon, SearchActive, Search as SearchIcon, UserActive, User as UserIcon } from '@/components';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Text, View } from 'react-native';
import Home from '.';
import Favorite from './favorite';
import Profile from './profile';
import Search from './search';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopColor: '#404040',
          height: 50,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          // backgroundColor: '#121212',
        },
        tabBarBackground: () => (
          <BlurView tint="dark" blurReductionFactor={40} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)' }} />
        ),
        tabBarLabel: ({ focused }) => {
          let color;

          switch (route.name) {
            case 'Home':
              color = focused ? '#F5F5F4' : '#71717A';
            case 'Search':
              color = focused ? '#F5F5F4' : '#71717A';
            case 'Favorite':
              color = focused ? '#F5F5F4' : '#71717A';
            case 'Profile':
              color = focused ? '#F5F5F4' : '#71717A';
            default:
              color = focused ? '#F5F5F4' : '#71717A';
          }

          return (
            <Text
              className='to-stone-600'
              style={{
                color: focused ? '#F5F5F4' : '#71717A',
                fontSize: 11,
                marginBottom: 2,
                fontFamily: 'Regular'
              }}
            >
              {route.name}
            </Text>
          )
        },
        tabBarIcon: ({ focused }) => {
          return (
            <View className='mt-1 ml-1'>
              {route.name === 'Home' ? (
                focused ? <HomeActive /> : <HomeIcon />
              ) : route.name === 'Search' ? (
                focused ? <SearchActive /> : <SearchIcon />
              ) : route.name === 'Favorite' ? (
                focused ? <HeartActive /> : <HeartIcon />
              ) : route.name === 'Profile' ? (
                focused ? <UserActive /> : <UserIcon />
              ) : (
                <HomeActive />
              )}
            </View>
          )
        },
        tabBarIconStyle: {
          marginTop: 7
        }
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={Home}
      />
      <Tab.Screen
        name="Search"
        options={{
          headerShown: false,
        }}
        component={Search}
      />
      <Tab.Screen
        name="Favorite"
        options={{
          headerShown: false,
        }}
        component={Favorite}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}
