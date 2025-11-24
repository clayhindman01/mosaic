import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import PageWrapper from "../PageWrapper";
import { getUserFeedData } from "../../../services/server/tiles/tileApiFunctions";
import { TileType } from "../../../types/TileType";
import UserFeedTile from "./UserFeedTile/UserFeedTile";
import StyledView from "../../styled/styledView";
import SuggestedUsers from "../Search/SuggestedUsers";
import { useUserContext } from "../../../services/userContext";
import Header from "../../common/Header";
import StyledText from "../../styled/styledText";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { getCurrentMosaic, getCurrentMosaicId, getTilesForMosaic } from "../../../services/server/mosaics/mosaicApiFunctions";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

type SelectedTabType = "Friends" | "Explore"

export default function HomeScreen({ route }: Props) {
    const [ selectedTab, setSelectedTab ] = useState<SelectedTabType>("Friends")
    const [userFeedData, setUserFeedData] = useState<TileType[]>([{
        tile_id: 1,
        mosaic_id: 1,
        display_name: "test",
        x_position: 1,
        y_position: 1,
        completed: false,
        date_created: null,
        image_path: null,
        is_private: null,
        num_likes: null,
        primary_color: 'green',
        user_id: null,
        user_photo: null,
        reactions: null,
        comments: [{
            comment_date: new Date(),
            comment_desc: 'test',
            comment_id: 1,
            display_name: 'test',
            user_id: 1,
            user_photo: "test"
        }]
    }]);
    const [exploreTabData, setExploreTabData] = useState<TileType[]>(userFeedData)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { user } = useUserContext();
    const { colors } = useAppTheme();

    useEffect(() => {
        if (user) {
            getUserFeedData(user?.user_id).then((res: any) => {
                setUserFeedData((prevState) => [...prevState, ...res.data])
                setIsLoading(false)
            })
            getCurrentMosaicId().then((res: any) => {
                console.log("CurrentMosaicId", res.data[0].mosaic_id)
                getTilesForMosaic(res.data[0]?.mosaic_id).then((res: any) => {
                    setExploreTabData(res.data)
                })
            })
        }
    }, [])

    if (isLoading) {
        return (
            <PageWrapper route={route}>
                <View style={{flex: 1, justifyContent: 'center'}} >
                    <ActivityIndicator  />
                </View>
            </PageWrapper>
        );
    }

  return (
    <PageWrapper route={route} showHeader={false}> 
        <StyledView variant="none">
            <FlatList
                data={selectedTab === "Friends" ? userFeedData : exploreTabData}
                snapToInterval={Dimensions.get("screen").width - 9 } 
                decelerationRate="fast" 
                bounces={false}
                showsVerticalScrollIndicator={false}
                renderItem ={(({item, index}: {item: TileType, index: number}) => {
                    if (index === 0) return (
                        <StyledView variant="primary" rounded={false} style={styles.tabContainer}>
                            <TouchableOpacity onPress={() => setSelectedTab("Friends")}>
                                <StyledText variant="h3" style={selectedTab === "Friends" ? { color: colors.text } : styles.inactive}>Friends</StyledText>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setSelectedTab("Explore")}>
                                <StyledText variant="h3" style={selectedTab === "Explore" ? { color: colors.text } : styles.inactive}>Explore</StyledText>
                            </TouchableOpacity>
                        </StyledView>
                    )
                    return (
                        <UserFeedTile tile={item} key={item.tile_id} />
                    )
                })}
                ListHeaderComponent={() => (
                    <Header route={route} />
                )}
                stickyHeaderIndices={[1]}
                ListEmptyComponent={() => (
                    <SuggestedUsers />
                )}
            />
        </StyledView>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
    tabContainer: {
        zIndex: 11,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inactive: {
        color: 'gray'
    }
})