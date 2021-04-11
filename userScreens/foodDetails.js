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

export default function FoodDetails ({ navigation, route }) {
    const { storeKey } = route.params;
    const { menuKey } = route.params;
    const { foodItemKey } = route.params;
    const { basePrice } = route.params;
    const { foodName } = route.params; 

    const [foodDetailList, setFoodDetailList] = useState([]);
    const [loading, setLoading] = useState(true);

    const db = firebase.firestore();

    useEffect(() => {
        const data = db
            .collection("EatingPlaces")
            .doc(storeKey)
            .collection("Stores")
            .doc(menuKey)
            .collection("FoodItems")
            .doc(foodItemKey)
            .collection("FoodDetails")
            .onSnapshot((querySnapshot) => {
                const intFoodDetailList = [];
        
                querySnapshot.forEach((documentSnapshot) => {
                  intFoodDetailList.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                    Quantity : 0
                  });
                });stapugitgit 
                setFoodDetailList(intFoodDetailList)
                //console.log("Testing food Details:")
                //console.log(foodDetailList)
                setLoading(false);
            });
            return () => data();
          }, []);

    if (loading) {
        return <ActivityIndicator />;
    }
    
    const decreaseQuantity = (itemKey) => {
        var newList = foodDetailList.map((item) => {
            if (item.key == itemKey && item.Quantity > 0) {
                return ({
                    ItemName: item.ItemName,
                    Price: item.Price,
                    Quantity: item.Quantity - 1,
                    key: item.key
                })
            } else {
                return item
            }
        })
        setFoodDetailList(newList)
        //console.log(foodDetailList)
    };

    const increaseQuantity = (itemKey) => {
        var newList = foodDetailList.map((item) => {
            if (item.key == itemKey) {
                return ({
                    ItemName: item.ItemName,
                    Price: item.Price,
                    Quantity: item.Quantity + 1,
                    key: item.key
                })
            } else {
                return item
            }
        })
        setFoodDetailList(newList)
        //console.log(foodDetailList)
    };

    const getTotalPrice = () => {
        var intBasePrice = basePrice;
        var intAddPrice = foodDetailList
            .map((item) => item.Quantity * item.Price)
            .reduce( (a,b) => a+b);
        //console.log("base price:" + intBasePrice);
        //console.log("added price:" + intAddPrice);
        return (intBasePrice + intAddPrice)
    }

    return (
        <View style={styles.container}>
            <View style = { styles.originalItem }>  
                <Text style = { styles.originalItemText }> { foodName + ' $' + basePrice  }</Text>
            </View>            
            <FlatList
                data={foodDetailList}
                renderItem={({ item }) => (
                    
                <View style = { styles.addOnsContainer }>
                    <View style = { styles.addOnsItemContainer }> 
                        <Text style = { styles.addOnsText }>
                            { item.ItemName + "\n $" + item.Price }
                        </Text>
                    </View>

                    <View style = { styles.quantityContainer }>
                        <TouchableOpacity onPress = {() => decreaseQuantity(item.key)}>
                            <View style = {styles.icon}> 
                                <MaterialIcons
                                    name = 'remove'
                                    size = {25}
                                />
                            </View>
                        </TouchableOpacity>

                        <Text style = { styles.quantityText }> { item.Quantity } </Text>

                        <TouchableOpacity onPress = {() => increaseQuantity(item.key)}>  
                            <View style = { styles.icon }> 
                                <MaterialIcons
                                    name = 'add'
                                    size = {25}
                                />
                            </View>
                        </TouchableOpacity>
                    </View> 
                </View>
                )}
            />

            <FlatButton
                styleInput={buttonStyle}
                text={'Proceed to Cart'}
                onPress={() => {
                    var newTotalPrice = getTotalPrice();
                    console.log("total price:" + newTotalPrice);
                    navigation.navigate("Cart", {
                        checkOutPrice: newTotalPrice,
                        orderList: foodDetailList,
                        storeKey: storeKey, 
                        menuKey : menuKey, 
                        foodName: foodName,
                        foodItemKey : foodItemKey,
                        completed : false,
                        timeSubmitted : firebase.firestore.FieldValue.serverTimestamp()
                    });
                }}
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
    addOnsContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        alignContent:'center',
        padding: 16,
        alignItems:'center'
    },
    addOnsItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        justifyContent:'center'
    },
    originalItem: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 50,
        flexDirection: 'row'
    },
    addOnsText: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        textAlign: 'center',
        fontSize: 17
    },
    quantityText: {
        flexDirection: 'row',
        textAlign:'center',
        fontSize: 18
    },
    originalItemText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#f01d71',
        fontWeight:'bold'
    }
  });
  
  const buttonStyle = StyleSheet.create({
    button: {
      borderRadius: 8,
      marginVertical: 1,
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: "pink",

    },
    buttonText: {
      color: "black",
      fontSize: 18,
      textAlign: "center",
      fontWeight: 'bold',
      marginVertical: 8,
      marginHorizontal: 8
    },
  });
