import { View, Text, TextInput } from 'react-native'
import React from 'react'

const Register = () => {
  return (
    <>
    <View className="circle"></View>
    <View className='p-10 flex flex-col items-center justify-center gap-5'>
      <Text className='text-4xl font-bold'>Register</Text>
      <View className='flex flex-col gap-2'>
        <Text className='text-xl'>Name</Text>
        <TextInput className='bg-white border w-[300px] rounded-md'></TextInput>
        <Text className='text-xl mt-5'>Country</Text>
        <TextInput className='bg-white border w-[300px] rounded-md'></TextInput>
        <Text className='text-xl mt-5'>Contact</Text>
        <TextInput className='bg-white border w-[300px] rounded-md'></TextInput>
      </View>
    </View>
    </>
  )
}

export default Register