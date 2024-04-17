import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../utils/CustomButton";

const HomePage = ({ navigation }) => {
  const goTOEncrypt = () => {
    navigation.navigate("Encrypt");
  };
  const goTODecrypt = () => {
    navigation.navigate("Decrypt");
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Welcome to SafeCrypt</Text>
        </View>
        <View style={styles.description}>
          <Text>
            In an era marked by increasing digital threats and privacy concerns
            SafeCrypt stands as a trusted ally in the ongoing battle to safe
            guard personal and proffesional information
          </Text>
        </View>
        <CustomButton
          btnColor={"black"}
          btnEftColor={"gray"}
          title={"Encrypt"}
          titleColor={"white"}
          onPress={goTOEncrypt}
          width ={170}
        />
        <CustomButton
          btnColor={"white"}
          btnEftColor={"gray"}
          title={"Decrypt"}
          titleColor={"black"}
          onPress={goTODecrypt}
          borderColor={"green"}
          width ={170}
        />
      </View>
    </View>
  );
};

export default HomePage;

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
  description: {
    textAlign: 'center',
    fontSize: 18,
    color: 'lightgrey',
    marginBottom:18
     // Custom color for description text
  }
});
