import React,{ useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    } from "react-native";
import firebase from "../database/Firebase";
import FlatButton from "../shared/button";
import { MaterialIcons } from '@expo/vector-icons';

export default function merchantSelectionPage({ navigation }) {   
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Please make a selection:</Text>
      <View style={styles.buttonContainer}>
        <FlatButton 
         styleInput = { buttonStyle }
         text = "Orders"
         onPress = { () => {
           navigation.navigate('OrderPage')
         }}        
        />

        <FlatButton
         styleInput = { buttonStyle }
         text = 'Add Food Items'
         onPress = { () => {
           navigation.navigate('AddFoodItem')
         }}
        />
        
        <FlatButton
         styleInput = { buttonStyle }
         text = 'Log Out'
         onPress = { () => {
           navigation.navigate('MerchantLogout')
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
