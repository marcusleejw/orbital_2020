import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import firebase from "../database/Firebase";
import FlatButton from '../shared/button';

export default function UserRegister({ navigation }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const registerUser = () => {
    if (email === "" && password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user.updateProfile({
            displayName: displayName,
          });
          console.log("User registered successfully!");
          navigation.navigate("UserLogin");
        })
        .catch((error) => {
          setErrorMessage("Details invalid. Please try again.");
          setDisplayName("");
          setEmail("");
          setPassword("");
        });
    }
  };

  console.log(displayName);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require("../assets/EatWhere_Updated.png")}
          style={styles.companyLogo}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          onChangeText={(val) => setDisplayName(val)}
          value={displayName}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter email"
          onChangeText={(val) => setEmail(val)}
          value={email}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter password"
          onChangeText={(val) => setPassword(val)}
          maxLength={15}
          secureTextEntry={true}
          value={password}
        />
        <FlatButton 
          styleInput = {buttonStyle}
          text = {'Register'}
          onPress = {() => registerUser()}
        />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("UserLogin")}
        >
          Already registered? Click here to login!
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#f01d71",
    marginTop: 0,
    textAlign: "center",
    borderColor: "#f01d71",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  companyLogo: {
    alignItems: "center",
    justifyContent: "center",
    // marginLeft: 75,
    backgroundColor: "transparent",
    // marginBottom: 30,
    alignSelf:'center'
  },
  errorMessage: {
    color: "red",
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 0,
    fontSize: 15,
  },
});

const buttonStyle = StyleSheet.create({
  button: {
    borderRadius: 8,
    marginVertical: 1,
    backgroundColor: "#f01d71",
    marginBottom: 0,
    marginTop: 10,
    paddingVertical:10
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 8,
    marginHorizontal: 8,
    fontWeight: 'bold'
  },
});
