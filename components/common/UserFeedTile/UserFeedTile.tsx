import { Dimensions, Image, StyleSheet, View } from "react-native";
import { getImageURL } from "../../../services/server/serverConfig";
import { TileType } from "../../../types/TileType";
import UserFeedProfilePhoto from "./UserFeedProfilePhoto";
import UserFeedBottom from "./UserFeedBottom";

export default function UserFeedTile({tile} : {tile: TileType}) {
    if (tile.image_path) return (
        <View style={{flex: 1,marginTop: -50, marginBottom: -65}}>
            <UserFeedProfilePhoto tile={tile} />
            <Image
                source={{
                    uri: getImageURL(tile.image_path)
                }}
                style={[styles.image, {
                    width: Dimensions.get("screen").width - 20,
                    height: Dimensions.get("screen").width - 20
                }]}
            />
            <UserFeedBottom tile={tile} />
        </View>
    )
    
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 16,
    }
})