import { View, Text ,StyleSheet,Dimensions} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
const { width, height } = Dimensions.get("window");

export default function Layout () 
{
  return (
    <>
    <View>
      <Text>Layout</Text>
    </View>
    </>
  )
}