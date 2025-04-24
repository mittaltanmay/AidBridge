import { View, Text,StyleSheet, Platform, ScrollView} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker, Region} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import supabase from "../../config/supabaseClient";
import { SafeAreaView } from 'react-native-safe-area-context';

const NUM_NGO_MARKERS=10;
export default function LocateNgo(){
  const [location, setLocation] = useState<Region | null>(null);
  const [ngoMarkers, setNgoMarkers] = useState<{ latitude: number; longitude: number; name: string,contact:string, rating: number }[]>([]);
  const [selectedNgo, setSelectedNgo] = useState<{ name: string; contact: string, rating: number } | null>(null);
  useEffect(() => {
    const fetchLocation = async () => {
      if(location) return;
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({}); // it is actually fetching location information
      const usercoord={
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
      // Get current location
      setLocation(usercoord);
      const ngos = await fetchNgosFromSupabase();
      setNgoMarkers(ngos);    
      console.log("Fetched NGO markers:", ngos);
    };
    fetchLocation();
  }, []);
  const fetchNgosFromSupabase = async () => {
    try {
      const { data, error } = await supabase
      .from('NGO') // Replace 'ngos' with your actual table name
      .select('*')
      .not('ngolocation', 'is', null)
      .not('ngocontact', 'is', null);
  
      if (error) {
        console.error("Error fetching NGO data:", error);
        return [];
      }
  
      return data.map((NGO: any) => {
        let location;
        try {
          location = JSON.parse(NGO.ngolocation);
        } catch (parseError) {
          console.warn("Failed to parse location for NGO:", NGO.NGO_name);
          return null;
        }
        const latitude = parseFloat(location.latitude);
        const longitude = parseFloat(location.longitude);
        if (isNaN(latitude) || isNaN(longitude)) return null;

        return {
          latitude,
          longitude,
          name: NGO.NGO_name as string,
          contact: String(NGO.ngocontact),
          rating: NGO.Avg_rating,
        };        
      }).filter(
        (ngo): ngo is { latitude: number; longitude: number; name: string; contact: string, rating: number } =>
          ngo !== null);
    } catch (err) {
      console.error("Error in fetching NGOs:", err);
      return [];
    }
  };
  
  return (
    <SafeAreaView>
    <View className='items-start -mt-9 flex px-2 h-[80%] w-full gap-5'>
      <MapView
        style={{height:'100%',width:400}}
        provider={PROVIDER_GOOGLE}
        region={location || {
          latitude: 28.6139, 
            longitude: 77.2090,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }}
        showsUserLocation
      >
        {location && <Marker coordinate={location} title="Your Location" pinColor="blue"/>}
        {ngoMarkers.map((marker, index) => ( // This information for NGO Markers should be fetched from backend
          <Marker 
          key={index} coordinate={marker} 
          title={marker.name} 
          pinColor="red"
          onPress={()=>setSelectedNgo({ name: marker.name,contact:marker.contact, rating: marker.rating })} 
          />
        ))}
      </MapView>   
      <Text className='ml-10 text-red-600'>*click on red marker for more information</Text>
          <View className='px-5 flex flex-col items-start gap-1 flex-wrap'>
              <View className='flex flex-row gap-1 flex-wrap'>
                <Text className='text-green-600 font-outfit-semibold text-xl'>NGO Name:</Text>
                <Text className='font-outfit-semibold text-xl'>{selectedNgo?.name}</Text>
              </View>
              <View className='flex flex-row gap-2'>
                <Text className='text-green-600 font-outfit-semibold text-xl'>Contact Details:</Text>
                <Text className='font-outfit-semibold text-xl'>{selectedNgo?.contact}</Text>
              </View>
              {selectedNgo?.rating && 
              <View className='flex flex-row gap-2'>
                <Text className='text-green-600 font-outfit-semibold text-xl'>Rating:</Text>
                <Text className='font-outfit-semibold text-xl'>{selectedNgo?.rating}</Text>
              </View>
              }
            </View>
       </View>
    </SafeAreaView>
  )
}
