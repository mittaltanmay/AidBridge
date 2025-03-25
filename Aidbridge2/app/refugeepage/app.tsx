import { View, Text ,StyleSheet,Dimensions,Image} from 'react-native'
import React , {ReactNode, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Layout from './layout';
import Frontpage from './frontpage';
import LocateNgo from './locateNgo';
import Events from './Events';
import Issue from './Issue';
const { width, height } = Dimensions.get("window");
export default function App()
{
  const [currpage,setcurrpage]=useState('Home');
  const [enrolledEvents, setEnrolledEvents] = useState<{ [key: string]: boolean }>({}); 
  const enrollEvent = (eventKey: string) => {// it initializes an object of key value pairs with eventkey as key and boolean true or false as value and stores the event key which are enrolled by the user
    if (!enrolledEvents[eventKey]) {  // Ensure enrollment is irreversible
      setEnrolledEvents(prev => ({
        ...prev,
        [eventKey]: true
      }));
    }
  };
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
          <Frontpage enrolledEvents={enrolledEvents}/>:currpage==='LocateNgo'?
          <LocateNgo/>:currpage==='events'?<Events
          enrolledEvents={enrolledEvents}
          setEnrolledEvents={setEnrolledEvents}
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