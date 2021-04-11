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

export default function merchantLogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const merchantLogin = () => {
    if (email === "" && password === "") {
      Alert.alert("Enter details to log in!");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          console.log("Merchant logged-in successfully!");
        })
        .catch((error) => {
          setErrorMessage("Wrong log in details. Please try again.");
          setEmail("");
          setPassword("");
        });
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("user logged in");
          navigation.navigate("MerchantSelectionPage", {
            displayName: user.displayName,
            email: user.email,
            placeName: user.placeName,
            placeID: user.placeID,
            storeName: user.storeName,
            storeID: user.storeID
          });
        } else {
          console.log("error signing in, debug!")
        }
      })
    }
  };

  const devLogin = () => {
    navigation.navigate("MerchantSelectionPage");
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
          placeholder="Email"
          onChangeText={(val) => {
            setEmail(val);
          }}
          value={email}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          onChangeText={(val) => setPassword(val)}
          maxLength={15}
          secureTextEntry={true}
          value={password}
        />
        <FlatButton 
          styleInput = {buttonStyle}
          text = {'Login'}
          onPress = {() => merchantLogin()}
        />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <Text
          style={styles.registerText}
          onPress={() => navigation.navigate("MerchantRegister")}
        >
          Don't have account? Click here to Register
        </Text>
        {/* <Button
          color="#f01d71"
          title="     Developer Testing (Merchant)     "
          onPress={() => devLogin()}
        /> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 10,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  registerText: {
    color: "#f01d71",
    marginTop: 10,
    textAlign: "center",
  },
  logInText: {
    color: "#f01d71",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
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
  verticalStyle: {
    flexDirection: "column",
  },
  horizontalStyle: {
    flexDirection: "row",
  },
  errorMessage: {
    color: "red",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
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
