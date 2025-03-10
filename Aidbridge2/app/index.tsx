import { Link, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet,Dimensions,Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");
export default function Index() {
  const router=useRouter();
  return (
    <>
    <LinearGradient
        colors={["lightgreen", "transparent"]}
        locations={[0.2, 0.7]}
        style={[styles.shadowOverlay, { top: 0 }]}
      />
    <View className="flex gap-20 px-5 py-5 items-center">
      <Image className="w-[150px] h-[150px] mt-5 border" source={require('./../assets/images/logo7.webp')} />
      <Text className="text-5xl font-outfit-bold text-center underline">WELCOME</Text>
      <View className="flex flex-col justify-center items-center gap-5 mt-15" >
        <View className='flex flex-row gap-5 items-center'>
            <TouchableOpacity className="Button" onPress={()=>router.push('/auth/register')}>
              <Text className="font-outfit-bold text-2xl text-white">Refugee</Text>
            </TouchableOpacity>
          <Text className="text-2xl font-outfit-medium">Looking For Help</Text>
        </View>
        <Text className="text-3xl font-outfit-bold">OR</Text>
        <View className='flex flex-row gap-5 items-center -ml-[49px]'>
          <TouchableOpacity className="Button1" onPress={()=>router.push('/auth/register')}>
            <Text className="font-outfit-bold text-2xl text-white">NGO</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-outfit-medium">Here to Help</Text>
        </View>
      </View>
      <Text className="text-center -mt-5 font-outfit-medium text-lg">Already Have an Account?
        <TouchableOpacity onPress={()=>(router.push('/auth/login'))}><Text className="font-outfit-medium text-blue-400 -mb-2 text-lg"> LogIn</Text></TouchableOpacity>
      </Text>
    </View>
    <LinearGradient
        colors={["transparent", "lightgreen"]}
        locations={[0.2, 0.7]}
        style={[styles.shadowOverlay, { bottom: 0 }]}
      />
    </>
  );
}
const styles=StyleSheet.create({
  shadowOverlay: {
    position: "absolute",
    width: "100%",
    height: height * 0.15, // Covers only 12% of the screen height at top and bottom
    zIndex: 0,
  },
})
