import { Dispatch, SetStateAction } from "react"
import BottomSheetModal from "./Menu"
import StyledText from "../styled/styledText"
import { AlertResponseType, AlertType } from "../../types/AlertType"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NavigationRoutes, RootNavigationProp } from "../../navigation/RootNavigator"
import StyledView from "../styled/styledView"
import { notificationViewed } from "../../services/server/alerts/alertAPIFunctions"

type Props = {
    isVisible: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>,
    alerts: AlertResponseType;
}

export default function AlertsMenu({isVisible, setIsVisible, alerts}: Props) {
    const { navigate } = useNavigation<RootNavigationProp>();

    const handleNavigation = (type: NavigationRoutes, body: any, notification_id: number) => {
        notificationViewed(notification_id).then(() => {
            navigate(type, body)   
        }).finally(() => {
            setIsVisible(false)
        })
    }

    return (
        <BottomSheetModal isVisible={isVisible} setIsVisible={setIsVisible}>
            <View style={{flex: 1}}>
                <StyledText center={true} variant="h2">Alerts</StyledText>
                <View style={styles.border} />
                {alerts.notifications.length === 0 && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <StyledText variant="h3">All caught up!</StyledText>
                    </View>
                )}
                {alerts.notifications.map((item: AlertType) => (
                    <TouchableOpacity onPress={() => handleNavigation(item.type, {user: {user_id: item.type_id}}, item.notification_id)}>
                        <StyledView variant="none" rounded={false} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <StyledText>{item.notification_text}</StyledText>

                            {item.is_active && <View style={styles.active} />}
                        </StyledView>
                    </TouchableOpacity>
                ))}
            </View>
        </BottomSheetModal>
    )
}

const styles = StyleSheet.create({
    border: {
        width: "100%",
        borderColor: 'lightgray',
        borderWidth: StyleSheet.hairlineWidth,
        margin: 5,
    },
    active: {
        width: 10,
        height: 10,
        backgroundColor: 'orange',
        borderRadius: 10,
    }
})