import { useColorScheme } from 'react-native';
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

  return (
    <userContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={scheme === "dark" ? theme.dark : theme.light}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </userContext.Provider>
  );
}
