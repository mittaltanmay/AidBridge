import { View, Text ,StyleSheet,Dimensions,Image, Pressable} from 'react-native'
import React , {ReactNode, useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse,faLocationDot,faUsersRectangle,faTriangleExclamation} from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/free-regular-svg-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen'
const { width, height } = Dimensions.get("window");
interface LayoutProps {
  children: ReactNode;
}
export default function Layout ({children}:LayoutProps) 
{
  const [currpage,setcurrpage]=useState('Home');
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
      <View className='z-10 bg-slate-50 flex flex-row border-t border-t-black h-[70px] px-2 py-2 items-center justify-around'>
          <View className={'flex flex-col gap-1 items-center justify-center' + (currpage==='Home'?' opacity-[0.6]':'') }>
            <Pressable onPress={()=>{setcurrpage('Home')}}>
                <FontAwesomeIcon icon={faHouse} size={30}/>
            </Pressable>
            <Text className='font-outfit-medium text-sm'>Home</Text>
          </View>
          
          <View className={'flex flex-col gap-1 items-center justify-center ' + (currpage==='LocateNgo'?' opacity-[0.6]':'')}>
            <Pressable onPress={()=>{setcurrpage('LocateNgo')}}>
              <FontAwesomeIcon icon={faLocationDot} size={30}/>
            </Pressable>
            <Text className='font-outfit-medium text-sm'>Locate NGO</Text>
          </View>
          
          <View className='flex flex-col gap-1 items-center justify-center'>
            <FontAwesomeIcon icon={faUsersRectangle} size={30}/>
            <Text className='font-outfit-medium text-sm'>Events</Text>
          </View>
          
          <View className='flex flex-col gap-1 items-center justify-center'>
            <FontAwesomeIcon icon={faTriangleExclamation} size={30}/>
            <Text className='font-outfit-medium text-sm'>Raise Issue</Text>
          </View>
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