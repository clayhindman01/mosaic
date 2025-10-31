import { DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";

export const lightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#fafafa",
    secondary: "#ebecf2",
    third: "#d2d3db",
    buttonColor: "#484b6a",
    secondaryButton: "#9394a5",
    text: "#0a0a0a",
    none: "transparent",
  },
  fonts: {},
};

export const darkTheme: Theme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: "#0a0a0a",
    secondary: "#1c1c1c",
    third: "#1a1818",
    buttonColor: "#307a59",
    secondaryButton: "#2a2a2a",
    text: "white",
    none: "transparent",
  },
  fonts: {},
};

export const typography = {
  h1: { fontSize: 32, fontWeight: "700" },
  h2: { fontSize: 24, fontWeight: "600" },
  h3: { fontSize: 20, fontWeight: "500" },
  body: { fontSize: 16, fontWeight: "400" },
  caption: { fontSize: 12, fontWeight: "400" },
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
  typography,
};

export type AppTheme = typeof theme.light & { typography: typeof typography };
