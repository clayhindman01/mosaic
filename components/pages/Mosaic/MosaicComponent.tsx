import { useEffect, useMemo, useState } from "react"
import { TileType } from "../../../types/TileType"
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import MosaicPhoto from "./MosaicPhoto";
import MosaicModal from "./MosaicModal";
import UserFeedTile from "../Home/UserFeedTile/UserFeedTile";
import { Camera } from "lucide-react-native";
import StyledView from "../../styled/styledView";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { useNavigation } from "@react-navigation/native";
import { RootNavigationProp } from "../../../navigation/RootNavigator";

interface Props {
    data: TileType[],
    setData: (input: TileType[]) => void
}

export default function MosaicComponent({data, setData} : Props) {
    const [ selectedTile, setSelectedTile ] = useState<TileType>();
    const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);
    const { colors } = useAppTheme();
    const { navigate } = useNavigation<RootNavigationProp>();

    const handleMosaicPhotoPress = (tile: TileType) => {
        setSelectedTile(tile)
        setIsModalVisible(true)
    }

    const handleCameraIconPress = () => {
        setIsModalVisible(false)
        if (selectedTile) navigate("Camera", {tile: selectedTile})
    }

    const populateMosaic = () => {
        let tempData: TileType[][] = [], tempRow: TileType[] = [];
        let prevXPosition = 0;
        data.forEach((tile: TileType) => {
            if (prevXPosition == tile.x_position) {
                tempRow.push(tile)
            } else {
                if (tempRow.length != 0) {
                    tempData.push(tempRow);
                    tempRow = [];
                    tempRow.push(tile)
                }
            }
            prevXPosition = tile.x_position
        })
        return tempData;
    }

    const mappedItems = useMemo(async () => {
        return await populateMosaic().map((row: TileType[]) => { 
            return(
            <View style={styles.row}key={row[0].tile_id + row[0].mosaic_id}>
                {row.map((tile : TileType) => (
                    <TouchableOpacity key={tile.tile_id} onPress={() => handleMosaicPhotoPress(tile)}>
                        <MosaicPhoto tile={tile} rowLength={row.length} />
                    </TouchableOpacity>
                ))}
            </View>
        )})
    }, [])

    return (
        <ScrollView
        nestedScrollEnabled
        maximumZoomScale={10}
        minimumZoomScale={1}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
          <View style={[styles.container]}>
            {
              mappedItems
            }
          </View>
          <MosaicModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} tile={selectedTile}>
            {selectedTile?.image_path? (<UserFeedTile tile={selectedTile} showBottom={false} />
            ) : (
                <StyledView variant="none" style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={handleCameraIconPress}>
                        <Camera size={60} color={colors.primary}/>
                    </TouchableOpacity>
                </StyledView>
            )}
          </MosaicModal>
      </ScrollView>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
            display: "flex",
        flexDirection: "row",
    },
})