import { View, ViewProps, StyleSheet, useColorScheme } from "react-native";
import { theme } from "./theme";
import { useTheme } from "@react-navigation/native";

interface AppViewProps extends ViewProps {
  padded?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  variant: "primary" | "background" | "secondary" | "text" | "third" | "buttonColor" | "secondaryButton" | "none"
}

const StyledView: React.FC<AppViewProps> = ({
  style,
  padded = true,
  rounded = true,
  shadow = false,
  variant = 'primary',
  children,
  ...rest
}) => {

    // const scheme = useColorScheme()
    const scheme = "dark"
    const themeColors = theme[scheme ?? "light"].colors;

  return (
    <View
      style={[
        styles.base,
        padded && styles.padded,
        rounded && styles.rounded,
        shadow && styles.shadow,
        variant !== 'none' && {backgroundColor: themeColors[variant]},
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: "transparent",
  },
  padded: {
    padding: 10,
  },
  rounded: {
    borderRadius: 16,
  },
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default StyledView;