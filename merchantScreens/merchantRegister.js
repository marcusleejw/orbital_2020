import React, { useState, useEffect } from "react";
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
  FlatList
} from "react-native";
import firebase from "../database/Firebase";
import FlatButton from "../shared/button";

export default function MerchantRegister({ navigation }) {
  const [displayName, setDisplayName] = useState("");
  const [placeID, setPlaceID] = useState("");
  const [placeName, setPlaceName] = useState("None");
  const [storeID, setStoreID] = useState("");
  const [storeName, setStoreName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [placeList, setPlaceList] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = firebase.firestore();

  useEffect(() => {
    const data = db.collection("EatingPlaces").onSnapshot((querySnapshot) => {
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

  const registerMerchant = () => {
    if (email === "" && password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      db.collection("EatingPlaces")
        .doc(placeID)
        .collection("Stores")
        .add({
          StoreName: storeName,
          AverageWT: 5
        })
        .then((docRef) => {
          console.log("Document written: " + docRef.id);
          setStoreID(docRef.id)
        })
        .catch((error) => {
          console.error("Error adding document: " + error)
        })
      
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          res.user.updateProfile({
            displayName: displayName,
            placeName: placeName,
            placeID: placeID,
            storeName: storeName,
            storeID: storeID,
          });
          console.log("User registered successfully!");
          navigation.navigate("MerchantLogin");
        })
        .catch((error) => {
          setErrorMessage("Details invalid. Please try again.");
          setDisplayName("");
          setEmail("");
          setPassword("");
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require("../assets/EatWhere_Updated.png")}
          style={styles.companyLogo}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter your name"
          onChangeText={(val) => setDisplayName(val)}
          value={displayName}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter email"
          onChangeText={(val) => setEmail(val)}
          value={email}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter password"
          onChangeText={(val) => setPassword(val)}
          maxLength={15}
          secureTextEntry={true}
          value={password}
        />

        <Text>Place you are selling your food?</Text>
        <FlatList
          data={placeList}
          renderItem={({ item }) => (
            <FlatButton
              styleInput={buttonStyle}
              text={item.PlaceName}
              onPress={() => {
                setPlaceID(item.key);
                setPlaceName(item.PlaceName);
              }}
            />
          )}
        />
        <Text>{"\nPlace selected: " + placeName}</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter Store Name"
          onChangeText={(val) => setStoreName(val)}
          maxLength={30}
          secureTextEntry={true}
          value={storeName}
        />

        <FlatButton 
          styleInput = {buttonStyle}
          text = {'Register'}
          onPress = {() => registerMerchant()}
        />

        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate("MerchantLogin")}
        >
          Already registered? Click here to login!
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#f01d71",
    marginTop: 10,
    textAlign: "center",
    borderColor: "#f01d71",
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
    // marginLeft: 75,
    backgroundColor: "transparent",
    // marginBottom: 30,
    alignSelf:'center'
  },
  errorMessage: {
    color: "red",
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 0,
    fontSize: 15,
  },
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

