import { Image, StyleSheet, View } from "react-native"
import { CollectiveType } from "../../../types/CollectiveType"
import StyledView from "../../styled/styledView"
import { getImageURL } from "../../../services/server/serverConfig"
import StyledText from "../../styled/styledText"

type Props = {
    collective: CollectiveType
}

export default function CollectiveItem({ collective } : Props) {
    return (
        <StyledView variant="secondary" style={styles.container}>
            <Image 
                style={styles.image}
                source={collective?.collective_photo != null ? { uri: getImageURL(collective.collective_photo)}: require("../../../assets/noPhoto.png")}
            />
            <StyledText center={true}>{collective.collective_name}</StyledText>
            <View style={{width: 50}}/>
        </StyledView> 
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