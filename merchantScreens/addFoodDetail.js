import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import firebase from "../database/Firebase";
import FlatButton from "../shared/button";
import { MaterialIcons } from '@expo/vector-icons';
import merchantSelectionPage from './merchantSelectionPage';


export default function AddFoodDetail ({ navigation, route }) {
    const { docID } = route.params;
    console.log("Recieved Doc ID: " + docID)

    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");

    const db = firebase.firestore(); 

    const updateItem = (itemNameInput, priceInput) => {
      console.log("ID into function: " + docID)
      var foodItemCollection = db
        .collection("EatingPlaces")
        .doc('PSF9b14g5tfF1DAdISg9') // original: .doc('placeID')
        .collection("Stores")
        .doc('GPKYV6zJm8RdEfQFNjhG') // original: .doc('storeID')
        .collection("FoodItems")
        .doc(docID)
        .collection("FoodDetails")
      
      foodItemCollection
        .add({
          ItemName: itemNameInput,
          Price: Number(priceInput)
        })
        .then((docRef) => {
          console.log("Food Detail document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
        console.log("done uploading");
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Food Add-On Name"
            onChangeText={(val) => {
              setItemName(val);
            }}
            value={itemName}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Add-On Price"
            keyboardType = 'numeric'
            onChangeText={(val) => setPrice(val)}
            value={price}
          />

            <FlatButton 
             styleInput = {buttonStyle}
             text = { 'Update Add-on and Return to Homepage' }
             onPress = {() => {
              updateItem(itemName,price);
              navigation.navigate("MerchantSelectionPage");
            }}
            />
          
            <FlatButton 
             styleInput = { buttonStyle }
             text = { 'Update Add-On and add more Add-Ons'}
             onPress={() => {
              updateItem(itemName,price);
              navigation.navigate('AddFoodDetail',{docID:docID});
            }}
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
      fontSize: 18
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
  });

  const buttonStyle = StyleSheet.create({
  button: {
    borderRadius: 8,
    marginVertical: 1,
    backgroundColor: "pink",
    marginBottom: 5,
    marginTop: 10,
    paddingVertical:10
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 8,
    marginHorizontal: 8,
    fontWeight: 'bold'
  },
});
