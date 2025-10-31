import { Dimensions, Image, StyleSheet, View } from "react-native";
import { basicAuth, getImageURL } from "../../../services/server/serverConfig";
import { TileType } from "../../../types/TileType";
import UserFeedProfilePhoto from "./UserFeedProfilePhoto";

export default function UserFeedTile({tile} : {tile: TileType}) {
    if (tile.image_path) return (
        <View style={{flex: 1,marginTop: -50,}}>
            <UserFeedProfilePhoto tile={tile} />
        <Image
            source={{
                uri: getImageURL(tile.image_path),
                headers: {Authorization: basicAuth}
            }}
            style={styles.image}
        />
        </View>
    )
    
}

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').width - 20,
        borderRadius: 16,
    }
})