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

//Need to redo switch
//Need to do loading screen

export default function LogIn({ navigation }) {
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
          navigation.navigate("MerchantStack");
        })
        .catch((error) => {
          setErrorMessage("Wrong log in details. Please try again.");
          setEmail("");
          setPassword("");
        });
    }
  };

  const userLogin = () => {
    if (email === "" && password === "") {
      Alert.alert("Enter details to log in!");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          console.log("User logged-in successfully!");
          navigation.navigate("UserStack");
        })
        .catch((error) => {
          setErrorMessage('Invalid login credentials. Please try again.');
          setEmail("");
          setPassword("");
        });
    }
  };

  const devUserLogin = () => {
     navigation.navigate("UserStack");
  };

  const devMerchantLogin = () => {
    navigation.navigate("MerchantStack");
  }
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
        <Text style={styles.logInText}>Log in as:</Text>
        <View style={styles.buttonStyle}>
          <Button
            color="#f01d71"
            title="     Merchant     "
            onPress={() => merchantLogin()}
          />
          <Button
            color="#f01d71"
            title="     Consumer     "
            onPress={() => userLogin()}
          />
        </View>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <Text
          style={styles.registerText}
          onPress={() => navigation.navigate("Register")}
        >
          Don't have account? Click here to Register
        </Text>
        <Button
            color="#f01d71"
            title="     Developer Testing (User)    "
            onPress={() => devUserLogin()}
          />

          <Text> 
            
          </Text>
          <Button 
            color="#f01d71"
            title="     Developer Testing (Merchant)    "
            onPress={() => devMerchantLogin()}
          />
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
    marginLeft: 75,
    backgroundColor: "transparent",
    marginBottom: 30,
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
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
