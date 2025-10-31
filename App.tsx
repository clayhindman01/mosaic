import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { theme } from './components/styled/theme';

export default function App() {

  // const scheme = useColorScheme();
  const scheme = "dark"

  return (
    <NavigationContainer theme={scheme === "dark" ? theme.dark : theme.light}>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
