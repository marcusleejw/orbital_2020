import React,{ useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    } from "react-native";
import FlatButton from "../shared/button";

export default function CheckQueueNo({ navigation, route }) {
  const { QueueNo } = route.params;
  return (
    <View style = {styles.container}>
      <Text style = { styles.queuenumberText }> 
        {"Your Queue Number is:" +
        '\n' +
        QueueNo}
      </Text>
      <FlatButton
                styleInput={buttonStyle}
                text={'Return to Homepage'}
                onPress={() => {
                    navigation.navigate("UserSelectionPage");
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
  queuenumberText: {
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
    marginTop: 50,
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