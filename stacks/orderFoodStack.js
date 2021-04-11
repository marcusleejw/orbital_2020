import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import EatingPlaceOption from '../userScreens/eatingPlaceOption';
import StoreOption from '../userScreens/storeOption';
import Header from '../shared/header';
import StoreMenu from '../userScreens/storeMenu'
import FoodDetails from '../userScreens/foodDetails';
import Cart from '../userScreens/cart';
import CheckQueueNo from "../userScreens/checkQueueNo";

const Stack = createStackNavigator();

export default function OrderFoodStack() {
  return (
      <Stack.Navigator
        initialRouteName="OrderFoodStack"
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f01d71",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="EatingPlaceOption"
          component={EatingPlaceOption}
          options={{ headerTitle: () => <Header title="Eating Places" /> }}
        />

         <Stack.Screen
          name="StoreOption"
          component={StoreOption}
          options={{ headerTitle: () => <Header title="Stores" /> }}
        />
        
        <Stack.Screen
          name="StoreMenu"
          component={StoreMenu}
          options={{ headerTitle: () => <Header title="Menu" /> }}
        /> 

        <Stack.Screen 
          name = "FoodDetails"
          component = { FoodDetails }
          options={{ headerTitle: () => <Header title="Details" /> }}
        />

        <Stack.Screen 
          name = "Cart"
          component = {Cart}
          options={{ headerTitle: () => <Header title="Cart" /> }}
        />

        <Stack.Screen
          name="CheckQueueNo"
          component={CheckQueueNo}
          options={{ headerTitle: () => <Header title="Queue Number" /> }}
        />

      </Stack.Navigator>
  );
}
