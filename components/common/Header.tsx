import { StyleSheet, TouchableOpacity, View } from "react-native";
import StyledView from "../styled/styledView";
import StyledText from "../styled/styledText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useTheme } from "@react-navigation/native";
import { RootNavigationProp, RootStackParamList } from "../../navigation/RootNavigator";
import { Bell, ChevronLeft, Plus, Search, SquareUserIcon, UserSearchIcon } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// type NavigationProps = NativeStackScreenProps<RootStackParamList, "Home">;
type NavigationProps<T extends keyof RootStackParamList> = {
    route: RouteProp<RootStackParamList, T>
}

export default function Header<T extends keyof RootStackParamList>({route} : NavigationProps<T>) {

    const navigation = useNavigation<RootNavigationProp>()
    const { colors } = useTheme();

    const iconSize = 25;
    const biggerIconSize = 30;

    const navbarScreens = [
        "Home",
        "Mosaic",
        "Account",
        "Collective"
    ]

    const SearchAndBackComponent = () => {
        if (navbarScreens.includes(route.name)) return (
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <StyledView variant="none" >
                   <Search color={colors.text} size={iconSize} /> 
                </StyledView> 
            </TouchableOpacity>
        )
        
        return (
            <TouchableOpacity onPress={() => navigation.pop()}>
                <StyledView variant="none">
                    <ChevronLeft color={colors.text} size={biggerIconSize} />
                </StyledView>
            </TouchableOpacity>
        )
    }

    const NotificationsAndAccountComponent = () => {
        if (route.name === "Home") return (
            <StyledView variant="none">
                <Bell color={colors.text} size={iconSize} />
            </StyledView>
        )

        if (route.name === "Collective" || route.name === "CollectiveView") return (
            <TouchableOpacity>
                <StyledView variant="none">
                    <Plus color={colors.text} size={biggerIconSize} />
                </StyledView>
            </TouchableOpacity>
        )

        return (
            <StyledView variant="none">
                <View style={{width: iconSize}} />
            </StyledView>
        )
    }

    return (
        <StyledView rounded={true} variant="none" style={styles.container}>
            <SearchAndBackComponent />
            <StyledText center={true} style={{ fontSize: 26 }}>Mosaic</StyledText>
            <NotificationsAndAccountComponent />
        </StyledView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})