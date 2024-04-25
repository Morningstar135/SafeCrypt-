import { Alert, StyleSheet, Text, TextInput, View ,Clipboard} from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../utils/CustomButton';
import * as DocumentPicker from "expo-document-picker";
import * as fs from 'expo-file-system';
import CryptoJS from 'crypto-js';

const Decrypt = () => {
  const [inputText, setInputText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [key,setKey] = useState("")
  const [selectedFile,setSelectedFile] =useState(null)
  const onChangeText=(text)=>{
      setInputText(text)
  }
  const onCopy=()=>{
    Clipboard.setString(decryptedText)
    Alert.alert('Copied','Decrypted Message Copied to ClipBoard')
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
  const decrypt= async() => {   
    if(selectedFile){
      const fileContent = await fileSystem.readAsStringAsync(selectedFile.assets[0].uri)
      Alert.alert("Decryption Successful","Successfully Decrypted Your File")
            return
    }else{
        if(inputText!=""){
          let encry =""
          for (let i = 0; i < inputText.length; i++) {
            encry += String.fromCharCode(inputText.charCodeAt(i) ^ key.charCodeAt(i % key.length));
          }
            console.log('====================================');
            console.log(inputText,key);
            console.log('====================================');
           
            setDecryptedText(encry)
            console.log('====================================');
            console.log(encry);
            console.log('====================================');
            Alert.alert("Decryption Successful","Successfully Decrypted Your Text")
            

        
          console.log('====================================');
          console.log(error);
          console.log('====================================');
        
        }
        else{
          Alert.alert("Enter a Value","Cannot Encrypt a Empty Value")
        }
    }
    
      
    
  };
  return (
    <View  style={styles.container}>
      <View style={styles.contentContainer}>
      <View style={styles.heading}>
      <Text style={styles.headingText}>Decrypt</Text>
      </View>
      <TextInput 
          placeholder='Decrypt Text'
          value={inputText}
          multiline={true}
          onChangeText={(text)=>onChangeText(text)}
          style={{borderColor:'gray',borderWidth:.2,marginBottom:18,width:250,textAlign:'center'}}
        />
        <CustomButton btnColor={'black'} btnEftColor={'white'} width={180} title={' Select File to Decrypt'} titleColor={'white'} onPress={pickFile} />
        <TextInput 
          placeholder='Enter Key'
          value={key}
          multiline={true}
          onChangeText={(text)=>setKey(text)}
          style={{borderColor:'gray',borderWidth:.2,marginBottom:18,width:250,textAlign:'center'}}
        />
        <CustomButton btnColor={'white'} btnEftColor={'black'} width={180} title={'Decrypt'} titleColor={'black'} onPress={decrypt} />
        <TextInput
          placeholder='Decrypted Message will be shown Here'
          multiline={true}
          style={{borderColor:'gray',borderWidth:.2,marginBottom:18,width:250,textAlign:'center'}}
        />
         <CustomButton btnColor={'blue'} btnEftColor={'gray'} width={130} title={'Copy'} titleColor={'white'} onPress={onCopy} />
        
       
      </View>
      
    </View>
  )
}


export default Decrypt

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