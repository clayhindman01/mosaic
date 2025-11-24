import { KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { theme } from './components/styled/theme';
import { userContext } from './services/userContext';
import { useState } from 'react';
import { UserType } from './types/UserType';

export default function App() {
  const [ user, setUser ] = useState<UserType>();
  const scheme = useColorScheme();
  console.log(user)

  return (
    <userContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={user?.theme == "dark" ? theme.dark : theme.light}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </KeyboardAvoidingView>
      </NavigationContainer>
    </userContext.Provider>
  );
}
