import { View, Text ,StyleSheet,Dimensions} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
const { width, height } = Dimensions.get("window");
const App = () => {
  return (
    <>
    <View>
    <LinearGradient
        colors={["lightgreen", "transparent"]}
        locations={[0, 0.7]}
        style={[styles.shadowOverlay, { top: 0 }]}
    />
      <Text>App</Text>
      <LinearGradient
        colors={["transparent", "lightgreen"]}
        locations={[0.2, 0.7]}
        style={[styles.shadowOverlay, { bottom: 0,position:'fixed'}]}
    />
      </View>
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
export default App