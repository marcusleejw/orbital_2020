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
import FlatButton from "../shared/button";

export default function LogIn({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/EatWhere_Updated.png")}
        style={styles.companyLogo}
      />
      <Text style = { styles.mainPageText }>Are you a: </Text>
      <FlatButton
        styleInput={buttonStyle}
        text={"Merchant"}
        onPress={() => navigation.navigate("MerchantStack")}
      />
      <FlatButton
        styleInput={buttonStyle}
        text={"User"}
        onPress={() => navigation.navigate("UserStack")}
      />
    </View>
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
  mainPageText: {
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
const buttonStyle = StyleSheet.create({
  button: {
    borderRadius: 8,
    marginVertical: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "pink",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

