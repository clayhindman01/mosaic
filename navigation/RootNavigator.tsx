import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackNavigationOptions, NativeStackNavigationProp } from "@react-navigation/native-stack";
import HomeScreen from "../components/pages/Home/HomeScreen";
import SearchScreen from "../components/pages/Search/SearchScreen";
import MosaicScreen from "../components/pages/MosaicScreen";
import AccountScreen from "../components/pages/Account/AccountScreen";
import CollectiveScreen from "../components/pages/CollectiveScreen";
import { UserType } from "../types/UserType";
import LoginScreen from "../components/pages/Login/LoginScreen";
import SignupScreen from "../components/pages/Signup/SignupScreen";
import { useEffect, useState } from "react";
import { RouteNameTypes } from "./RouteName";
import { ActivityIndicator } from "react-native";
import StyledView from "../components/styled/styledView";
import { getAuth } from "firebase/auth";
import { queryDBUserByFirebaseUID } from "../services/server/users/userApiFunctions";
import { useUserContext } from "../services/userContext";
import AccountMenuScreen from "../components/pages/Account/AccountMenuScreen";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Mosaic: undefined;
  Collective: undefined;
  Account: {user: UserType};
  Login: undefined;
  Signup: undefined;
  AccountMenu: undefined;
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
  const { setUser } = useUserContext();

  useEffect(() => {
    const auth = getAuth();

    const checkAuthState = async () => {
      await auth.authStateReady()
      if (auth.currentUser) {
        setInitialRouteName("Home");
        queryDBUserByFirebaseUID().then((res: any) => {
          setUser(res.data[0]);
          setIsLoading(false);
        })
      } else {
        setInitialRouteName("Login");
        setIsLoading(false)
      }
    }
    checkAuthState();
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
        <Stack.Screen name="AccountMenu" component={AccountMenuScreen} />
    </Stack.Navigator>
  );
}