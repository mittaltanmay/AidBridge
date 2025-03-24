import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { eventsData } from '../../utils/eventsData';
interface frontpageprops{
  enrolledEvents:{ [key:string]:boolean };
}
export default function FrontPage({enrolledEvents}:frontpageprops){
  // Get current date in format 'dd-mm-yyyy'
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Reset time to midnight to include same-day events

  // Function to convert 'dd-mm-yyyy' string to Date object
  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const enrolledEventsList = Object.entries(eventsData)
    .filter(([key]) => enrolledEvents[key]) // Keep only events whose key exists in enrolledEvents
    .map(([key, eventData]) => ({ key, ...eventData })) // Convert object to array with keys
    .filter(event => parseDate(event.date) >= currentDate) // Remove past events
    .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()); // Sort by nearest date

  return (
    <View className="flex flex-col gap-10 items-center py-2 px-2">
      <Text className="font-outfit-bold text-5xl text-green-500">Your Dashboard</Text>
      <ScrollView>
        <View className="flex flex-col border py-2 px-2 gap-5 rounded-lg">
          <Text className="font-outfit-bold text-center text-xl">Enrolled Events</Text>
          {
          enrolledEventsList.length<=0?<Text className='text-center font-outfit-light'>You haven't enrolled for any event enroll for event by clicking on <Text className='font-outfit-bold '>Events</Text> on footer.</Text>:
          enrolledEventsList.map(event => (
            <View key={event.key} className="flex flex-col border px-2 py-2 rounded-lg bg-white shadow-md">
              <Text className="font-outfit-semibold text-xl text-green-600">{event.name}</Text>
              <Text className="font-outfit-semibold text-green-600 text-xl">
                Organized by: <Text className="text-black font-outfit-medium">{event.ngo}</Text>
              </Text>
              <Text className="text-xl text-green-600 font-outfit-semibold">
                Description:
                <Text className="text-black text-xl font-outfit-medium"> {event.description}</Text>
              </Text>
              <Text className="text-green-600 text-lg font-outfit-semibold">
                📅 {event.date} | ⏰ {event.timing}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

