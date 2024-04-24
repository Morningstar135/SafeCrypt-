import {StyleSheet,Clipboard ,Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../utils/CustomButton'
import {SecureStore} from "expo-secure-store"
import *  as DocumentPicker from "expo-document-picker"
import * as fileSystem from 'expo-file-system'
import CryptoJS from 'crypto-js';

const Encrypt = () => {
  const [inputText, setInputText] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [selectedFile,setSelectedFile] =useState(null)
  const [keyy,setKeyy] = useState("")
  const onChangeText=(text)=>{
      setInputText(text)
  }
  const onCopy=()=>{
    Clipboard.setString(encrypted)
    Alert.alert('Copied','Encrypted Message Copied to ClipBoard')
  }
  const encrypt = async() => {
        if(selectedFile){
          const fileContent = await fileSystem.readAsStringAsync(selectedFile.assets[0].uri)
          let encodedF =CryptoJS.AES.encrypt(fileContent)
          setEncrypted(encodedF)
          console.log('====================================');
                Alert.alert("Encryption Successful","Successfully Encrypted Your File")
                return
        }else{
            if(inputText!=""){
              let encry =""
              for (let i = 0; i < inputText.length; i++) {
                encry += String.fromCharCode(inputText.charCodeAt(i) ^ keyy.charCodeAt(i % keyy.length));
              }
                console.log('====================================');
                console.log(inputText,keyy);
                console.log('====================================');
               
                setEncrypted(encry)
                Alert.alert("Encryption Successful","Successfully Encrypted Your Text")
                
    
            
              console.log('====================================');
              console.log(error);
              console.log('====================================');
            
            }
            else{
              Alert.alert("Enter a Value","Cannot Encrypt a Empty Value")
            }
        }
        
          
     
      }
  const pickFile=async()=>{
     try {
      const file = await DocumentPicker.getDocumentAsync({
        type:"*/*"
      })
      setSelectedFile(file)
    } catch (error) {
      console.error(error);
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
         <TextInput 
          placeholder='Enter the Key to Encrypt'
          value={keyy}
          onChangeText={(text)=>setKeyy(text)}
          style={{borderColor:'gray',borderWidth:.2,marginBottom:18,width:250,textAlign:'center'}}
        />
        <CustomButton btnColor={'black'} btnEftColor={'gray'} width ={170} title={'Encrypt File'} titleColor={'white'} onPress={pickFile}  />
        {
          selectedFile&&(
            <Text>File Name : {selectedFile.assets[0].name}</Text>
          )
        }
        <CustomButton btnColor={'white'} btnEftColor={'black'} width ={170} title={'Encrypt Text'} titleColor={'black'} onPress={encrypt} />
        <TextInput 
          placeholder='Encrypted Message will be shown Here'
          multiline={true}
          numberOfLines={7}
          style={{borderColor:'gray',borderWidth:.2,marginBottom:18,width:250,textAlign:'center'}}
          value={encrypted}
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