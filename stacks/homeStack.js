import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Header from '../shared/header';
import MainPage from '../sharedScreens/mainPage';
// import Register from "../sharedScreens/register";
import UserStack from "./userStack";
import MerchantStack from "./merchantStack";
// import MerchantRegister from "../merchantScreens/merchantRegister";
// import UserRegister from "../userScreens/userRegister";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main Page"
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f01d71",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Main Page"
          component={MainPage}
        />
        {/* <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        /> */}
        
        <Stack.Screen
          name="UserStack"
          component={UserStack}
        />

        <Stack.Screen
          name="MerchantStack"
          component={MerchantStack}
          options={{
            headerTitle: () => <Header title="Welcome to EatWhere!" />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
