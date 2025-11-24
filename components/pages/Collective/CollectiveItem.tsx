import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { CollectiveType } from "../../../types/CollectiveType"
import StyledView from "../../styled/styledView"
import { getImageURL } from "../../../services/server/serverConfig"
import StyledText from "../../styled/styledText"
import { useNavigation } from "@react-navigation/native"
import { RootNavigationProp } from "../../../navigation/RootNavigator"
import AccountCollectiveProfilePhoto from "../../common/AccountCollectiveProfilePhoto"

type Props = {
    collective: CollectiveType
}

export default function CollectiveItem({ collective } : Props) {
    const { navigate } = useNavigation<RootNavigationProp>();

    return (
        <TouchableOpacity onPress={() => navigate("CollectiveView", {collective: collective})}>
            <StyledView variant="secondary" style={styles.container}>
                <AccountCollectiveProfilePhoto photoUrl={collective.collective_photo} /> 
                <StyledText center={true}>{collective.collective_name}</StyledText>
                <View style={{width: 50}}/>
            </StyledView> 
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 4,
    }
})