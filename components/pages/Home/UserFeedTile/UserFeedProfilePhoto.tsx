import { Image, Pressable, StyleSheet, View } from "react-native";
import { basicAuth, getImageURL } from "../../../../services/server/serverConfig";
import { useNavigation, useTheme } from "@react-navigation/native";
import { TileType } from "../../../../types/TileType";
import StyledView from "../../../styled/styledView";
import StyledText from "../../../styled/styledText";
import { RootNavigationProp } from "../../../../navigation/RootNavigator";

export default function UserFeedProfilePhoto({tile}: {tile: TileType}) {
    const { colors } = useTheme();
    const { navigate } = useNavigation<RootNavigationProp>() 

    return (
        <Pressable onPress={() => navigate("Account", {user: { user_id: tile.user_id}})} style={styles.container}>
                <Image
                    source={tile.user_photo != null ? { uri: getImageURL(tile.user_photo), headers: { Authorization: basicAuth}}: require("../../../../assets/noPhoto.png")}
                    style={[styles.image, {borderColor: colors.primary}]}
                />
                <StyledView variant="secondary" style={{ padding: 5, height: 25}}>
                    <StyledText center={true} variant="caption">{tile.display_name}</StyledText>
                </StyledView>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        left: 10,
        top: 60,
        width: '95%',
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        opacity: 0.85
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 2,
        borderRadius: 10,
        borderWidth: 1 
    },
})