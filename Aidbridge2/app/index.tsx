import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import {LinearGradient} from "expo-linear-gradient"
export default function Index() {
  return (
    <>
    {/* <View className="absolute top-[-15] left-[-25] w-40 h-40 bg-green-500  rounded-full backdrop-blur-xl" />
    <View className="absolute bottom-[-15] right-[-25] w-40 h-40 bg-green-500 rounded-full" /> */}
    {/* <View className="absolute inset-0 bg-transparent shadow-2xl shadow-green-400" /> */}
    
    <View className="flex gap-20 ">
    <LinearGradient
        colors={["rgba(34, 197, 94, 0.3)", "transparent", "rgba(34, 197, 94, 0.3)"]}
        locations={[0, 0.5, 1]}
        className="absolute inset-0"
      />
      <Text className="text-5xl font-outfit-bold text-center mt-10 underline">WELCOME</Text>
      <View className="flex flex-col justify-center items-center gap-5 mt-20">
        <View className='flex flex-row gap-5 items-center'>
          <Link href="../login" asChild>
            <TouchableOpacity className="Button">
              <Text className="font-Bold text-2xl text-white">Refugee</Text>
            </TouchableOpacity>
          </Link>
          <Text className="text-2xl font-medium">Looking For Help</Text>
        </View>
        <Text className="text-3xl font-bold">OR</Text>
        <View className='flex flex-row gap-5 items-center -ml-[55px]'>
          <Link href="../login" asChild>
          <TouchableOpacity className="Button1">
            <Text className="font-Bold text-2xl text-white">NGO</Text>
          </TouchableOpacity>
          </Link>
          <Text className="text-2xl font-medium">Here to Help</Text>
        </View>
      </View>
    </View>
    </>
  );
}
