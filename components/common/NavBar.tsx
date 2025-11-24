import { RouteProp, useNavigation, useTheme } from "@react-navigation/native";
import { RootNavigationProp, RootStackParamList } from "../../navigation/RootNavigator";
import StyledView from "../styled/styledView";
import { Component, EarthIcon, Home, Search, SquareUser, UserSearchIcon } from "lucide-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RouteNameTypes } from "../../navigation/RouteName";
import { useUserContext } from "../../services/userContext";

type Props<T extends keyof RootStackParamList> = {
    route: RouteProp<RootStackParamList, T>;
}

type PressableIconProps = {
    handleClick: (route: any) => void;
    children: React.ReactNode;
    routeName: RouteNameTypes;
}

export default function NavBar<T extends keyof RootStackParamList>({route}: Props<T>) {
    const navigation = useNavigation<RootNavigationProp>()
    const { colors } = useTheme();
    const { user } = useUserContext();

const handleIconClick = (routeName: RouteNameTypes, params: any) => {
        navigation.push(routeName, params)
    }

    const iconSize = 30;

    return (
        <StyledView variant="third" style={styles.container} shadow={true}>
            <PressableIcon handleClick={() => handleIconClick("Home", {})} routeName="Home">
                <Home color={ route.name === "Home" ? colors.text : 'gray' } size={iconSize} />
            </PressableIcon>

           {/* <PressableIcon handleClick={() => handleIconClick("Search", {})} routeName="Search">
                <Search color={ route.name === "Search"? colors.text: 'gray'} size={iconSize} />
            </PressableIcon>  */}

            <PressableIcon handleClick={() => handleIconClick("Mosaic", {})} routeName="Mosaic">
                <EarthIcon color={ route.name === "Mosaic"? colors.text: 'gray'} size={iconSize} />
            </PressableIcon>

            <PressableIcon handleClick={() => handleIconClick("Collective", {})} routeName="Collective">
                <Component color={ route.name === "Collective"? colors.text: 'gray'} size={iconSize} />
            </PressableIcon>

            <PressableIcon handleClick={() => handleIconClick("Account", {user})} routeName="Account">
                <SquareUser color={ route.name === "Account"? colors.text: 'gray'} size={iconSize} />
            </PressableIcon>
        </StyledView>
    )
}

const PressableIcon = ({handleClick, children, routeName}: PressableIconProps) => {
    return (
        <TouchableOpacity onPress={() => handleClick(routeName)}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})