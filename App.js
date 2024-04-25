import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from "react-native";
import Encrypt from "./Components/Encrypt";
import Decrypt from "./Components/Decrypt";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
 const Stack = createNativeStackNavigator();
  return (
   <NavigationContainer >
   <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
   <Stack.Screen name="Encrypt" component={Encrypt}/>
   <Stack.Screen name="Decrypt" component={Decrypt} />
      </Stack.Navigator>
   </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
