import { View, Text,StyleSheet,Dimensions,KeyboardAvoidingView,ScrollView,Platform,Image,Pressable, TextInput} from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
const { width, height } = Dimensions.get("window");
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../config/supabaseClient';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login(){
    const router=useRouter();
    const navigation = useNavigation();
    const [NGO_id, setUniqueNumber] = useState('');
    const [ngopassword, setpassword] = useState('');

    const handleLogin = async () => {
      try {
        console.log("Raw NGO ID value:", NGO_id);
        const parsedNGOId = parseInt(NGO_id, 10); // Ensure NGO_id is a valid number

        if (isNaN(parsedNGOId)) {
            Alert.alert('Login failed', 'Invalid NGO ID format.');
            return;
        }
          const { data, error } = await supabase
              .from('NGO')
              .select('*')
              .eq('NGO_id', parsedNGOId)
              .eq('ngopassword', ngopassword)
              .eq('is_active', true);

          if (error) {
              console.error('Login error:', error.message);
              Alert.alert('Login failed', error.message);
              return;
          }

          if (data && data.length > 0) {
              // Store the user session locally
              await AsyncStorage.setItem('NGO', JSON.stringify(data[0]));
              Alert.alert('Login successful', 'Welcome back!');
              router.push('../Ngopage/frontpage');
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
                <TextInput className='bg-white border h-[50px] w-[300px] rounded-md' value={NGO_id} onChangeText={text=>setUniqueNumber(text)}></TextInput>
                <Text className='text-lg font-outfit-medium'>Password</Text>
                <TextInput secureTextEntry={true} className='bg-white border h-[50px] w-[300px] rounded-md' value={ngopassword} onChangeText={text=>setpassword(text)}></TextInput>
              </View>
              <Pressable className='bg-black py-3 px-6 rounded-md mb-3' onPress= {handleLogin}>
                <Text className='text-white text-lg font-outfit-bold'>Login</Text>
              </Pressable>
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
const styles=StyleSheet.create({
  shadowOverlay: {
    position: "absolute",
    width: "100%",
    height: height * 0.15, // Covers only 12% of the screen height at top and bottom
    zIndex: 0,
  },
})
