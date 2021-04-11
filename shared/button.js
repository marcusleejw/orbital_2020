import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

export default function FlatButton({ styleInput, text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styleInput.button}>
        <Text style={styleInput.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
