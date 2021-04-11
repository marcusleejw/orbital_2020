import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Button 
} from 'react-native';
import firebase from '../database/Firebase';

export default function Logout( { navigation }) {

  const [displayName, setDisplayName] = useState("");
  const [uid, setUID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const signOut = () => {
    firebase.auth().signOut().then(() => {
      navigation.navigate('Login')
    })
    .catch(error => setErrorMessage(errorMessage))
  }
  
  const changeDisplayName = () =>  {
    displayName = firebase.auth().currentUser.displayName
    uid = firebase.auth().currentUser.uid

  }
  return (
    <View style={styles.container}>
      <Text style = {styles.textStyle}>
        Are you sure you want to Logout?
      </Text>
      
      <Button
        color="#f01d71"
        title="Logout"
        onPress={() => signOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});
