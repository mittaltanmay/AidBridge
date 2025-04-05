import { View, Text ,StyleSheet,Dimensions,TouchableOpacity, KeyboardAvoidingView,Platform, Modal ,ScrollView,Image, TextInput, Pressable} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import * as Location from 'expo-location';
import MapView, { Marker, Region } from 'react-native-maps';
const { width, height } = Dimensions.get("window");
import supabase from "../../config/supabaseClient";

export default function Register(){
const router=useRouter();
const [NGO_id,setngo_id]=useState('');
const [ngocontact,setngocontact]=useState('');
const [NGO_name,setngo_name]=useState('');
const [ngopassword,setngopassword]=useState('');
const [ngolocation,setNgolocation]=useState<Region|null>(null);
const [modalVisible, setModalVisible] = useState(false);
useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setNgolocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  })();
}, []);

interface NGOData {
  NGO_name: string;
  NGO_id: number;
  ngocontact: number;
  ngopassword: string;
  ngolocation: Region | null;
}

function handleregister() // all the info need to be stored in backend
{
  if(!NGO_id || !NGO_name || !ngocontact || !ngopassword) return;
  console.log(NGO_id,NGO_name,ngocontact,ngopassword);
  const data = {
    NGO_id : parseInt(NGO_id),
    NGO_name,
    ngocontact : parseInt(ngocontact),
    ngopassword,
    ngolocation
   };
  registerUser(data);
  setngo_id('');
  setngocontact('');
  setngo_name('');
  setngopassword('');
  if (ngolocation) {
    console.log("Selected Location:");
    console.log("Latitude:", ngolocation.latitude); // for location to show on map for refugee
    console.log("Longitude:", ngolocation.longitude); //for location to show on map for refugee
  } else {
    console.log("No location selected");
  }
  setNgolocation(null);
  router.push('/authNgo/login');
  return;
}
async function registerUser(data: NGOData): Promise<{ success: boolean; message: string }> {
  const { NGO_id, NGO_name, ngocontact, ngopassword, ngolocation } = data;

  try {
      const { error } = await supabase
          .from('NGO')  // Your table name
          .insert([{
            NGO_id,
            NGO_name,
            ngocontact,
            ngopassword,
            ngolocation: JSON.stringify(ngolocation),
              is_active: true// Default to false
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
          <View className='flex flex-col px-10 items-center justify-center gap-10 mt-10'>
            <Image className="w-[150px] h-[150px] mt-10 border" source={require('./../../assets/images/logo7.webp')} />
            <Text className='font-outfit-bold text-3xl'>Register Your Ngo</Text>
            <View className='flex flex-col gap-1'>
              <TextInput placeholder='Enter your Darpan Id' value={NGO_id} onChangeText={setngo_id} className='bg-white w-[300px] h-[50px] border rounded-md px-3'></TextInput>
              <Text className='text-green-500'> *this wil be the username for login</Text>
            </View>
            <TextInput placeholder='Enter NGO Name' value={NGO_name} onChangeText={setngo_name} className='bg-white w-[300px] h-[50px] border rounded-md px-3 -mt-5'></TextInput>
            <TextInput placeholder='Contact' value={ngocontact} onChangeText={setngocontact} className='bg-white w-[300px] h-[50px] border rounded-md px-3 '></TextInput>
            <TextInput placeholder='Set Password' secureTextEntry={true} value={ngopassword} onChangeText={setngopassword} className='bg-white w-[300px] h-[50px] border rounded-md px-3'></TextInput>
            <Pressable className='border bg-white px-3 w-[300px] h-[50px]  rounded-md flex justify-center' onPress={() => setModalVisible(true)}>
              <Text className='text-black'>Enter Loaction</Text>
            </Pressable>
            <Pressable className='bg-black px-4 py-3 rounded-md'>
              <Text className='font-outfit-semibold text-xl text-white' onPress={handleregister}>Register</Text>
            </Pressable>
            <Text className="text-center -mt-5 font-outfit-medium text-lg">Already Have an Account?
              <TouchableOpacity onPress={()=>(router.push('/authNgo/login'))}><Text className="font-outfit-medium text-blue-400 -mb-2 text-lg"> LogIn</Text></TouchableOpacity>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <LinearGradient
      colors={["transparent", "lightgreen"]}
      locations={[0.2, 0.7]}
      style={[styles.shadowOverlay, { bottom: 0,position:'fixed'}]}/>
       <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text className="text-2xl font-outfit-bold mb-4">Select NGO Location</Text>
          {ngolocation && (
            <MapView
              style={styles.map}
              initialRegion={ngolocation}
              onPress={(e) => {
                setNgolocation({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                });
              }}
            >
              {ngolocation && <Marker coordinate={ngolocation} title="Selected Location" />}
            </MapView>
          )}
          <Pressable style={styles.confirmButton} onPress={() => setModalVisible(false)}>
            <Text className='text-white text-lg'>Confirm Location</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  )
}
const styles=StyleSheet.create({
  shadowOverlay: {
    position: "absolute",
    width: "100%",
    height: height * 0.15, // Covers only 15% of the screen height at top and bottom
    zIndex: 0,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  map: {
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 10,
  },
  confirmButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "black",
    borderRadius: 5,
  },
});
