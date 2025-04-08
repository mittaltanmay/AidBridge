import { View, Text ,StyleSheet,Dimensions,Image} from 'react-native'
import { registerTranslation, en } from 'react-native-paper-dates';
import React , {ReactNode, useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from './layout';
import Frontpage from './frontpage';
import LocateNgo from './locateNgo';
import { Event } from './Events';
import Events from './Events';
import Issue from './Issue';
import supabase from "../../config/supabaseClient";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get("window");

// Register the English locale
registerTranslation('en', en);

export default function App()
{
  const [currpage,setcurrpage]=useState('Home');
  const [enrolledEvents, setEnrolledEvents] = useState<{ [key: string]: boolean }>({}); 
  const [events, setEvents] = useState<Event[]>([]);
  const enrollEvent = async (eventId: string) => {
    try {
      // Fetch the stored user data from AsyncStorage
      const userDataString = await AsyncStorage.getItem('user');
      if (!userDataString) {
        console.log('Error: User not logged in');
        return;
      }
      console.log(userDataString);
      // Parse the user data to get the user_id
      const userData = JSON.parse(userDataString);
      const ref_id = userData.unhcrid;  
      const { data, error } = await supabase
        .from('participate')  // Replace 'users' with your table name
        .insert([{ ref_id, Event_id: eventId }]);
  
      if (error) {
        console.log(`Error: ${error.message}`);
      } else {
        console.log('Data inserted successfully!');
      } }catch(error) {
        console.log(`Unexpected error: ${error}`);
      }
    setEnrolledEvents(prev => {
      const updatedEnrolledEvents = { ...prev, [eventId]: true };
      console.log('✅ Updated Enrolled Events:', updatedEnrolledEvents);
      return updatedEnrolledEvents;
    });
  };
  
  
  useEffect(() => {
    // console.log('Events in App:', events);
    // console.log('Enrolled Events:', enrolledEvents);
    const fetchEventsAndEnrollments = async () => {
      // Fetch all events
      const { data: eventData } = await supabase
      .from('Events')
      .select('*');
      if (eventData) 
      setEvents(eventData);
      const userDataString = await AsyncStorage.getItem('user');
      if (!userDataString) {
        console.log('Error: User not logged in');
        return;
      }
      console.log(userDataString);
      // Parse the user data to get the user_id
      const userData = JSON.parse(userDataString);
      const ref_id = userData.unhcrid;
      // Fetch user's enrollments
      const { data: enrollmentData, error } = await supabase
        .from('participate')
        .select('Event_id, Events(Description, event_name, NGO_id, NGO(NGO_name))')
        .eq('ref_id', ref_id) ;
        if (error) {
          console.log('❌ Supabase error:', error.message);
        } else {
          console.log('✅ Enrollment + Event details:', enrollmentData);
        }
      if (enrollmentData) {
        const enrolledMap: { [key: string]: boolean } = {};
        enrollmentData.forEach((row) => {
          enrolledMap[row.Event_id] = true;
        });
        setEnrolledEvents(enrolledMap);
      }
    };
  
    fetchEventsAndEnrollments();
  }, []);
  
  return (
    <View className='min-h-screen'>
      <LinearGradient
          colors={["lightgreen", "transparent"]}
          locations={[0, 0.7]}
          style={[styles.shadowOverlay, { top: 0 }]}
        />
      <Layout currpage={currpage} setcurrpage={setcurrpage}>
        {
          (currpage==='Home'?
            <Frontpage 
            key={Object.keys(enrolledEvents).length} // ✅ Forces re-render when enrolledEvents changes
            events={events} 
            enrolledEvents={enrolledEvents} 
          />
          :currpage==='LocateNgo'?
          <LocateNgo/>:currpage==='events'?<Events
          events={events}
          setEvents={setEvents}
          enrolledEvents={enrolledEvents}
          enrollEvent={enrollEvent}
          />:<Issue/>)
        }
      </Layout>
      <LinearGradient
        colors={["transparent", "lightgreen"]}
        locations={[0.2, 0.7]}
        style={[styles.shadowOverlay, { bottom: 0}]}
      />
    </View>
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