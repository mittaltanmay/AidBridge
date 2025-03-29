import { View, Text, TextInput,StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker' 


const Issue = () => {
  const [category,setcategory]=useState('');
  const [description,setdescription]=useState('');
  const [height, setHeight] = useState(0); // Initial height
  function handleSubmit()
  {
    console.log(category,description);
  }

  return (
    <View className='flex flex-col gap-10 items-center'>
      <View className='flex flex-col items-start '>
        <Text className='font-outfit-bold text-2xl'>1- Select the Category</Text>
        <Text className='font-outfit-bold text-2xl'>2- Describe the issue</Text>
        <Text className='font-outfit-bold text-2xl'>3- Submit</Text>
      </View>
      <View className="bg-white border w-[300px] h-fit rounded-md">
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setcategory(itemValue)}>
          <Picker.Item label="Select Category" value="" enabled={false} />
          {["Ngo","Resource","Others"].map((cat, index) => (
            <Picker.Item key={index} label={cat} value={cat} />
          ))}
        </Picker>
      </View>
      <TextInput  onContentSizeChange={(event) =>
        setHeight(event.nativeEvent.contentSize.height)
      }  style={[{ height: Math.max(50, height) }]} multiline={true} value={description} onChangeText={setdescription} className='bg-white border w-[300px] rounded-md px-3 pt-2' placeholder='Enter Decsription'></TextInput>
      <Pressable className='px-5 py-3 bg-black rounded-md' onPress={handleSubmit}> 
        <Text className=' text-white font-outfit-bold text-xl'>Submit</Text>
      </Pressable>
    </View>
  )
}

export default Issue