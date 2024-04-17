import { Alert, StyleSheet, Text, TextInput, View ,Clipboard} from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../utils/CustomButton';
import DocumentPicker from "expo-document-picker";
import RNFS from 'expo-file-system' 

const Decrypt = () => {
  const [inputText, setInputText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
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
     if (selectedFile&&inputText) {
      Alert.alert('Empty Value',"Please Give one value to decrypt")
    } else {
      if (selectedFile) {
        const fileData =await RNFS.readAsStringAsync(selectedFile.uri,{encoding:RNFS.EncodingType.Base64})
        const encrypted =CryptoJS.AES.decrypt(fileData,130502).toString(CryptoJS.enc.Utf8)
        const newFilePath = await RNFS.documentDirectory+`${selectedFile.name}-decrypted`
        await RNFS.writeAsStringAsync(newFilePath,encrypted,{encoding:RNFS.EncodingType.Base64})
        Alert.alert('Success','Decrypted File Saved in  your Gallery')  
      } else {
        if(inputText==''){
          Alert.alert("Bruhhhh!!","I can't Decrypt a Empty Value")
        }
        else{
          try {
            var decrypted = CryptoJS.AES.decrypt(inputText,'12345').toString(CryptoJS.enc.Utf8)
            setDecryptedText(decrypted);
            setInputText('')
        } catch (error) {
          console.error(error);
        }
            
        }
      
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