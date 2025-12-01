import { StyleSheet, TouchableOpacity } from "react-native";
import StyledView from "../../styled/styledView";
import StyledText from "../../styled/styledText";
import { useAppTheme } from "../../../hooks/useAppTheme";

export type MenuEnum = "Mosaics" | "Members" | "Chat"
type Props = {
    selectedTab: MenuEnum, 
    setSelectedTab: (value: MenuEnum ) => void
}

export default function ColletiveScreenMenu({selectedTab, setSelectedTab}: Props) {

    const { colors } = useAppTheme();

    const handlePress = (value: MenuEnum) => {
        setSelectedTab(value);
    }
    return (
        <StyledView variant="primary" rounded={false} style={styles.tabContainer}>
            <TouchableOpacity onPress={() => handlePress("Mosaics")}>
                <StyledText variant="h3" style={selectedTab === "Mosaics" ? { color: colors.text } : styles.inactive}>Mosaics</StyledText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePress('Members')}>
                <StyledText variant="h3" style={selectedTab === "Members" ? { color: colors.text } : styles.inactive}>Members</StyledText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('Chat')}>
                <StyledText variant="h3" style={selectedTab === "Chat" ? { color: colors.text } : styles.inactive}>Chat</StyledText>
            </TouchableOpacity>
        </StyledView>
    )
}

const styles = StyleSheet.create({
    tabContainer: {
        zIndex: 11,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inactive: {
        color: 'gray'
    }
})