import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import firebase from "../database/Firebase";
import FlatButton from "../shared/button";

export default function EatingPlaceOption({ navigation }) {
  const [placeList, setPlaceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = firebase.firestore();

  useEffect(() => {
    const data = db
      .collection("EatingPlaces")
      .onSnapshot((querySnapshot) => {
      const intPlaceList = [];

      querySnapshot.forEach((documentSnapshot) => {
        intPlaceList.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setPlaceList(intPlaceList);
      setLoading(false);
    });
    return () => data();
  }, []);

  // testing retrieval of data
  //console.log(placeList);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style = { styles.headerText }>
        Choose your eating place:
      </Text>
      <FlatList
        data={placeList}
        renderItem={({ item }) => (
          <FlatButton
            styleInput={buttonStyle}
            text={
              item.PlaceName +
              " \n " +
              " \n Average Wait Time: " +
              " \n " +
              item.AverageWT +
              " minutes"
            }
            onPress={() =>
              navigation.navigate("StoreOption", { storeKey: item.key })
            }
          />
        )}
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
  headerText: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    color: '#f01d71',
    paddingBottom: 10
  }
});

const buttonStyle = StyleSheet.create({
  button: {
    borderRadius: 8,
    marginVertical: 1,
    backgroundColor: "pink",
    marginTop:5,
    marginBottom: 5
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 8,
    marginHorizontal: 8
  },
});
