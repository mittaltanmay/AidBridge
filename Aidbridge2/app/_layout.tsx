import { Stack } from "expo-router";
// Import your global CSS file
import "../global.css";
export default function RootLayout() {
  return (
    <Stack>
    <Stack.Screen name="index" options={{ title: "Home" }} />
    <Stack.Screen name="login" options={{ title: "Login" }} /> 
    <Stack.Screen name="register" options={{title:"Register"}}/>
  </Stack>
  );
}
