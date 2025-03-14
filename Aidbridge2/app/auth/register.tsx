import { View, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, Platform} from 'react-native'
import React, { useState } from 'react'
import { StyleSheet,Dimensions,Image} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {state,locations} from "./../../utils/loaction"
import { Picker } from '@react-native-picker/picker' 
const { width, height } = Dimensions.get("window");

const Register = () => {
  const [name,setName]=useState('');
  const [contact,setcontact]=useState('');
  const [selectedState, setSelectedState] = useState('');
  const [sublocation,setsublocation]=useState('');
  function handleregister()
  {
    if(!state || !contact || !selectedState || !sublocation) return;
    console.log(name,contact,selectedState,sublocation);
    setName('');
    setSelectedState('');
    setsublocation('');
    setcontact('');
    return;
  }
  return (
    <>
      <LinearGradient
        colors={["lightgreen", "transparent"]}
        locations={[0, 0.5]}
        style={[styles.shadowOverlay, { top: 0 }]}
      />
      <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={{flex:1}}>
      <View className='p-10 flex flex-col items-center justify-center gap-5'>
        <Image className="w-[150px] h-[150px] mt-10 border" source={require('./../../assets/images/logo7.webp')} />
        <Text className='text-5xl font-outfit-bold'>Register</Text>
        <View className='flex flex-col gap-10'>
          <TextInput className='bg-white border w-[300px] h-[50px px-5 rounded-md font-outfit-medium'value={name}  onChangeText={setName} placeholder='Name'></TextInput>
          <View className="bg-white border w-[300px] h-fit rounded-md">
              <Picker
                selectedValue={selectedState}
                onValueChange={(itemValue) => setSelectedState(itemValue)}>
                <Picker.Item label="Select State" value="" enabled={false} />
                {state.map((st, index) => (
                  <Picker.Item key={index} label={st} value={st} />
                ))}
              </Picker>
          </View>
          {selectedState && locations[selectedState as keyof typeof locations] && (
          <View className='bg-white border w-[300px] rounded-md'>
            <Picker selectedValue={sublocation} onValueChange={(itemValue) => setsublocation(itemValue)}>
              <Picker.Item label='Select Sublocation' value='' enabled={false} />
              {locations[selectedState as keyof typeof locations].map((sub, index) => (
                <Picker.Item key={index} label={sub} value={sub} />
              ))}
            </Picker>
          </View>
        )}
        <TextInput className='bg-white px-5 border w-[300px]  h-[50px] rounded-md font-outfit-medium' placeholder='Contact' keyboardType='numeric' value={contact} onChangeText={setcontact}></TextInput>
        </View>
        <TouchableOpacity className="border py-3 px-5 bg-black rounded-lg" onPress={handleregister}>
          <Text className='text-white font-outfit-bold text-xl'>Register</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
      <LinearGradient
          colors={["transparent", "lightgreen"]}
          locations={[0.2, 0.7]}
          style={[styles.shadowOverlay, { bottom: 0,position:'fixed'}]}/>
    </>
  )
}

export default Register
const styles=StyleSheet.create({
  shadowOverlay: {
    position: "absolute",
    width: "100%",
    height: height * 0.15, // Covers only 15% of the screen height at top and bottom
    zIndex: 0,
  },
})
