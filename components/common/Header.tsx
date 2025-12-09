import { SectionListComponent, StyleSheet, TouchableOpacity, View } from "react-native";
import StyledView from "../styled/styledView";
import StyledText from "../styled/styledText";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootNavigationProp, RootStackParamList } from "../../navigation/RootNavigator";
import { Bell, BellDot, ChevronLeft, Info, Plus, Search, } from "lucide-react-native";
import { useEffect, useState } from "react";
import { getAlertsForUser } from "../../services/server/alerts/alertAPIFunctions";
import { useUserContext } from "../../services/userContext";
import { AlertResponseType } from "../../types/AlertType";
import { useAppTheme } from "../../hooks/useAppTheme";
import BottomSheetModal from "./Menu";
import AlertsMenu from "./AlertsMenu";
import InfoMenu from "./InfoMenu";

// type NavigationProps = NativeStackScreenProps<RootStackParamList, "Home">;
type NavigationProps<T extends keyof RootStackParamList> = {
    route: RouteProp<RootStackParamList, T>
}

export default function Header<T extends keyof RootStackParamList>({route} : NavigationProps<T>) {
    const [ alertData, setAlertData ] = useState<AlertResponseType>({
        hasActive: false, 
        notifications: []
    });
    const [ isModalVisible, setModalIsVisible ] = useState<boolean>(false);

    const navigation = useNavigation<RootNavigationProp>()
    const { user } = useUserContext();
    const { colors } = useAppTheme();

    const iconSize = 25;

    const navbarScreens = [
        "Home",
        "Mosaic",
        "Account",
        "Collective"
    ]

    useEffect(() => {
        if (route.name === "Home" && user) {
            getAlertsForUser({user_id: user.user_id}).then((res: any) => {
                setAlertData(res.data)
            })
        }
    }, [])

    const LeftSideIcons = () => {
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
                    <ChevronLeft color={colors.text} size={iconSize} />
                </StyledView>
            </TouchableOpacity>
        )
    }

    const handlePlusPress = () => {
        switch (route.name) {
            case ("Collective"):
                navigation.navigate("NewCollective");
                break;
            case ("CollectiveView"):
                navigation.navigate("NewMosaic")
                break;
        }
    }

    const BellIcon = () => (
        <TouchableOpacity onPress={() => setModalIsVisible(true)}>
            <StyledView variant="none">
                {alertData.hasActive? (
                    <BellDot color={colors.text} size={iconSize} />
                ) : (
                    <Bell color={colors.text} size={iconSize} />
                )}
            </StyledView>
        </TouchableOpacity>
    )

    const PlusIcon = () => (
        <TouchableOpacity onPress={handlePlusPress}>
            <StyledView variant="none">
                <Plus color={colors.text} size={iconSize} />
            </StyledView>
        </TouchableOpacity>
    )

    const InfoIcon = () => (
        <TouchableOpacity onPress={() => setModalIsVisible(true)}>
            <StyledView variant="none">
                <Info color={colors.text} size={iconSize} />
            </StyledView>
        </TouchableOpacity>
    )

    const RightSideIcons = () => {
        switch (route.name) {
            case ("Home"):
                return <BellIcon />
            case ("Collective"):
            case ("CollectiveView"):
                return <PlusIcon /> 
            case ("NewCollective"):
            case ("NewCollectiveAddMembers"):
            case ("NewMosaic"):
                return <InfoIcon />
            default:
                return (
                    <StyledView variant="none">
                        <View style={{width: iconSize}} />
                    </StyledView>
                )
        }
    }

    const ModalComponent = () => {
        switch (route.name) {
            case ("NewCollective"):
            case ("NewMosaic"):
            case ("NewCollectiveAddMembers"):
                return <InfoMenu isVisible={isModalVisible} setIsVisible={setModalIsVisible} routeName={route.name} />
            case ("Home"):
                return <AlertsMenu isVisible={isModalVisible} setIsVisible={setModalIsVisible} alerts={alertData} />
        }
    }

    return (
        <>
        <StyledView rounded={true} variant="none" style={styles.container}>
            <LeftSideIcons />
            <StyledText center={true} style={{ fontSize: 26 }}>Mosaic</StyledText>
            <RightSideIcons />
        </StyledView>
        <ModalComponent />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})