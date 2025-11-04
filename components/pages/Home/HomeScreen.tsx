import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import PageWrapper from "../PageWrapper";
import { getUserFeedData } from "../../../services/server/tiles/tileApiFunctions";
import { TileType } from "../../../types/TileType";
import UserFeedTile from "./UserFeedTile/UserFeedTile";
import StyledView from "../../styled/styledView";
import SuggestedUsers from "../Search/SuggestedUsers";

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
        <StyledView variant="none">
            <FlatList
                data={userFeedData}
                snapToInterval={Dimensions.get("screen").width-8} 
                decelerationRate="fast" 
                bounces={false}
                showsVerticalScrollIndicator={false}
                renderItem ={(({item}: {item: TileType}) => (
                    <UserFeedTile tile={item} key={item.tile_id} />
                ))}
                ListEmptyComponent={() => (
                    <SuggestedUsers />
                )}
            />
        </StyledView>
    </PageWrapper>
  );
}
