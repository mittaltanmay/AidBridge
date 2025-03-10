import { View, Text, TextInput } from 'react-native'
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
      <View className='p-10 flex flex-col items-center justify-center gap-5'>
        <Image className="w-[150px] h-[150px] mt-10 border" source={require('./../../assets/images/logo7.webp')} />
        <Text className='text-4xl font-bold'>Register</Text>
        <View className='flex flex-col gap-2'>
          <TextInput className='bg-white border w-[300px] rounded-md' placeholder='Name'></TextInput>
          <TextInput className='bg-white border w-[300px] rounded-md' placeholder=''></TextInput>
          <Text className='text-xl mt-5'>Contact</Text>
          <TextInput className='bg-white border w-[300px] rounded-md'></TextInput>
        </View>
      </View>
      <LinearGradient
          colors={["transparent", "lightgreen"]}
          locations={[0.5, 1]}
          style={[styles.shadowOverlay, { bottom: 0 }]}/>
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
