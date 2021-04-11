import React, { useState } from "react";
import { TouchableOpacity, Text, View,StyleSheet } from "react-native";

export default function CartItem({ handleChange, itemName, price }) {

  const [count,setCount] = useState(0)
  const handleDecrease = () => {
    setCount(count - 1);
    handleChange(itemName, price, count);
  }
  const handleIncrease = () => {
    setCount(count + 1);
  }
  return (
    <View style={styles.cartItem}>
      <View style={styles.leftStyle}>      
        <TouchableOpacity onPress={handleDecrease}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text>{count.toString()}</Text>
        <TouchableOpacity onPress={handleIncrease}>
          <Text>+</Text>
        </TouchableOpacity>
        <Text>{" " + itemName }</Text>
      </View>
      <View style={styles.rightStyle}>
        <Text>{"$"+price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "column",
  },
  leftStyle: {
    justifyContent: 'flex-start',
  },
  rightStyle: {
    justifyContent: 'flex-end',
  }
})
