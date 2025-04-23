import { View, Text, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Event }  from './Events';
import { faStar } from '@fortawesome/free-solid-svg-icons'; 
import supabase from "../../config/supabaseClient";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Picker } from '@react-native-picker/picker';
interface frontpageprops{
  events: Event[];
  enrolledEvents:{ [key:string]:boolean };
}
export default function FrontPage({events, enrolledEvents}:frontpageprops){

  // console.log('📌 Events in FrontPage:', events);
  // console.log('📌 Enrolled Events in FrontPage:', enrolledEvents);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); 

  const formatDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const formatTime = (timeStr: string): string => {
    const [hour, minute] = timeStr.split(':');
    return `${hour}:${minute}`;
  };

  const parseDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split('-').map(Number);
    console.log('Parsing Date:', dateStr, '->', new Date(year, month - 1, day));
    return new Date(year, month - 1, day);
  };

  const enrolledEventsList = events
  .filter(event => enrolledEvents[String(event.id)])
  .filter(event => parseDate(event.date) >= currentDate)
  .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

  const pastEventsList = events
    .filter(event => enrolledEvents[String(event.id)])
    .filter(event => parseDate(event.date) < currentDate)
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()); 

  // console.log('🎯 Upcoming Enrolled Events:', enrolledEventsList);
  // console.log('🎯 Past Events to Rate:', pastEventsList); 
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const addRatingToEvent = async (eventId, newRating) => {
    const { data: eventData, error: fetchError } = await supabase
      .from('Events')
      .select('Ratings, NGO_id')
      .eq('id', eventId)
      .single();
  
    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return;
    }
  
    const updatedArray = [...(eventData.Ratings || []), newRating];
    const avg = updatedArray.reduce((a, b) => a + b, 0) / updatedArray.length;
  
    const { error: updateError } = await supabase
      .from('Events')
      .update({ Ratings: updatedArray, Avg_rating: avg })
      .eq('id', eventId);
  
    if (updateError) console.error("Update error:", updateError);

    const { data: ngoEvents, error: fetchNgoEventsError } = await supabase
    .from('Events')
    .select('Avg_rating')
    .eq('NGO_id', eventData.NGO_id);

  if (fetchNgoEventsError) {
    console.error("Error fetching NGO's events:", fetchNgoEventsError);
    return;
  }

  const ngoAvg = ngoEvents
    .map(e => e.Avg_rating)
    .filter(r => typeof r === 'number')
    .reduce((a, b) => a + b, 0) / ngoEvents.length;

  // 4. Update NGO table
  const { error: updateNgoError } = await supabase
    .from('NGO')
    .update({ Avg_rating: ngoAvg })
    .eq('NGO_id', eventData.NGO_id);

  if (updateNgoError) {
    console.error("Error updating NGO avg rating:", updateNgoError);
  }

  };
  
  function handlesumbit(id)
  {
    addRatingToEvent(id, ratings[id]);
    setIsSubmitted(true);
    console.log("ratings submitted",ratings[id]);
  }
  return (
    <View className="flex flex-col gap-10 items-center py-2 px-2">
      <Text className="font-outfit-bold text-5xl text-green-500">Your Dashboard</Text>
      <ScrollView>
        <View className="flex flex-col border py-2 px-2 gap-5 rounded-lg w-[370]">
          <Text className="font-outfit-bold text-center text-xl">Upcoming Events</Text>
          {
          enrolledEventsList.length<=0?<Text className='text-center font-outfit-light'>You haven't enrolled for any event enroll for event by clicking on <Text className='font-outfit-bold '>Events</Text> on footer.</Text>:
          enrolledEventsList.map(event => (
            <View key={event.id} className="flex flex-col border px-1 py-2 rounded-lg bg-white shadow-md">
              <Text className="font-outfit-bold text-xl text-green-600">{event.event_name}</Text>
              <Text className="font-outfit-bold text-green-600 text-xl">
                Organized by: <Text className="text-black font-outfit-medium">{event.NGO.NGO_name}</Text>
              </Text>
              <Text className="text-xl text-green-600 font-outfit-semibold">
                Description:
                <Text className="text-black text-xl font-outfit-medium"> {event.Description}</Text>
              </Text>
              <Text className="text-green-600 text-lg font-outfit-bold">
                📅 {formatDate(event.date)} | ⏰ {formatTime(event.time)}
              </Text>
            </View>
          ))}
        </View>
        {
          pastEventsList.length > 0 && (
            <View className="flex flex-col border py-2 px-2 gap-5 rounded-lg w-[370] mt-10">
              <Text className="font-outfit-bold text-center text-xl">Rate Events You Attended</Text>
              {
                pastEventsList.map(event => (
                  <View key={event.id} className="flex flex-col border px-1 py-2 rounded-lg bg-white shadow-md">
                    <Text className="font-outfit-bold text-xl text-green-600">{event.event_name}</Text>
                    <Text className="font-outfit-bold text-green-600 text-xl">
                      Organized by: <Text className="text-black font-outfit-medium">{event.NGO.NGO_name}</Text>
                    </Text>
                    <View className='flex flex-row items-center gap-2'>
                      <View className='flex flex-row items-start -mt-1'>
                          <View className='flex items-center flex-row'>
                            <FontAwesomeIcon icon={faStar} color='green' size={20}/>
                            <Text className='text-2xl font-outfit-bold mt-1 text-green-600'>Ratings:</Text>
                          </View>
                          <View className='border ml-2 rounded-md mt-1'>
                              <Picker
                                selectedValue={ratings[event.id] ?? 0}
                                onValueChange={(value) => setRatings(prev => ({ ...prev, [event.id]: value }))}
                                style={{ height: 49, width: 100}}
                                mode="dropdown">
                                {[0, 1, 2, 3, 4, 5].map(rating => (
                                  <Picker.Item key={rating} label={rating.toString()} value={rating}/>
                                ))}
                            </Picker>
                          </View>
                      </View>
                      <Pressable className='px-8 py-3  bg-green-500 rounded-md' onPress={()=>{handlesumbit(event.id)}}>
                        <Text className='text-xl font-outfit-bold text-white'>Submit</Text>
                      </Pressable>
                    </View>
                  </View>
                ))
              }
            </View>
          )
        }
      </ScrollView>
    </View>
  );
};

