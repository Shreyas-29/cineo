import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from 'react-native-toast-notifications';
import Welcome from '.';
import Login from './login';
import Register from './register';


const Stack = createStackNavigator();

export default function AuthLayout() {
    return (
        <>
            <ToastProvider
                animationType='zoom-in'
                offsetBottom={16}
                placement='bottom'
                swipeEnabled
                style={{
                    backgroundColor: '#221f1f',
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                }}
                textStyle={{
                    fontFamily: 'Medium',
                    color: '#fff',
                    textAlign: 'center',
                }}
            >
                <Stack.Navigator>
                    <Stack.Screen name="index" component={Welcome} options={{ headerShown: false }} />
                    <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
                </Stack.Navigator>
            </ToastProvider>
        </>
    );
}
