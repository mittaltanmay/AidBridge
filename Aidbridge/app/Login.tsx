import { View, Text, TextInput } from 'react-native'
import React from 'react'

const Login = () => {
  return (
    <View className='flex flex-col justify-center items-center px-10'>
      <View className='circle'></View>
      <Text className='text-5xl font-semibold mt-20 underline'>Login</Text>
      <View className='flex flex-col '>
        <Text>Username</Text>
        <TextInput className="bg-white w-[300px]"></TextInput>
      </View>
    </View>
  )
}

export default Login