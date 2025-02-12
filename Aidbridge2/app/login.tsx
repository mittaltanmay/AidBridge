import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Login = () => {
  return (
    <View className='flex flex-col justify-center items-center px-10'>
    <View className='circle'></View>
    <Text className='text-5xl font-semibold mt-20'>Login</Text>
    <View className='flex flex-col gap-2 mt-5 p-3 mb-10'>
      <Text className='text-lg'>Username</Text>
      <TextInput className="bg-white w-[300px] rounded-md border"></TextInput>
      <Text className='text-lg'>Password</Text>
      <TextInput className="bg-white w-[300px] rounded-md border"></TextInput>
    </View>
    <TouchableOpacity className='bg-black py-3 px-6 rounded-md mb-2'>
      <Text className='text-white text-lg font-medium'>Login</Text>
    </TouchableOpacity>
    <View className='flex flex-row items-center gap-2'>
    <Text className='text-xl'>Don't Have account?</Text>
    <Link href="../register" className='text-blue-500 text-xl'>Regsiter</Link>
    </View>
  </View>
  )
}

export default Login