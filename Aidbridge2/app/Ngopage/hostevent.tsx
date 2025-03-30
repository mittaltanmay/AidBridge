import { View, Text ,TouchableOpacity,Pressable,Dimensions,StyleSheet,Image, TextInput} from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
const {height } = Dimensions.get("window");
import { faPlusCircle,faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { DatePickerInput } from 'react-native-paper-dates';
// import { useState } from 'react-native'

export default function HostEvent(){
    const router=useRouter();
    const [height, setHeight] = useState(0); // Initial height
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
    <View className='flex flex-col h-full'>
    <LinearGradient
      colors={["lightgreen", "transparent"]}
      locations={[0, 0.7]}
      style={[styles.shadowOverlay, { top: 0 }]}
    />
    {header()}
    <View className='flex flex-col py-10 flex-1 items-center gap-14'>
      <Text className='text-2xl font-outfit-bold'>Enter Details To Host Event</Text>
      <View className='flex flex-col gap-5'>
        <TextInput placeholder="Name of Event" className='bg-white border w-[300px] h-[50px] rounded-md px-3'></TextInput>
        <TextInput multiline={true} onContentSizeChange={(event) =>
        setHeight(event.nativeEvent.contentSize.height)
      }  style={[{ height: Math.max(50, height) }]} placeholder='Enter Description' className='bg-white border w-[300px] h-[50px] rounded-md px-3'></TextInput>
       <View className='h-10 w-[300px]'>
          <DatePickerInput
          locale="en"
          label="Date of Event"
          inputMode="start"
          style={{backgroundColor:'white'}}
          mode='outlined'
          />
       </View>
      </View>
    </View>
    <LinearGradient
      colors={["transparent", "lightgreen"]}
      locations={[0.2, 0.7]}
      style={[styles.shadowOverlay, { bottom: 0,position:'fixed'}]}
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

