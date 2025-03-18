import { View, Text ,StyleSheet,Dimensions,Image} from 'react-native'
import React , {ReactNode} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
const { width, height } = Dimensions.get("window");
interface LayoutProps {
  children: ReactNode;
}
export default function Layout ({children}:LayoutProps) 
{
  function header()
  {
    return(
      <View className='flex h-fit px-2 py-4 flex-row items-center gap-2 border-b border-b-slate-300'>
        <Image className='w-[50px] h-[50px] rounded-full' source={require('../../assets/images/logo7.webp')}/>
        <Text className='font-outfit-bold text-2xl mt-4'>Welcome,Tanmay</Text>
      </View>
    )
  }
  function footer()
  {
    return(
      <View className='flex flex-row border-t border-t-slate-300 h-[80px]'>

      </View>
    )
  }
  return (
    <View className='flex flex-col h-full'>
      {header()}
      <View className='flex flex-col mx-auto mt-10 flex-1'>
        {children}
      </View>
      {footer()}
    </View>
  )
}