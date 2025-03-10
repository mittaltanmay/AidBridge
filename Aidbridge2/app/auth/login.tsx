import { View, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, Platform ,Keyboard} from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
import { StyleSheet,Dimensions,Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");

const Login = () => {
  const router=useRouter();
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
        <View className='flex flex-col gap-2 mt-5 p-3 mb-8'>
          <Text className='text-lg font-outfit-medium'>Username</Text>
          <TextInput className="bg-white w-[300px] rounded-md border"></TextInput>
          <Text className='text-lg font-outfit-medium'>Password</Text>
          <TextInput className="bg-white w-[300px] rounded-md border"></TextInput>
        </View>
        <TouchableOpacity className='bg-black py-3 px-6 rounded-md mb-2'>
          <Text className='text-white text-lg font-outfit-medium'>Login</Text>
        </TouchableOpacity>
        <View className='flex flex-row items-center gap-2'>
          <Text className='text-lg'>Don't Have account?
            <TouchableOpacity onPress={()=>router.push('/auth/register')}>
              <Text className='text-blue-400 -mb-2 text-lg'> Register</Text>
            </TouchableOpacity>
          </Text>
        </View>
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
