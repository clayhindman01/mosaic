import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack";
import HomeScreen from "../components/pages/HomeScreen";
import SearchScreen from "../components/pages/SearchScreen";
import MosaicScreen from "../components/pages/MosaicScreen";
import AccountScreen from "../components/pages/AccountScreen";
import CollectiveScreen from "../components/pages/CollectiveScreen";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Mosaic: undefined;
  Collective: undefined;
  Account: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "none",
}

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}
    >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} /> 
        <Stack.Screen name="Mosaic" component={MosaicScreen} /> 
        <Stack.Screen name="Collective" component={CollectiveScreen} /> 
        <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
}