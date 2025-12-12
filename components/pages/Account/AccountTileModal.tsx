import { ReactNode }from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { TileType } from "../../../types/TileType";

const screenHeight = Dimensions.get("window").height;

type Props = {
    isVisible: boolean;
    setIsVisible: (input: boolean) => void;
    children: ReactNode;
}

export default function AccountTileModal({ isVisible, setIsVisible, children }: Props) {
  const {colors} = useAppTheme();

  return (
    <View style={styles.container}>

      <Modal
        isVisible={isVisible}
        propagateSwipe={true}
        onBackdropPress={() => setIsVisible(false)}
        onSwipeComplete={() => setIsVisible(false)}
        swipeDirection='down'
        style={styles.modal}
      >
        <View style={[styles.sheet, {backgroundColor: colors.primary}]}>
          <View style={styles.handle} />
            {children}  
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  modal: {
    justifyContent: "flex-end",
    margin: 0, 
    flex:1
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    flex: 1,
    maxHeight: screenHeight * 0.5
  },
  handle: {
    width: 50,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 10,
  },
});