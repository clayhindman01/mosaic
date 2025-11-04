import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack";
import HomeScreen from "../components/pages/Home/HomeScreen";
import SearchScreen from "../components/pages/Search/SearchScreen";
import MosaicScreen from "../components/pages/MosaicScreen";
import AccountScreen from "../components/pages/AccountScreen";
import CollectiveScreen from "../components/pages/CollectiveScreen";
import { UserType } from "../types/UserType";
import LoginScreen from "../components/pages/Login/LoginScreen";
import SignupScreen from "../components/pages/Signup/SignupScreen";
import { getFirebaseUser } from "../services/firebase/firebaseFunctions";
import { useEffect, useState } from "react";
import { RouteNameTypes } from "./RouteName";
import { ActivityIndicator } from "react-native";
import StyledView from "../components/styled/styledView";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Mosaic: undefined;
  Collective: undefined;
  Account: {user: UserType};
  Login: undefined;
  Signup: undefined
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "none",
}

export default function RootNavigator() {
  const [ initialRouteName, setInitialRouteName ] = useState<RouteNameTypes>()
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

  useEffect(() => {
    const user = getFirebaseUser();
    console.log(user)
    if (user) {
      setInitialRouteName('Home');
    } else {
      setInitialRouteName("Login");
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <StyledView variant="none">
        <ActivityIndicator />
      </StyledView>
    )
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={screenOptions}
    >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}  
          options={{
            gestureEnabled: false
          }}
        />
        <Stack.Screen name="Search" component={SearchScreen} /> 
        <Stack.Screen name="Mosaic" component={MosaicScreen} /> 
        <Stack.Screen name="Collective" component={CollectiveScreen} /> 
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}