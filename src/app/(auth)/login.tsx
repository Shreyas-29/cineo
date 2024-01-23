import { useSignIn } from '@clerk/clerk-expo'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Toast } from 'react-native-toast-notifications'

const Login = () => {

    const { signIn, setActive, isLoaded } = useSignIn();

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        if (!isLoaded) return;

        if (!email || !password) {
            Toast.show("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        try {
            const completeSignIn = await signIn.create({
                identifier: email,
                password,
            });

            await setActive({ session: completeSignIn.createdSessionId })
                .then(() => {
                    Toast.show("Signed in successfully!");
                    router.push("/(tabs)");

                })
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));

            // Customizing Toast messages based on status code
            if (err?.status === 400 && err?.errors?.[0]?.code === 'session_exists') {
                Toast.show("You're currently signed into another account. Please sign out first.");
            } else if (err?.status === 400 && err?.errors?.[0]?.code === 'form_param_unknown') {
                Toast.show("Unknown form parameter error. Please check your input.");
            } else if (err?.status === 400 && err?.errors?.[0]?.code === 'form_password_pwned') {
                Toast.show("Password has been found in an online data breach. Please use a different password.");
            } else if (err?.status === 422 && err?.errors?.[0]?.code === 'form_password_incorrect') {
                Toast.show("Incorrect password. Please try again.");
            } else if (err?.status === 422 && err?.errors?.[0]?.code === 'form_identifier_not_found') {
                Toast.show("Couldn't find your account. Please check your credentials.")
            } else {
                Toast.show("Error signing in");
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <SafeAreaView className='flex-1 bg-[#121212]'>
            <View className='flex-col items-start justify-center flex-1 px-5 py-20'>
                <View className='flex-col items-start w-full'>
                    <Text className='text-white text-2xl font-[Semibold]'>
                        Sign In
                    </Text>
                    <Text className='text-slate-200 mt-2 text-sm font-[Regular]'>
                        Sign in to your account
                    </Text>

                    <View className='flex-col items-start w-full mt-8'>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            placeholder='Email address'
                            placeholderTextColor='rgb(209, 213, 219)'
                            className='w-full px-4 py-3 bg-blue-20 rounded-lg text-gray-200 to-gray-300 bg-white/20 font-[Regular] text-sm'
                        />
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            textContentType='password'
                            placeholder='Password'
                            placeholderTextColor='rgb(209, 213, 219)'
                            className='w-full px-4 py-3 bg-blue-20 rounded-lg text-gray-200 to-gray-300 bg-white/20 font-[Regular] text-sm mt-5'
                        />
                        <TouchableOpacity onPress={handleSignIn} className='relative w-full'>
                            <LinearGradient
                                colors={['#0ea5e9', '#1d4ed8']}
                                // start={[0, 0]}
                                // end={[0.6, 2]}
                                className='relative flex-row items-center justify-center w-full h-12 py-2 mt-8 rounded-lg'
                            >
                                {isLoading ? (
                                    <ActivityIndicator color='#fff' size={20} />
                                ) : (
                                    <Text className='text-base text-white font-[Medium]'>
                                        Sign In
                                    </Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                        <View className='flex-row items-center justify-center w-full mt-5'>
                            <Text className='text-sm text-slate-300'>
                                Don't have an account?{" "}
                            </Text>
                            <Link href={"/register"} asChild>
                                <TouchableOpacity>
                                    <Text className='text-white text-sm font-[Medium]'>
                                        Sign Up Now.
                                    </Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login