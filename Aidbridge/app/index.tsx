import { Text, TouchableOpacity, View } from "react-native";
export default function Index() {
  return (
    <>
    <View className="flex gap-20">
      <View className="circle"></View>
      <Text className="text-5xl font-bold text-center mt-10 underline">WELCOME</Text>
      <View className="flex flex-col justify-center items-center gap-5">
        <View className='flex flex-row gap-5 items-center'>
          <TouchableOpacity className="Button">
            <Text className="font-Bold text-2xl">Refugee</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-medium">Looking For Help</Text>
        </View>
        <Text className="text-3xl font-bold">OR</Text>
        <View className='flex flex-row gap-5 items-center'>
          <TouchableOpacity className="Button1">
            <Text className="font-Bold text-2xl">NGO</Text>
          </TouchableOpacity>
          <Text className="text-2xl font-medium">Here to Help</Text>
        </View>
      </View>
    </View>
    </>
  );
}
