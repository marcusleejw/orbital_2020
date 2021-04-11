import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MerchantSelectionPage from '../merchantScreens/merchantSelectionPage';
import OrderPage from '../merchantScreens/orderPage';
import AddFoodItem from '../merchantScreens/addFoodItem';
import AddFoodDetail from '../merchantScreens/addFoodDetail';
import MerchantLogout from '../merchantScreens/merchantLogout';
import MerchantLogin from '../merchantScreens/merchantLogIn';
import MerchantRegister from '../merchantScreens/merchantRegister';

const Stack = createStackNavigator();

export default function MerchantStack() {
  return (
    <Stack.Navigator
      initialRouteName="MerchantStack"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#f01d71",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MerchantLogin"
        component={MerchantLogin}
      />
      <Stack.Screen
        name="MerchantRegister"
        component={MerchantRegister}
      /> 

      <Stack.Screen
        name="MerchantSelectionPage"
        component={MerchantSelectionPage}
      />

      <Stack.Screen
        name="OrderPage"
        component={OrderPage}
      />

      <Stack.Screen
        name="AddFoodItem"
        component={AddFoodItem}
      />

      <Stack.Screen
        name="AddFoodDetail"
        component={AddFoodDetail}
      />

      <Stack.Screen 
        name = "MerchantLogout"
        component = {MerchantLogout}
      />
    </Stack.Navigator>
  );
}
