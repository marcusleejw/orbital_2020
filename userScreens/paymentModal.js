import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button
  } from "react-native";
import firebase from "../database/Firebase";
import FlatButton from "../shared/button";


export default function PaymentModal ({ navigation }) {
    return (
        <View style = { styles.container }> 
            <Text> 
                Payment Screen
            </Text>

            <View> 
                <Button 
                onPress = { () => navigation.navigate('UserSelectionPage')}
                title = 'Back to Home'
                color = '#f01d71'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:'center',
        padding: 50,
        backgroundColor: "#fff",
    },
})