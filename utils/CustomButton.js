import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomButton = (props) => {
  return (
    <View>
        <Pressable
      style={({ pressed }) => [
        {
          height: props.height?props.height:35,
          width: props.width?props.width:'60%',
          backgroundColor:pressed?props.btnEffectColor:props.btnColor,
          borderColor:props.borderColor?props.borderColor:'gray'
        },
        
        styles.buttonContainer,
      ]}
      onPress={props.onPress?props.onPress:console.log('nothing')}
    >
      <Text style={{ color:props.titleColor }}>{props.title}</Text>
    </Pressable>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        marginBottom:20
      },
})