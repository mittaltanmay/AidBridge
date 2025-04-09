import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import supabase from '../../config/supabaseClient.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EventsProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  enrolledEvents: { [key: string]: boolean };
  // setEnrolledEvents: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  enrollEvent: (eventId: string) => void;
}

export interface Event {
  id: string;
  event_name: string;
  Description: string;
  date: string;
  time: string;
  NGO: {
    NGO_name: string;
  };
  key: string;
}

export default function Events({events, enrolledEvents, enrollEvent, setEvents }: EventsProps) {
  const [loading, setLoading] = useState(true);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Events')
        .select('id, event_name, Description, date, time, NGO_id, NGO(NGO_name)') // Joining NGOs table to get NGO name
        .order('date', { ascending: true }); // Sorting by date

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        const formattedEvents = data.map(event => ({
          key: event.id,
          id: event.id,
          event_name: event.event_name,
          Description: event.Description,
          date: event.date,
          time: event.time,
          NGO: {
            NGO_name: event.NGO.NGO_name,
          },
        }));

        console.log('Fetched Events:', formattedEvents);

        setEvents(formattedEvents);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <View className="flex flex-col gap-10 items-center py-2 px-1">
      <ScrollView>
        <View className="flex flex-col border py-2 px-2 w-[380] gap-5 rounded-lg">
          <Text className="font-outfit-bold text-center text-xl">Listed Events</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" />
          ) : (
            events.map(event => {
              const isEnrolled = enrolledEvents[event.id];

              return (
                <View key={event.key} className="flex flex-col border  px-2 py-2 rounded-lg bg-white">
                  <Text className="font-outfit-semibold text-xl text-green-600">{event.event_name}</Text>
                  <Text className="font-outfit-semibold text-green-600 text-xl">
                    Organized by: <Text className="text-black font-outfit-medium">{event.NGO.NGO_name}</Text>
                  </Text>
                  <Text className="text-xl text-green-600 font-outfit-semibold">
                    Description: <Text className="text-black text-xl font-outfit-medium">{event.Description}</Text>
                  </Text>
                  <Text className="text-green-600 text-lg font-outfit-semibold">
                    📅 {event.date} | ⏰ {event.time}
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
                    onPress={() => enrollEvent(event.id)}
                    disabled={isEnrolled} // Disable button if enrolled
                  >
                    <Text className="font-outfit-bold text-2xl text-center">
                      {isEnrolled ? 'Enrolled' : 'Enroll Now'}
                    </Text>
                  </Pressable>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
}
