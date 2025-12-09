import { Dispatch, SetStateAction } from "react"
import BottomSheetModal from "./Menu"
import StyledText from "../styled/styledText"
import { StyleSheet, View } from "react-native"
import { NavigationRoutes } from "../../navigation/RootNavigator"

type Props = {
    isVisible: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>,
    routeName: NavigationRoutes
}

export default function InfoMenu({isVisible, setIsVisible, routeName}: Props) {
    return (
        <BottomSheetModal isVisible={isVisible} setIsVisible={setIsVisible}>
            <View style={{flex: 1}}>
                <StyledText center={true} variant="h2">What Are Collectives?</StyledText>
                <View style={styles.border} />
                <StyledText center={true} style={{marginTop: 15}} variant="h3">Collectives are private groups that can have their own mosaics. Only people who are in the collective can view and add to the mosaic.</StyledText>
                <StyledText center={true} style={{marginTop: 15}} variant="h3">Collectives also allow you to chat with other members of the collective.</StyledText>
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