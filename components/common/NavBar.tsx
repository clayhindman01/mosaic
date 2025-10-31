import { RouteProp, useNavigation, useTheme } from "@react-navigation/native";
import { RootNavigationProp, RootStackParamList } from "../../navigation/RootNavigator";
import StyledView from "../styled/styledView";
import { Component, EarthIcon, Home, SquareUser, UserSearchIcon } from "lucide-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RouteNameTypes } from "../../navigation/RouteName";

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

    const handleIconClick = (routeName: RouteNameTypes) => {
        navigation.navigate(routeName)
    }

    const iconSize = 30;

    return (
        <StyledView variant="third" style={styles.container} shadow={true}>
            <PressableIcon handleClick={handleIconClick} routeName="Home">
                <Home color={ route.name === "Home" ? colors.text : 'gray' } size={iconSize} />
            </PressableIcon>

           <PressableIcon handleClick={handleIconClick} routeName="Search">
                <UserSearchIcon color={ route.name === "Search"? colors.text: 'gray'} size={iconSize} />
            </PressableIcon> 

            <PressableIcon handleClick={handleIconClick} routeName="Mosaic">
                <EarthIcon color={ route.name === "Mosaic"? colors.text: 'gray'} size={iconSize} />
            </PressableIcon>

            <PressableIcon handleClick={handleIconClick} routeName="Collective">
                <Component color={ route.name === "Collective"? colors.text: 'gray'} size={iconSize} />
            </PressableIcon>

            <PressableIcon handleClick={handleIconClick} routeName="Account">
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