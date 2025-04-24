import { Stack } from "expo-router";
import {useFonts} from "expo-font";
// Import your global CSS file
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
export default function RootLayout() {
    const [fontsLoaded]=useFonts({
    'outfit':require("./../assets/fonts/Outfit-Regular.ttf"),
    'outfit-black':require("./../assets/fonts/Outfit-Black.ttf"),
    'outfit-bold':require("./../assets/fonts/Outfit-Bold.ttf"),
    'outfit-extrabold':require("./../assets/fonts/Outfit-ExtraBold.ttf"),
    'outfit-extralight':require("./../assets/fonts/Outfit-ExtraLight.ttf"),
    'outfit-light':require("./../assets/fonts/Outfit-Light.ttf"),
    'outfit-medium':require("./../assets/fonts/Outfit-Medium.ttf"),
    'outfit-thin':require("./../assets/fonts/Outfit-Thin.ttf"),
    'outfit-semibold':require("./../assets/fonts/Outfit-SemiBold.ttf")
  })
  return (
    <SafeAreaView style={{flex:1}}>
      <Stack screenOptions={{headerShown:false}}>
      </Stack>
    </SafeAreaView>
  );
}
