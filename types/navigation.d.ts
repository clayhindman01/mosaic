import "@react-navigation/native";

declare module "@react-navigation/native" {
  export interface Theme {
    dark: boolean,
    colors: Theme["colors"] & {
      secondary: string;
      third: string;
      buttonColor: string;
      secondaryButton: string;
      none: string;
    };
    fonts: any
  }
}