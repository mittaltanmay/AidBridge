import { View, Text ,TouchableOpacity,Pressable,Dimensions,StyleSheet,Image, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useRouter , useLocalSearchParams} from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
const {height } = Dimensions.get("window");
import AsyncStorage from '@react-native-async-storage/async-storage' // ✅ Added
import supabase from '../../config/supabaseClient' // ✅ Added


export default function History(){
    const router=useRouter();
    interface EventData {
      id: number;                // Matches `bigint` → `number` in JS
      event_name: string | null; // text can be null → make it nullable
      Description: string | null;// text can be null → nullable
      date: string | null;       // `date` returns as ISO string or null
      time: string;              // time → string (always not null)
      NGO_id: number | null;     // bigint nullable → number or null
    }
    const [events, setEvents] = useState<EventData[]>([]);
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const userDataString = await AsyncStorage.getItem('NGO')
          if (!userDataString) {
            console.log('No NGO user found in storage')
            return
          }
  
          const userData = JSON.parse(userDataString)
          const NGO_id = userData.NGO_id
  
          const { data, error } = await supabase
            .from('Events')
            .select('*')
            .eq('NGO_id', NGO_id)
  
          if (error) {
            console.error('Error fetching events:', error.message)
          } else {
            setEvents(data)
          }
        } catch (error) {
          console.error('Unexpected error:', error)
        }
      }
  
      fetchEvents()
    }, [])
     function header()
      {
        return(
          <View className='flex h-fit px-2 py-4 flex-row items-center gap-2 border-b border-b-slate-300'>
            <Image className='w-[50px] h-[50px] rounded-full' source={require('../../assets/images/logo7.webp')}/>
            <Text className='font-outfit-semibold text-3xl mt-4'>Welcome</Text>
          </View>
        )
      }
  return (
    <>
    <LinearGradient
      colors={["lightgreen", "transparent"]}
      locations={[0, 0.7]}
      style={[styles.shadowOverlay, { top: 0 }]}
    />
    {header()}
    <View className='flex flex-col items-center justify-center flex-1 py-5 '>
      <Text className='text-4xl font-outfit-bold'>Events Hosted</Text>
      <ScrollView>
          <View className='flex flex-col py-10 flex-1 w-[370px]'>
          {events.length === 0 ? (
            <Text className="text-center text-gray-500 mt-10">No events found.</Text>
            ) : (
              events.map((event) => (
                <View
                  key={event.id}
                  className="bg-white border rounded-lg p-4 mb-4 flex flex-col gap-2">
                  <Text className="text-3xl text-green-500 font-outfit-bold">{event.event_name}</Text>
                  <Text className="text-2xl text-green-500 font-outfit-bold">Decription: <Text className='text-xl font-outfit-semibold text-black'>{event.Description}</Text></Text>
                  <Text className="text-2xl text-green-500 font-outfit-bold">📅 Date: <Text className='text-black font-outfit-semibold text-xl'>
                    {event.date ? new Date(event.date).toLocaleDateString('en-GB') : 'No date provided'}</Text>
                    </Text>
                  <Text className="text-green-500 text-2xl font-outfit-bold">⏰ Time: <Text className='text-xl font-outfit-semibold text-black'>
                    {event.time}
                    </Text>
                  </Text>
                </View>
              ))
            )}
          </View>
      </ScrollView>
      </View>
    <LinearGradient
      colors={["transparent", "lightgreen"]}
      locations={[0.2, 0.7]}
      style={[styles.shadowOverlay, { bottom: 0,position:'fixed'}]}
      />
    </>
  )
}
const styles=StyleSheet.create({
  shadowOverlay: {
    position: "absolute",
    width: "100%",
    height: height * 0.15, // Covers only 12% of the screen height at top and bottom
    zIndex: 0,
  },
})

