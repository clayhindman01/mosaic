import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../../navigation/RootNavigator"
import PageWrapper from "../PageWrapper"
import { Dimensions, Image, StyleSheet, View } from "react-native"
import { getImageURL } from "../../../services/server/serverConfig"
import StyledText from "../../styled/styledText"

type Props = NativeStackScreenProps<RootStackParamList, "Tile">

export default function TileScreen({route}: Props) {
    const { tile } = route.params
    if (tile.image_path) return (
        <PageWrapper route={route}>
            <View style={styles.container}>
                <Image
                    source={{
                        uri: getImageURL(tile.image_path) 
                    }}
                    style={styles.image}
                />
            </View>
            
            <View style={styles.bottomContainer}>
                <Image
                    source={tile.user_photo != null ? { uri: getImageURL(tile.user_photo)}: require("../../../assets/noPhoto.png")}
                    style={styles.accountImage}
                />
                <StyledText>{tile.display_name}</StyledText>
            </View>
            
        </PageWrapper>
    )
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('screen').width - 20,
        height: Dimensions.get('screen').width - 20,
        borderRadius: 10,
    },
    container: {
        alignItems: 'center'
    },
    bottomContainer: {
        flex: 1,
        padding: 10,
        flexDirection: 'row'
    },
    accountImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
    }
})