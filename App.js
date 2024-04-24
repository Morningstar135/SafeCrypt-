import { StyleSheet, Text, View } from "react-native";
import Encrypt from "./Components/Encrypt";
import Decrypt from "./Components/Decrypt";


export default function App() {
 
  return (
          <Encrypt />
          //<Decrypt />
     
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
