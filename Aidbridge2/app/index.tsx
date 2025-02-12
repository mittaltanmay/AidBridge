import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
export default function Index() {
  return (
    <>
    <View className="flex gap-20">
      <View className="circle"></View>
      <Text className="text-5xl font-bold text-center mt-10 underline">WELCOME</Text>
      <View className="flex flex-col justify-center items-center gap-5 mt-20">
        <View className='flex flex-row gap-5 items-center'>
          <Link href="/">
            <TouchableOpacity className="Button">
              <Text className="font-Bold text-2xl text-white">Refugee</Text>
            </TouchableOpacity>
          </Link>
          <Text className="text-2xl font-medium">Looking For Help</Text>
        </View>
        <Text className="text-3xl font-bold">OR</Text>
        <View className='flex flex-row gap-5 items-center -ml-[55px]'>
          <TouchableOpacity className="Button1">
            <Text className="font-Bold text-2xl text-white">NGO</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-medium">Here to Help</Text>
        </View>
      </View>
    </View>
    </>
  );
}
