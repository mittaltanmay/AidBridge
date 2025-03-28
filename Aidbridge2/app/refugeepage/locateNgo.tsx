import { View, Text,StyleSheet, Platform} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker, Region} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const NUM_NGO_MARKERS=10;
export default function LocateNgo(){
  const [location, setLocation] = useState<Region | null>(null);
  const [ngoMarkers, setNgoMarkers] = useState<{ latitude: number; longitude: number; name: string }[]>([]);
  useEffect(() => {
    const fetchLocation = async () => {
      if(location) return;
      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let userLocation = await Location.getCurrentPositionAsync({});
      const usercoord={
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
      // Get current location
      setLocation(usercoord);
      setNgoMarkers(generateNearbyLocations(usercoord.latitude, usercoord.longitude, NUM_NGO_MARKERS));
    };
    fetchLocation();
  }, []);
  const generateNearbyLocations = (lat: number, lon: number, num: number) => {
    const newMarkers = [];
    for (let i = 0; i < num; i++) {
      const latitudeOffset = (Math.random() - 0.5) * 0.03; // Randomly offset lat by ±0.01
      const longitudeOffset = (Math.random() - 0.5) * 0.03; // Randomly offset lon by ±0.01

      newMarkers.push({
        latitude: lat + latitudeOffset,
        longitude: lon + longitudeOffset,
        name: `NGO ${i + 1}`, // Assign a name for testing
      });
    }
    return newMarkers;
  };
  return (
    <View className='items-center -mt-9 flex px-2 h-[50%] w-full'>
      <MapView
        style={{height:450,width:400}}
        provider={PROVIDER_GOOGLE}
        region={location || {
          latitude: 28.6139, // ✅ Default location: New Delhi, India
            longitude: 77.2090,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }}
        showsUserLocation
      >
        {location && <Marker coordinate={location} title="Your Location" pinColor="blue"/>}
        {ngoMarkers.map((marker, index) => (
          <Marker key={index} coordinate={marker} title={marker.name} pinColor="red" />
        ))}
      </MapView>   
    </View>
  )
}
