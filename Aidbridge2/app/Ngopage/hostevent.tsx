import { View, Text ,TouchableOpacity,Pressable,Dimensions,Image, TextInput, KeyboardAvoidingView, Platform,StyleSheet, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { useRouter ,useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
const {height } = Dimensions.get("window");
import { DatePickerInput } from 'react-native-paper-dates';
import { Picker } from '@react-native-picker/picker';

export default function HostEvent(){
    const router=useRouter();
    const [height, setHeight] = useState(0); // Initial height
    const [hours,sethours]=useState('');
    const [minutes,setminutes]=useState('');
    const [ampm,setampm]=useState('');
    const [time,settime]=useState('');
    const [name,setname]=useState('');
    const [description,setdescription]=useState('');
    const [date, setdate] = useState<Date | undefined>(undefined);    
    const [formateddate,setformateddate]=useState<string>('')
    const { eventList } = useLocalSearchParams();
    const parsedEventList = eventList ? JSON.parse(eventList as string) : [];
    function header()
    {
      return(
        <View className='flex h-fit px-2 py-4 flex-row items-center gap-2 border-b border-b-slate-300'>
          <Image className='w-[50px] h-[50px] rounded-full' source={require('../../assets/images/logo7.webp')}/>
          <Text className='font-outfit-semibold text-3xl mt-4'>Welcome</Text>
        </View>
      )
    }
    function timestring(hours:string,minutes:string,ampm:string)
    {
      return `${hours}:${minutes} ${ampm}`;
    }
    function handleDate(date:Date)
    {
      if(date)
        {
          const temp_date_string=date.toLocaleDateString("en-GB");
          setformateddate(temp_date_string);
          setdate(date);
        }
    }
    function handleconfirm()
    {
      const selected_time=timestring(hours,minutes,ampm);
      const eventId = Date.now().toString(); // Unique ID
      const newEvent = {
          id: eventId, 
          name:name,
          description:description,
          date: formateddate,
          time: selected_time,
      };    
      const updatedEventList = [...parsedEventList, newEvent];
      console.log(parsedEventList);
      router.push({ pathname: '/Ngopage/history', params: { eventList: JSON.stringify(updatedEventList) } });
    }
  return (
    <>
    <LinearGradient
      colors={["lightgreen", "transparent"]}
      locations={[0, 0.7]}
      style={[styles.shadowOverlay, { top: 0 }]}
    />
    {header()}
    <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={{flex:1}}>
      <ScrollView>
        <View className='flex flex-col py-10 flex-1 items-center gap-14 justify-center'>
          <Text className='text-3xl font-outfit-bold'>Enter Details To Host Event</Text>
          <View className='flex flex-col gap-5 items-center'>
            <TextInput placeholder="Name of Event" value={name} onChangeText={setname} className='bg-white border w-[300px] h-[50px] rounded-md px-3'></TextInput>
            <TextInput multiline={true} onContentSizeChange={(event) =>
            setHeight(event.nativeEvent.contentSize.height)
          }  style={[{ height: Math.max(50, height) }]} value={description} onChangeText={setdescription} placeholder='Enter Description' className='bg-white border w-[300px] h-[50px] rounded-md px-3'></TextInput>
          <View className='h-10 w-[300px]'>
              <DatePickerInput
              locale="en"
              value={date}
              onChange={(d)=>handleDate(d)}
              label="Date of Event"
              inputMode="start"
              style={{backgroundColor:'white'}}
              mode='outlined'
              />
          </View>
          <View className='flex flex-col gap-2 items-center'>
              <Text className='text-green-500 font-outfit-semibold'>Select Time when Event Start</Text>
              <View className='flex flex-row w-[350px] gap-1'>
                <Picker
                selectedValue={hours}
                onValueChange={(itemvalue)=>sethours(itemvalue)}
                style={{flex:1,height:55,backgroundColor:'white'}}>
                  <Picker.Item label='hh' value="" enabled={false}/>
                  {["1","2","3","4","5","6","7","8","9",'10','11','12'].map((hour, index) => (
                    <Picker.Item key={index} label={hour} value={hour} />
                  ))}
                </Picker>
                <Picker
                selectedValue={minutes}
                onValueChange={(itemvalue)=>setminutes(itemvalue)}
                style={{flex:1,height:55,backgroundColor:'white'}}>
                  <Picker.Item label='mm' value="" enabled={false}/>
                  {["00","05","10","15","20","25","30","35","40","45","50","55"].map((minute, index) => (
                    <Picker.Item key={index} label={minute} value={minute} />
                  ))}
                </Picker>
                <Picker
                selectedValue={ampm}
                onValueChange={(itemvalue)=>setampm(itemvalue)}
                style={{flex:1,height:55,backgroundColor:'white',width:30}}>
                  <Picker.Item label='am/pm' value="" enabled={false}/>
                  {["am","pm"].map((AMPM, index) => (
                    <Picker.Item key={index} label={AMPM} value={AMPM} />
                  ))}
                </Picker>
              </View>
          </View>
          <Pressable className='bg-black px-4 py-3 rounded-md' onPress={()=>{handleconfirm()}}>
            <Text className='text-white font-outfit-bold text-xl'>Confirm</Text>
          </Pressable>
          </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
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

