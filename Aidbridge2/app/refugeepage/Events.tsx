import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import eventsData from '@/utils/eventsData';

interface EventsProps {
  enrolledEvents: { [key: string]: boolean };
  setEnrolledEvents: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  enrollEvent: (eventKey: string) => void;
}
export default function Events({ enrolledEvents, enrollEvent }: EventsProps) {  
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const parseDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Convert object to array and sort by date
  const upcomingEvents = Object.entries(eventsData)
    .map(([key, eventData]) => ({ key, ...eventData })) // Convert to array with keys
    .filter(event => parseDate(event.date) >= currentDate)
    .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());
    
  return (
    <View className="flex flex-col gap-10 items-center py-2 px-2">
      <ScrollView>
        <View className="flex flex-col border py-2 px-2 gap-5 rounded-lg">
          <Text className="font-outfit-bold text-center text-xl">Events Near You</Text>
          {upcomingEvents.map(event => {
            const isEnrolled = enrolledEvents[event.key];

            return (
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

                {/* Enroll button */}
                <Pressable
                  style={{
                    backgroundColor: isEnrolled ? '#A0A0A0' : '#86EFAC', // Gray if enrolled, Green otherwise
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    borderWidth: 1,
                    alignItems: 'center',
                    marginTop: 10,
                  }}
                  onPress={() => enrollEvent(event.key)}
                  disabled={isEnrolled} // Disable button if enrolled
                >
                  <Text className="font-outfit-bold text-2xl text-center">
                    {isEnrolled ? 'Enrolled' : 'Enroll Now'}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
