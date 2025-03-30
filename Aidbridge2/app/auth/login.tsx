import { View, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, Platform ,Keyboard} from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { StyleSheet,Dimensions,Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../config/supabaseClient';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const router=useRouter();
  const navigation = useNavigation();
  const [unhcrid, setUniqueNumber] = useState('');
  const [password, setpassword] = useState('');

    const handleLogin = async () => {
        try {
            const { data, error } = await supabase
                .from('Refugee')
                .select('*')
                .eq('unhcrid', parseInt(unhcrid))
                .eq('password', password)
                .eq('is_active', true);

            if (error) {
                console.error('Login error:', error.message);
                Alert.alert('Login failed', error.message);
                return;
            }

            if (data && data.length > 0) {
                // Store the user session locally
                await AsyncStorage.setItem('user', JSON.stringify(data[0]));
                Alert.alert('Login successful', 'Welcome back!');
                router.push('../refugeepage/app');
            } else {
                Alert.alert('Login failed', 'Invalid credentials or account not activated.');
            }
        } catch (err) {
            console.error('Unexpected error during login:', err);
            Alert.alert('Error', 'Something went wrong.');
        }
    };
  return (
    <>
      <LinearGradient
        colors={["lightgreen", "transparent"]}
        locations={[0, 0.7]}
        style={[styles.shadowOverlay, { top: 0 }]}
      />
      <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={{flex:1}}>
      <View className='flex flex-col justify-center items-center px-10'>
        <Image className="w-[150px] h-[150px] mt-12 border" source={require('./../../assets/images/logo7.webp')} />
        <Text className='text-5xl font-outfit-bold mt-14'>Login</Text>
        <View className='flex flex-col gap-2 mt-5 p-3 mb-5'>
          <Text className='text-lg font-outfit-medium'>UserName</Text>
          <TextInput className="bg-white w-[300px] rounded-md border" value={unhcrid} onChangeText={text=>setUniqueNumber(text)}></TextInput>
          <Text className='text-lg font-outfit-medium'>Password</Text>
          <TextInput secureTextEntry={true} className="bg-white w-[300px] rounded-md border" value={password} onChangeText={text=>setpassword(text)}></TextInput>
        </View>
        <TouchableOpacity className='bg-black py-3 px-6 rounded-md mb-3'>
          <Text className='text-white text-lg font-outfit-bold' onPress={handleLogin}>Login</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
      <LinearGradient
          colors={["transparent", "lightgreen"]}
          locations={[0.2, 0.7]}
          style={[styles.shadowOverlay, { bottom: 0,position:'fixed'}]}
        />
  </>
  )
}

export default Login
const styles=StyleSheet.create({
  shadowOverlay: {
    position: "absolute",
    width: "100%",
    height: height * 0.15, // Covers only 12% of the screen height at top and bottom
    zIndex: 0,
  },
})
