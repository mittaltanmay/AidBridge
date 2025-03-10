import { View, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, Platform} from 'react-native'
import React from 'react'
import { StyleSheet,Dimensions,Image} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");

const Register = () => {
  return (
    <>
      <LinearGradient
        colors={["lightgreen", "transparent"]}
        locations={[0, 0.5]}
        style={[styles.shadowOverlay, { top: 0 }]}
      />
      <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={{flex:1}}>
      <View className='p-10 flex flex-col items-center justify-center gap-5'>
        <Image className="w-[150px] h-[150px] mt-10 border" source={require('./../../assets/images/logo7.webp')} />
        <Text className='text-5xl font-outfit-bold'>Register</Text>
        <View className='flex flex-col gap-10'>
          <TextInput className='bg-white border w-[300px] rounded-md font-outfit-medium' placeholder='Name'></TextInput>
          <TextInput className='bg-white border w-[300px] rounded-md font-outfit-medium' placeholder='Location'></TextInput>
          <TextInput className='bg-white border w-[300px] rounded-md font-outfit-medium' placeholder='Contact'></TextInput>
        </View>
        <TouchableOpacity className="border py-3 px-5 bg-black rounded-lg">
          <Text className='text-white font-outfit-bold text-xl'>Register</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
      <LinearGradient
          colors={["transparent", "lightgreen"]}
          locations={[0.2, 0.7]}
          style={[styles.shadowOverlay, { bottom: 0,position:'fixed'}]}/>
    </>
  )
}

export default Register
const styles=StyleSheet.create({
  shadowOverlay: {
    position: "absolute",
    width: "100%",
    height: height * 0.15, // Covers only 12% of the screen height at top and bottom
    zIndex: 0,
  },
})
