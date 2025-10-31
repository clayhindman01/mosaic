import React, { useEffect, useState } from "react";
import { View, Button, FlatList, ListRenderItem, Dimensions, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import PageWrapper from "./PageWrapper";
import Header from "../common/Header";
import { getUserFeedData } from "../../services/server/tiles/tileApiFunctions";
import { AxiosResponse } from "axios";
import { TileType } from "../../types/TileType";
import StyledText from "../styled/styledText";
import UserFeedTile from "../common/UserFeedTile/UserFeedTile";
import StyledView from "../styled/styledView";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ route }: Props) {

    const [userFeedData, setUserFeedData] = useState<TileType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getUserFeedData(7).then((res: any) => {
            setUserFeedData(res.data)
            setIsLoading(false)
        })
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
    <PageWrapper route={route}>
        <FlatList
            data={userFeedData}
            snapToInterval={Dimensions.get("screen").width} // or itemHeight for vertical
            decelerationRate="fast" // Recommended for a smooth snapping effect
            bounces={false}
            showsVerticalScrollIndicator={false}
            renderItem ={(({item}: {item: TileType}) => (
                <StyledView variant="none">
                    <UserFeedTile tile={item} key={item.tile_id} />
                </StyledView>
            ))}
        />
    </PageWrapper>
  );
}
