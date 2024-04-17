import {StyleSheet,Clipboard ,Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../utils/CustomButton'
import CryptoJS from 'crypto-js';
import  DocumentPicker from "expo-document-picker";
import RNFS from 'expo-file-system'

const Encrypt = () => {
  const [inputText, setInputText] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [selectedFile,setSelectedFile] =useState(null)
  const onChangeText=(text)=>{
      setInputText(text)
  }
  const onCopy=()=>{
    Clipboard.setString(encrypted)
    Alert.alert('Copied','Encrypted Message Copied to ClipBoard')
  }
  const encrypt = async() => {
     if(selectedFile && inputText){
         Alert.alert('Please Give one Input at a Time')
     }
     else{
      try {
        if(selectedFile){
          const fileData =await RNFS.readAsStringAsync(selectedFile.uri,{encoding:RNFS.EncodingType.Base64})
          const encrypted =CryptoJS.AES.encrypt(fileData,130502).toString()
          const newFilePath = await RNFS.documentDirectory+`${selectedFile.name}-encrypted`
          await RNFS.writeAsStringAsync(newFilePath,encrypted,{encoding:RNFS.EncodingType.Base64})
          Alert.alert('Success','Encrypted File Saved in  your Gallery')       
      }
      else{
          if(inputText==''){
        Alert.alert("Bruhhhh!!","I can't encrypt a Empty Value")
      }
      else{
        try {
          var encrypted = CryptoJS.AES.decrypt(inputText,'13may').toString()
          setEncrypted(encrypted);
          setInputText('')
      } catch (error) {
        console.error(error);
      }
     
      }
      }
      } catch (error) {
        console.log(error)
      }
       
     }
    }
  const pickFile=async()=>{
     try {
      const res= await DocumentPicker.pick({
        type:[DocumentPicker.types.allFiles]
      })
      setSelectedFile(res)
    } catch (error) {
      console.warn('Error Uploading File');
    } 
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.heading}>
        <Text style={styles.headingText}>Encrypt</Text>
        </View>
      
        <TextInput 
          placeholder='Enter the Text to Encrypt'
          value={inputText}
          multiline={true}
          numberOfLines={7}
          onChangeText={(text)=>onChangeText(text)}
          style={{borderColor:'gray',borderWidth:.2,marginBottom:18,width:250,textAlign:'center'}}
        />
        <CustomButton btnColor={'black'} btnEftColor={'gray'} width ={170} title={'Encrypt File'} titleColor={'white'} onPress={pickFile}  />
        {
          selectedFile&&(
            <Text>File Name : {selectedFile.name}</Text>
          )
        }
        <CustomButton btnColor={'white'} btnEftColor={'black'} width ={170} title={'Encrypt Text'} titleColor={'black'} onPress={encrypt} />
        <TextInput 
          placeholder='Encrypted Message will be shown Here'
          multiline={true}
          numberOfLines={7}
          style={{borderColor:'gray',borderWidth:.2,marginBottom:18,width:250,textAlign:'center'}}
        />
         <CustomButton btnColor={'blue'} btnEftColor={'gray'} title={'Copy'} width={130} titleColor={'white'} onPress={onCopy} />
      </View>
    </View>
  )
}

export default Encrypt

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Background color set to black
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Transparent background with white color
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  heading: {
    backgroundColor: 'white', // White background for the heading
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  headingText: {
    color: 'black', // Black text color for the heading
    fontSize: 24,
    fontWeight: 'bold',
  },
})