import { useSignUp } from '@clerk/clerk-expo'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Toast } from 'react-native-toast-notifications'

const Register = () => {

    const { signUp, setActive, isLoaded } = useSignUp();

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pending, setPending] = useState(false);
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handlSignUp = async () => {
        if (!isLoaded) return;

        if (!name || !email || !password) {
            Toast.show("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        try {
            await signUp.create({
                firstName: name,
                emailAddress: email,
                password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
                .then(() => {
                    setPending(true);
                })

        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));

            // Customizing Toast messages based on status code
            if (err?.status === 400 && err?.errors?.[0]?.code === 'session_exists') {
                Toast.show("You're currently signed into another account. Please sign out first.");
            } else if (err?.status === 400 && err?.errors?.[0]?.code === 'form_param_unknown') {
                Toast.show("Unknown form parameter error. Please check your input.");
            } else if (err?.status === 422 && err?.errors?.[0]?.code === 'form_password_pwned') {
                Toast.show("Your password is too weak. Please use a different password.");
            } else if (err?.status === 422 && err?.errors?.[0]?.code === 'form_password_incorrect') {
                Toast.show("Incorrect password. Please try again.");
            } else if (err?.status === 422 && err?.errors?.[0]?.code === 'form_param_format_invalid') {
                Toast.show("Invalid email address. Please check your email address.")
            } else if (err?.status === 422 && err?.errors?.[0]?.code === 'form_password_length_too_short') {
                Toast.show("Password is too short. Please use at least 8 characters.")
            } else if (err?.status === 422 && err?.errors?.[0]?.code === 'form_identifier_not_found') {
                Toast.show("Couldn't find your account. Please check your credentials.")
            } else {
                Toast.show("Error signing up");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async () => {
        if (!isLoaded) return;

        setIsLoading(true);

        try {
            const completeSignup = await signUp.attemptEmailAddressVerification({ code });

            await setActive({ session: completeSignup.createdSessionId })
                .then(() => {
                    Toast.show("Signed in successfully!");
                    router.push("/(tabs)");
                })
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            Toast.show("Error verifying. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <SafeAreaView className='flex-1 bg-[#121212]'>
            <View className='flex-col items-start justify-center flex-1 px-5 py-20'>
                <View className='flex-col items-start w-full'>
                    <Text className='text-white text-2xl font-[Semibold]'>
                        Sign Up
                    </Text>
                    <Text className='text-slate-200 mt-2 text-sm font-[Regular]'>
                        Create your account
                    </Text>

                    {pending && (
                        <View className='flex-col items-start w-full mt-8'>
                            <TextInput
                                value={code}
                                onChangeText={setCode}
                                textContentType='telephoneNumber'
                                keyboardType='number-pad'
                                placeholder='Verification code'
                                placeholderTextColor='rgb(209, 213, 219)'
                                className='w-full px-4 py-3 bg-blue-20 rounded-lg text-gray-200 to-gray-300 bg-white/20 font-[Regular] text-sm'
                            />
                            <TouchableOpacity className='w-full' onPress={handleVerify}>
                                <LinearGradient
                                    colors={['#0ea5e9', '#1d4ed8']}
                                    className='flex-row items-center justify-center w-full h-12 py-3 mt-8 rounded-lg'
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color='#fff' size={24} />
                                    ) : (
                                        <Text className='text-base text-white font-[Medium]'>
                                            Verify Email
                                        </Text>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    )}
                    {!pending && (
                        <View className='flex-col items-start w-full mt-8'>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                textContentType='nickname'
                                placeholder='Name'
                                placeholderTextColor='rgb(209, 213, 219)'
                                className='w-full px-4 py-3 bg-blue-20 rounded-lg text-gray-200 to-gray-300 bg-white/20 font-[Regular] text-sm'
                            />
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize='none'
                                textContentType='emailAddress'
                                keyboardType='email-address'
                                placeholder='Email address'
                                placeholderTextColor='rgb(209, 213, 219)'
                                className='w-full px-4 py-3 bg-blue-20 rounded-lg text-gray-200 to-gray-300 bg-white/20 font-[Regular] text-sm mt-5'
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
                            <TouchableOpacity className='w-full' onPress={handlSignUp}>
                                <LinearGradient
                                    colors={['#0ea5e9', '#1d4ed8']}
                                    // start={[0, 0]}
                                    // end={[0.6, 2]}
                                    className='flex-row items-center justify-center w-full h-12 py-3 mt-8 rounded-lg'
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color='#fff' size={24} />
                                    ) : (
                                        <Text className='text-base text-white font-[Medium]'>
                                            Sign Up
                                        </Text>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                            <View className='flex-row items-center justify-center w-full mt-5'>
                                <Text className='text-sm text-slate-300'>
                                    Already have an account?{" "}
                                </Text>
                                <Link href={"/login"} asChild>
                                    <TouchableOpacity>
                                        <Text className='text-white text-sm font-[Medium]'>
                                            Sign In.
                                        </Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Register