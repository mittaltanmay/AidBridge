import { View, Text ,TouchableOpacity,Pressable,Dimensions,StyleSheet,Image, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import React from 'react'
import { useRouter , useLocalSearchParams} from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
const {height } = Dimensions.get("window");


export default function History(){
    const router=useRouter();
     function header()
      {
        return(
          <View className='flex h-fit px-2 py-4 flex-row items-center gap-2 border-b border-b-slate-300'>
            <Image className='w-[50px] h-[50px] rounded-full' source={require('../../assets/images/logo7.webp')}/>
            <Text className='font-outfit-semibold text-3xl mt-4'>Welcome</Text>
          </View>
        )
      }
      const { eventList } = useLocalSearchParams();
      const parsedEventList = eventList ? JSON.parse(eventList as string) : [];
  return (
    <>
    <LinearGradient
      colors={["lightgreen", "transparent"]}
      locations={[0, 0.7]}
      style={[styles.shadowOverlay, { top: 0 }]}
    />
    {header()}
    <View className='flex flex-col items-center justify-center flex-1 py-5'>
      <Text className='text-4xl font-outfit-bold'>Events Hosted</Text>
      <ScrollView>
          <View className='flex flex-col py-10 flex-1'>
          {parsedEventList.length > 0 ? (
            parsedEventList.map((event: any) => (
              <View key={event.id} className= "flex w-[380px] flex-col border px-2 py-2 rounded-lg bg-white">
               <Text className="font-outfit-semibold text-xl text-green-600">{event.name}</Text>
                <Text className="font-outfit-semibold text-green-600 text-xl">
                  Organized by: <Text className="text-black font-outfit-medium">Fetch from Backend</Text>
                </Text>
                <Text className="text-xl text-green-600 font-outfit-semibold">
                  Description: <Text className="text-black text-xl font-outfit-medium">{event.description}</Text>
                </Text>
                <Text className="text-green-600 text-lg font-outfit-semibold">
                  📅{event.date}|⏰{event.time}
                </Text>
            </View>
              ))
            ) : (
              <Text className="text-gray-500 text-xl font-outfit-semibold">No events found.</Text>
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

