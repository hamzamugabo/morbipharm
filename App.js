import React,  { useState, useEffect }from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import SplashScreen from 'react-native-splash-screen';
import Login from "./src/auth/Login";
// import Logout from "./src/auth/Logout";
import Register from "./src/auth/Register";
import Home from './src/Home';
// import Land from './src/Land';
// import Building from './src/Building';
import Settings from './src/Settings';
import AddProduct from './src/AddProduct';
// import MakePayments from './src/MakePayment';
import SignOut from './src/auth/SignOut';
import Main from './src/Main';
import Cart from './src/Cart';




const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="Settings" component={Settings} />
     <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="SignOut" component={SignOut} /> 
    <Stack.Screen name="Main" component={Main} /> 
    <Stack.Screen name="Cart" component={Cart} /> 

       {/* <Stack.Screen name="Land" component={Land} />
      <Stack.Screen name="Building" component={Building} />
      <Stack.Screen name="SignUp" component={Logout} />
      <Stack.Screen name="AddBuilding" component={Building} />
      <Stack.Screen name="Logout" component={Logout} /> */}
      <Stack.Screen name="Register" component={Register} />
      {/* <Stack.Screen name="MakePayments" component={MakePayments} />
      <Stack.Screen name="SignOut" component={SignOut} /> */}
      {/* <Stack.Screen name="SignOut" component={SignOut} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Edit" component={Edit} /> */}
    </Stack.Navigator>
  );
}
export default function App() {
  // componentDidMount() {
  //   SplashScreen.hide()
  // }
  // useEffect(() => {
  //   SplashScreen.hide()

  // });
  return (
    <NavigationContainer>
      {/* <MyTabs /> */}
      <MyStack />
    </NavigationContainer>
  );
}
