import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import FlatButton from "../shared/button";

export default function UserSelectionPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Please make a selection:</Text>
      <View style={styles.buttonContainer}>
        <FlatButton
          styleInput={buttonStyle}
          text="Order Food"
          onPress={() => {
            navigation.navigate("OrderFoodStack");
          }}
        />
        {/* <FlatButton
          styleInput={buttonStyle}
          text="Check Queue Number"
          onPress={() => {
            navigation.navigate("CheckQueueNo");
          }}
        /> */}
        <FlatButton
          styleInput={buttonStyle}
          text="Log Out"
          onPress={() => {
            navigation.navigate("UserLogout");
          }}
        />
      </View>
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
  welcomeText: {
    color: "#f01d71",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "column",
    paddingTop: 10,
    justifyContent: "space-between",
  },
});

const buttonStyle = StyleSheet.create({
  button: {
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: "#f01d71",
  },
  buttonText: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
