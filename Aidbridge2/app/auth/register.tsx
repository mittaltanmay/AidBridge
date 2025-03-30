import { View, Text, TextInput, TouchableOpacity,KeyboardAvoidingView, Platform} from 'react-native'
import React, { useState } from 'react'
import { StyleSheet,Dimensions,Image} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {state,locations} from "./../../utils/loaction"
import { Picker } from '@react-native-picker/picker' 
import { ScrollView } from 'react-native';
import { DatePickerInput } from 'react-native-paper-dates';
import * as ImagePicker from 'expo-image-picker';
import {faCamera} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const { width, height } = Dimensions.get("window");
import supabase from "../../config/supabaseClient";
import { Alert } from 'react-native';

const Register = () => {
  const [name,setName]=useState('');
  const [selectedState, setSelectedState] = useState('');
  const [sublocation,setsublocation]=useState('');
  const [password,setpassword]=useState('');
  const [dob,setdob]=useState(undefined);
  const [unhcrid,setunhcrid]=useState('');
  const [country,setcountry]=useState('');
  const [idImage, setIdImage] = useState<string | null>(null);

    async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert("Permission to access gallery is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIdImage(result.assets[0].uri);
      console.log("Selected Image URI:", result.assets[0].uri); // ✅ Log to console
    }
  }
  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert("Permission to access camera is required!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIdImage(result.assets[0].uri);
      console.log("Captured Image URI:", result.assets[0].uri); // ✅ Log to console
    }

    const data = {
      name,
      selectedState,
      sublocation,
      password,
      dob,
      unhcrid: parseInt(unhcrid),
      country,
      idImage,
  };

  const response = await registerUser(data);
  Alert.alert(response.message);

  }

  interface UserData {
    name: string;
    selectedState: string;
    sublocation: string;
    password: string;
    dob: undefined;
    unhcrid: number;
    country: string;
    idImage: string | null;
}

  function handleregister() {
    if(!state || !selectedState || !sublocation) return;
    console.log(name,selectedState,sublocation,dob,password,country,unhcrid);
    const data = {
      name,
      selectedState,
      sublocation,
      password,
      dob,
      unhcrid: parseInt(unhcrid),
      country,
      idImage,
  };
    registerUser(data);

    setName('');
    setSelectedState('');
    setsublocation('');
    setdob(undefined);
    setIdImage(null);
    setunhcrid('');
    setcountry('');
    return;
  }

  // Registration function
  async function registerUser(data: UserData): Promise<{ success: boolean; message: string }> {
  const { name, selectedState, sublocation, password, dob, unhcrid, country, idImage } = data;

  try {
      const { error } = await supabase
          .from('Refugee')  // Your table name
          .insert([{
              name,
              selectedState, sublocation, password, dob,
              unhcrid,       // Store hashed password ideally
              country, 
              idImage,
              is_active: false // Default to false
          }]);

      if (error) {
          console.error('Error during registration:', error.message);
          return { success: false, message: error.message };
      }
      return { success: true, message: 'Registration successful. Await admin approval.' };
  } catch (err) {
      console.error('Unexpected error:', err);
      return { success: false, message: 'Unexpected error occurred.' };
  }
}

  return (
    <>
      <LinearGradient
        colors={["lightgreen", "transparent"]}
        locations={[0, 0.5]}
        style={[styles.shadowOverlay, { top: 0 }]}
      />
      <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':'height'} style={{flex:1}}>
      <ScrollView>
        <View className='p-10 flex flex-col items-center justify-center gap-10'>
          <Image className="w-[150px] h-[150px] mt-10 border" source={require('./../../assets/images/logo7.webp')} />
          <Text className='text-5xl font-outfit-bold'>Register</Text>
          <View className='flex flex-col gap-10'>
            <View className='flex flex-col gap-1'>
              <TextInput className='bg-white px-5 w-[300px] h-[50px] rounded-md font-outfit-medium border' placeholder='Enter UNHCR ID' value={unhcrid} onChangeText={setunhcrid}></TextInput>
              <Text className='text-green-500'> *this wil be the username for login</Text>
            </View>
            <TextInput className='bg-white -mt-5 border w-[300px] h-[50px] px-5 rounded-md font-outfit-medium'value={name}  onChangeText={setName} placeholder='Name'></TextInput>
            <TextInput className='bg-white border w-[300px] h-[50px] px-5 rounded-md font-outfit-medium' value={country} onChangeText={setcountry} placeholder='Enter your country'></TextInput>
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
          <View className='h-10 bg-white w-[300px]'>
            <DatePickerInput //DOB is stored in yyyy-mm-dd format
            locale="en"
            label="Date of Birth"
            value={dob}
            onChange={(d) => setdob(d)}
            inputMode="start"
            style={{backgroundColor:'white'}}
            mode='outlined'
            />
          </View>
          <TextInput secureTextEntry={true}  placeholder='Create Pasword' className='bg-white border w-[300px] h-[50px] px-5 rounded-md font-outfit-medium' value={password} onChangeText={setpassword}>
          </TextInput>
          <TouchableOpacity className="border px-4 py-4 bg-white rounded-md " onPress={takePhoto}>
            <View className='flex flex-row gap-2 items-center'>
              <FontAwesomeIcon icon={faCamera}/>
              <Text className='text-black font-outfit-medium align-middle'>Take UNHCR ID Photo</Text>
            </View>
          </TouchableOpacity>
          {idImage && (
          <Image 
              source={{ uri: idImage }} 
              style={{ width: 300, height: 200, marginTop: 10, borderRadius: 0 }} 
            />
          )}
          </View>
          <TouchableOpacity className="border py-3 px-5 bg-black rounded-lg" onPress={handleregister}>
            <Text className='text-white font-outfit-bold text-xl'>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
