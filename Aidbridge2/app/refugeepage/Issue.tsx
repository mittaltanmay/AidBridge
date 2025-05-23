import { View, Text, TextInput,StyleSheet, Pressable,Modal } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker' 
import supabase from '../../config/supabaseClient'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Issue = () => {
  const [category,setcategory]=useState('');
  const [description,setdescription]=useState('');
  const [height, setHeight] = useState(0); // Initial height
  const [modalVisible, setModalVisible] = useState(false);
  const handleSubmit = async () => {
    try {
    // Fetch the stored user data from AsyncStorage
    const userDataString = await AsyncStorage.getItem('user');
    if (!userDataString) {
      console.log('Error: User not logged in');
      return;
    }
    console.log(userDataString);
    // Parse the user data to get the user_id
    const userData = JSON.parse(userDataString);
    const ref_id = userData.unhcrid;  
    const { data, error } = await supabase
      .from('Issues')  // Replace 'users' with your table name
      .insert([{ category, description, ref_id }]);

    if (error) {
      console.log(`Error: ${error.message}`);
    } else {
      console.log('Data inserted successfully!');
      setModalVisible(true);
    } }catch(error) {
      console.log(`Unexpected error: ${error}`);
    }
    setcategory('');
    setdescription('');
  };

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
      <Modal
        transparent={true}
        animationType='fade'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-5 rounded-2xl w-[80%] items-center">
            <Text className="font-outfit-bold text-xl mb-3 text-green-600">Your response has been recorded!</Text>
            <Pressable onPress={() => setModalVisible(false)} className="bg-black px-4 py-2 rounded-md">
              <Text className="text-white font-outfit-bold">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Issue