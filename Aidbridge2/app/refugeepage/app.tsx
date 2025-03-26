import { View, Text ,StyleSheet,Dimensions,Image} from 'react-native'
import React , {ReactNode, useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from './layout';
import Frontpage from './frontpage';
import LocateNgo from './locateNgo';
import { Event } from './Events';
import Events from './Events';
import Issue from './Issue';
const { width, height } = Dimensions.get("window");
export default function App()
{
  const [currpage,setcurrpage]=useState('frontpage');
  const [enrolledEvents, setEnrolledEvents] = useState<{ [key: string]: boolean }>({}); 
  const [events, setEvents] = useState<Event[]>([]);
  const enrollEvent = (eventId: string) => {
    setEnrolledEvents(prev => {
      const updatedEnrolledEvents = { ...prev, [eventId]: true };
      console.log('✅ Updated Enrolled Events:', updatedEnrolledEvents);
      return updatedEnrolledEvents;
    });
  };
  
  
  useEffect(() => {
    console.log('Events in App:', events);
    console.log('Enrolled Events:', enrolledEvents);
  }, [events, enrolledEvents]);
  
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