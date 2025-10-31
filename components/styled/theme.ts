import { DefaultTheme } from "@react-navigation/native";
import { TextStyle } from "react-native";

type TypographyVariant = {
  fontSize: number;
  fontWeight: NonNullable<TextStyle["fontWeight"]>; // ensures correct literal types
};

export type ThemeType = {
    colors: {
        primary: string;
        text: string;
        secondary: string;
        third: string;
        buttonColor: string;
        secondaryButton: string;
        background: string;
        card: string;
        border: string;
        notification: string;
    },
    dark: boolean;
    fonts: any
}

export const theme = {
    light: {
        colors: {
            ...DefaultTheme.colors,
            primary: "#fafafa",
            secondary: "#ebecf2",
            third: "#d2d3db",
            buttonColor: "#484b6a",
            secondaryButton: "#9394a5",
            text: "#0a0a0a",
            none: "transparent"
        }
        
    },
    dark: {
        colors: {
            ...DefaultTheme.colors,
            primary: "#0a0a0a",
            secondary: "#1c1c1c",
            third: "#1a1818",
            buttonColor: "#307a59",
            secondaryButton: "#2a2a2a",
            text: "white",
            none: 'transparent'
        }
    },
    typography: {
        h1: { fontSize: 32, fontWeight: "700" },
        h2: { fontSize: 24, fontWeight: "600" },
        h3: { fontSize: 20, fontWeight: "500" },
        body: { fontSize: 16, fontWeight: "400" },
        caption: { fontSize: 12, fontWeight: "400" },
    },
};
