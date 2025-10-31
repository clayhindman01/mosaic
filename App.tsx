import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { theme, ThemeType } from './components/styled/theme';

export default function App() {

  // const scheme = useColorScheme();
  const scheme = "dark"

  const lightNavigationTheme: ThemeType = {
  ...DefaultTheme,
colors: {
    ...DefaultTheme.colors,
    primary: theme.light.colors.primary,
    text: theme.light.colors.text,
    secondary: theme.light.colors.secondary,
    third: theme.light.colors.third,
    buttonColor: theme.light.colors.buttonColor,
    secondaryButton: theme.light.colors.secondaryButton,
  }, 
};

const darkNavigationTheme: ThemeType = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: theme.dark.colors.primary,
    text: theme.dark.colors.text,
    secondary: theme.dark.colors.secondary,
    third: theme.dark.colors.third,
    buttonColor: theme.dark.colors.buttonColor,
    secondaryButton: theme.dark.colors.secondaryButton,
  },
};

  return (
    <NavigationContainer theme={scheme === "dark" ? darkNavigationTheme : lightNavigationTheme}>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
