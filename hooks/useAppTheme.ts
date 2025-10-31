// useAppTheme.ts
import { useTheme } from "@react-navigation/native";
import { theme, AppTheme } from "../components/styled/theme";
import { useColorScheme } from "react-native";

export function useAppTheme(): AppTheme {
  const scheme = useColorScheme();
  const navTheme = useTheme();

  const mode = scheme === "dark" ? "dark" : "light";

  return {
    ...navTheme,
    colors: theme[mode].colors,
    typography: theme.typography,
  };
}
