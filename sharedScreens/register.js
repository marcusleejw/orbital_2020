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

export default function Register({ navigation }) {
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
          navigation.navigate("Login");
        })
        .catch((error) => {
          setErrorMessage("Details invalid. Please try again.");
          setDisplayName("");
          setEmail("");
          setPassword("");
        });
    }
  };

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
        <Button
          color="#f01d71"
          title="Register!"
          onPress={() => registerUser()}
        />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("Login")}
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
    marginTop: 10,
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
    marginLeft: 75,
    backgroundColor: "transparent",
    marginBottom: 30,
  },
  errorMessage: {
    color: "red",
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 0,
    fontSize: 15,
  },
});
