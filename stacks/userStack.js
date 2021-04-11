import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import UserSelectionPage from '../userScreens/userSelectionPage.js'
import OrderFoodStack from './orderFoodStack';
import CheckQueueNo from '../userScreens/checkQueueNo';
import UserLogin from '../userScreens/userLogin';
import UserRegister from '../userScreens/userRegister';
import UserLogout from '../userScreens/userLogout';
import Header from '../shared/header';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
      <Stack.Navigator
        initialRouteName="UserStack"
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
          name = 'UserLogin'
          component = { UserLogin }
        />

        <Stack.Screen
          name = 'UserRegister'
          component = { UserRegister }
        />
        <Stack.Screen
          name="UserSelectionPage"
          component={UserSelectionPage}
        />

        <Stack.Screen
          name="OrderFoodStack"
          component={OrderFoodStack}
        />

        <Stack.Screen
          name="CheckQueueNo"
          component={CheckQueueNo}
          options={{ headerTitle: () => <Header title="Queue Number Tracking" /> }}
        />

        <Stack.Screen
          name="UserLogout"
          component={UserLogout}
          options={{ headerTitle: () => <Header title="Log Out" /> }}
        />

      </Stack.Navigator>
  );
}
