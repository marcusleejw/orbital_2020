import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View, 
  Text,
  ActivityIndicator,
  FlatList
} from 'react-native';
import firebase from '../database/Firebase';
import FlatButton from "../shared/button";

export default function OrderPage({ navigation }) {
      // const { displayName } = route.params;
    // const { email } = route.params;
    // const { placeName } = route.params;
    // const { placeID } = route.params;
    // const { storeName } = route.params; 
    // const { storeID } = route.params; 

    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);

    const db = firebase.firestore();

    // test data for orders 
    //deck placeID = 'PSF9b14g5tfF1DAdISg9'
    // jap storeID = 'GPKYV6zJm8RdEfQFNjhG'

    useEffect(() => {
        const data = db
            .collection("EatingPlaces")
            .doc('PSF9b14g5tfF1DAdISg9') // original: .doc('placeID')
            .collection("Stores")
            .doc('GPKYV6zJm8RdEfQFNjhG') // original: .doc('storeID')
            .collection("Orders")
            .onSnapshot((querySnapshot) => {
                const intOrderList = [];
        
                querySnapshot.forEach((documentSnapshot) => {
                  intOrderList.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                  });
                });
                setOrderList(intOrderList)
                console.log("Testing orderList:")
                console.log(orderList)
                setLoading(false);
            });
            return () => data();
          }, []);

  console.log(orderList);

  if (loading) {
    return <ActivityIndicator />;
  }

  const deleteItem = (itemKey) => {
    db
    .collection("EatingPlaces")
    .doc('PSF9b14g5tfF1DAdISg9') // original: .doc('placeID')
    .collection("Stores")
    .doc('GPKYV6zJm8RdEfQFNjhG') // original: .doc('storeID')
    .collection("Orders")
    .doc(itemKey)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  };

  return (
    <View style =  { styles.container }>
      <Text style = { styles.headerText }>{"Food Orders made: "}</Text>
      <View style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            borderColor: "pink"
            }}
      />
      <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <View style = { styles.orderContainer }>
            <Text style = { styles.orderContent }>{"Queue Number: " + item.QueueNumber}</Text>
            <Text style = { styles.orderContent }>{"Item: " + item.foodName + " $" + item.checkOutPrice }</Text>
            <Text style = { styles.orderContent }>Item Add-ons: </Text>
            {[...item.orderList].map((items) => {
              return (
                <View>
                  <Text style = { styles.orderContent }>{items.ItemName + " x" + items.Quantity}</Text>
                </View>
              )
            })}
            <FlatButton
              styleInput={buttonStyle}
              text="Order Served"
              onPress={() => {deleteItem(item.key);
            }}
        />
            <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
            />
          </View>
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
  orderContainer:{
    textAlign:'center',
    justifyContent:'center',
    paddingVertical:10
  },
  headerText: {
    color: "#f01d71",
    fontWeight:'bold',
    fontSize: 20,
    textAlign:'center'
  },
  orderContent: {
    textAlign:'center',
    fontSize: 16
  }
});

const buttonStyle = StyleSheet.create({
  button: {
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 10,
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
