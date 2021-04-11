import React from 'react';
import {
  StyleSheet,
  View, 
  Text,
} from 'react-native';

export default function AccountSettings({ navigation }) {
  return (
    <View style = {styles.container}>
      <Text> 
        Screen to update merchant's account particulars 
      </Text>
    </View>  
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: 'center',
      padding: 50,
      backgroundColor: "#fff",
  },
});
