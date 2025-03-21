import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { eventsData } from '../../utils/eventsData'
const Frontpage = () => {
    return (
    <View className='flex flex-col gap-10 items-center py-2 px-2'>
      <Text className='font-outfit-bold text-5xl text-green-500'>Your Dashboard</Text>
      <ScrollView>
        <View className='flex flex-col border py-2 px-2 gap-5 rounded-lg'>
          <Text className='font-outfit-bold text-center text-xl'>Events Registered</Text>
          {eventsData.map((event, index) => (
            <View key={index} className='flex flex-col border px-2 py-2 rounded-lg bg-white shadow-md'>
                <Text className='font-outfit-semibold text-xl text-green-600'>{event.name}</Text>
                <Text className='font-outfit-semibold text-green-600 text-xl'>Organized by: <Text className='text-black'>{event.ngo}</Text></Text>
                <Text className='text-xl text-green-600 font-outfit-semibold'>Description:
                <Text className='text-black text-xl'> {event.description}</Text>
                </Text>
                <Text className='text-green-600 text-lg'>📅 {event.date} | ⏰ {event.timing}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default Frontpage