import { View, Text, ScrollView } from 'react-native';
import React from 'react';
// import { eventsData } from '../../utils/eventsData';
import { Event }  from './Events';

// interface Event {
//   id: string;
//   name: string;
//   description: string;
//   date: string;
//   time: string;
//   ngo_name: string;
//   key: string;
// }

interface frontpageprops{
  events: Event[];
  enrolledEvents:{ [key:string]:boolean };
}
export default function FrontPage({events, enrolledEvents}:frontpageprops){

  console.log('📌 Events in FrontPage:', events);
  console.log('📌 Enrolled Events in FrontPage:', enrolledEvents);

  // Get current date in format 'dd-mm-yyyy'
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Reset time to midnight to include same-day events

  // Function to convert 'dd-mm-yyyy' string to Date object
  const parseDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split('-').map(Number);
    console.log('Parsing Date:', dateStr, '->', new Date(year, month - 1, day));
    return new Date(year, month - 1, day);
  };

  const enrolledEventsList = events
  .filter(event => enrolledEvents[String(event.id)]) // Keep only events where the user enrolled
  // .filter(event => parseDate(event.date) >= currentDate) // Remove past events
  .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()); // Sort by nearest date

  console.log('🎯 Filtered Enrolled Events:', enrolledEventsList);

  return (
    <View className="flex flex-col gap-10 items-center py-2 px-2">
      <Text className="font-outfit-bold text-5xl text-green-500">Your Dashboard</Text>
      <ScrollView>
        <View className="flex flex-col border py-2 px-2 gap-5 rounded-lg">
          <Text className="font-outfit-bold text-center text-xl">Enrolled Events</Text>
          {
          enrolledEventsList.length<=0?<Text className='text-center font-outfit-light'>You haven't enrolled for any event enroll for event by clicking on <Text className='font-outfit-bold '>Events</Text> on footer.</Text>:
          enrolledEventsList.map(event => (
            <View key={event.id} className="flex flex-col border px-2 py-2 rounded-lg bg-white shadow-md">
              <Text className="font-outfit-semibold text-xl text-green-600">{event.name}</Text>
              <Text className="font-outfit-semibold text-green-600 text-xl">
                Organized by: <Text className="text-black font-outfit-medium">{event.ngo_name}</Text>
              </Text>
              <Text className="text-xl text-green-600 font-outfit-semibold">
                Description:
                <Text className="text-black text-xl font-outfit-medium"> {event.description}</Text>
              </Text>
              <Text className="text-green-600 text-lg font-outfit-semibold">
                📅 {event.date} | ⏰ {event.time}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

