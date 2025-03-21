import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { eventsData } from '../../utils/eventsData'
const Frontpage = () => {
   // Get current date in format 'dd-mm-yyyy'
   const currentDate = new Date();
   currentDate.setHours(0, 0, 0, 0); // Reset time to midnight to make sure events on the same day are also displayed
   
   // Function to convert 'dd-mm-yyyy' string to Date object
   const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };
  
 
   // Filter out past events & sort by closest date
   const upcomingEvents = eventsData
    .filter(event => parseDate(event.date) >= currentDate) // Remove past events
    .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()); // Sort by nearest date
    return (
    <View className='flex flex-col gap-10 items-center py-2 px-2'>
      <Text className='font-outfit-bold text-5xl text-green-500'>Your Dashboard</Text>
      <ScrollView>
        <View className='flex flex-col border py-2 px-2 gap-5 rounded-lg'>
          <Text className='font-outfit-bold text-center text-xl'>Upcoming Events</Text>
          {upcomingEvents.map((event, index) => (
            <View key={index} className='flex flex-col border px-2 py-2 rounded-lg bg-white shadow-md'>
                <Text className='font-outfit-semibold text-xl text-green-600'>{event.name}</Text>
                <Text className='font-outfit-semibold text-green-600 text-xl'>Organized by: <Text className='text-black font-outfit-medium'>{event.ngo}</Text></Text>
                <Text className='text-xl text-green-600 font-outfit-semibold'>Description:
                <Text className='text-black text-xl font-outfit-medium'> {event.description}</Text>
                </Text>
                <Text className='text-green-600 text-lg font-outfit-semibold'>📅 {event.date} | ⏰ {event.timing}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

export default Frontpage