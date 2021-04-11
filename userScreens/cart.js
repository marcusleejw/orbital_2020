import React,{ useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    } from "react-native";
import firebase from "../database/Firebase";
import FlatButton from "../shared/button";
import { MaterialIcons } from '@expo/vector-icons';

export default function Cart( {route, navigation}) {
  const {checkOutPrice} = route.params;
  const { storeKey } = route.params;
  const { menuKey } = route.params;
  const { foodName } = route.params;
  const { foodItemKey } = route.params;
  const { orderList } = route.params;
  const { completed } = route.params;
  const { timeSubmitted } = route.params;
  const [loading, setLoading] = useState(true);
  const [queueID, setQueueID] = useState("");
  const db = firebase.firestore();

  useEffect(() => {
    var orderCollection = db.collection("EatingPlaces")
      .doc(storeKey)
      .collection("Stores")
      .doc(menuKey)
      .collection("Orders");

    orderCollection
      .add({
        timeSubmitted: timeSubmitted,
        checkOutPrice: checkOutPrice,
        foodName: foodName,
        foodItemKey: foodItemKey,
        orderList: orderList,
        completed: completed,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setQueueID(docRef.id.substring(16,20))
        orderCollection
          .doc(docRef.id)
          .update(
            {QueueNumber: docRef.id.substring(16,20)}
          )
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    console.log("done uploading");
    console.log(orderList);
    setLoading(false);
  },[]);

  if (loading) {
    return <ActivityIndicator />;
}

    return (
        <View style = {styles.container}>
            <Text style = { styles.paymentText }>{'Total Price: $' + checkOutPrice} </Text>
            <FlatButton
                styleInput={buttonStyle}
                text={'Proceed to Pay!'}
                onPress={() => {
                    navigation.navigate("CheckQueueNo", {
                      QueueNo:queueID
                    });
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 50,
      backgroundColor: "#fff",
    },
    divideSides: {
      flexDirection: "row",
      display: "flex",
      justifyContent: "space-evenly",
      padding: 50,
      backgroundColor: "#fff",
    },
    paymentText: {
      textAlign:'center',
      fontSize:25,
      color:'#f01d71'
    }
  });
  
  const buttonStyle = StyleSheet.create({
    button: {
      borderRadius: 8,
      marginVertical: 1,
      backgroundColor: "pink",
      marginBottom: 5,
      marginTop: 15,
      paddingVertical:10
      
    },
    buttonText: {
      color: "black",
      fontSize: 18,
      textAlign: "center",
      marginVertical: 8,
      marginHorizontal: 8,
      fontWeight: 'bold'
    },
  });