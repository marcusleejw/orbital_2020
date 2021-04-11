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

export default function StoreMenu({ route, navigation }) {
  const { storeKey } = route.params;
  const { menuKey } = route.params;
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const db = firebase.firestore();
  
  useEffect(() => {
    const data = db
      .collection("EatingPlaces")
      .doc(storeKey)
      .collection("Stores")
      .doc(menuKey)
      .collection("FoodItems")
      .onSnapshot((querySnapshot) => {
        const intMenuList = [];

        querySnapshot.forEach((documentSnapshot) => {
          intMenuList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setMenuList(intMenuList);
        setLoading(false);
      });
    return () => data();
  }, []);

  // testing retrieval of data
  //console.log(menuList);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style = { styles.headerText }>
        What do you feel eating today?
      </Text>
      <FlatList
        data={menuList}
        renderItem={({ item }) => (
          <FlatButton
            styleInput={buttonStyle}
            text={
              item.ItemName +
              " \n Price: $" +
              item.Price
            }
            onPress={() => navigation.navigate("FoodDetails", 
                {storeKey: storeKey, menuKey : menuKey, foodItemKey : item.key, basePrice : item.Price, foodName: item.ItemName})}
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