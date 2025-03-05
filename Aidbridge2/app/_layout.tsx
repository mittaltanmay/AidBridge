import { Stack } from "expo-router";
import {useFonts} from "expo-font";
// Import your global CSS file
import "../global.css";
export default function RootLayout() {
    const [fontsLoaded]=useFonts({
    'outfit':require("./../assets/fonts/Outfit-Regular.ttf"),
    'outfit-black':require("./../assets/fonts/Outfit-Black.ttf"),
    'outfit-bold':require("./../assets/fonts/Outfit-Bold.ttf"),
    'outfit-extrabold':require("./../assets/fonts/Outfit-ExtraBold.ttf"),
    'outfit-extralight':require("./../assets/fonts/Outfit-ExtraLight.ttf"),
    'outfit-light':require("./../assets/fonts/Outfit-Light.ttf"),
    'outfit-medium':require("./../assets/fonts/Outfit-Medium.ttf"),
    'outfit-thin':require("./../assets/fonts/Outfit-Thin.ttf")
  })
  return (
    <Stack screenOptions={{headerShown:false}}>
  </Stack>
  );
}
