// components/ThemedText.tsx
import React from "react";
import { Text, TextProps, useColorScheme, StyleSheet, TextStyle } from "react-native";
import { theme } from "./theme";
import { useUserContext } from "../../services/userContext";

type Variant = keyof typeof theme.typography;
type ColorKey = keyof typeof theme.light.colors;

interface ThemedTextProps extends TextProps {
  variant?: Variant;
  color?: ColorKey;
  center?: boolean;
}

const StyledText: React.FC<ThemedTextProps> = ({
  style,
  variant = "body",
  color = "text",
  center = false,
  children,
  ...rest
}) => {

  const { user } = useUserContext();
  const currentTheme = theme[user?.theme == 'dark' ? "dark" : 'light'].colors;

  const textStyle: TextStyle[] = [
    styles.base,
    theme.typography[variant],
    { color: currentTheme[color] },
    center && { textAlign: "center" },
  ].filter(Boolean) as TextStyle[];

  return (
    <Text style={[...textStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});

export default StyledText;
