import { Dimensions, Image, StyleSheet, View } from "react-native";
import { TileType } from "../../../types/TileType";
import { basicAuth, getImageURL } from "../../../services/server/serverConfig";
import { setOpacity } from "../../../utils";

interface Props {
    tile: TileType;
    rowLength: number;
}

export default function MosaicPhoto({ tile, rowLength }: Props) {
    return (
    <View
      style={{ height: Dimensions.get('window').width / (rowLength),
          width: Dimensions.get('window').width / (rowLength),
          backgroundColor: "#4a4A4A",
        }}
    >
      {tile.image_path ? (
        <>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={{
              uri: getImageURL(tile.image_path),
            }}
          />
          <View style={{...StyleSheet.absoluteFillObject, backgroundColor: setOpacity(tile.primary_color, 0.4)}}></View>
        </>
      ) : null}
    </View>
  );
}