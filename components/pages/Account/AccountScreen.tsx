import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigationProp, RootStackParamList } from "../../../navigation/RootNavigator";
import PageWrapper from "../PageWrapper";
import StyledText from "../../styled/styledText";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import StyledView from "../../styled/styledView";
import { UserType } from "../../../types/UserType";
import { addFriend, queryDBUser, queryTilesForUser, removeFriend } from "../../../services/server/users/userApiFunctions";
import { TileType } from "../../../types/TileType";
import { basicAuth, getImageURL } from "../../../services/server/serverConfig";
import { Settings, UserMinus, UserPlus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../../../services/userContext";

const { width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Account">

export default function AccountScreen({route}: Props) {
  const { user } = useUserContext();
  const [accountUser, setAccountUser] = useState<UserType>();
  const [posts, setPosts] = useState<TileType[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { navigate } = useNavigation<RootNavigationProp>();
  const [isFollowing, setIsFollowing] = useState<boolean>();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    queryTilesForUser(route.params.user.user_id).then((res:any) => {
      setPosts(res.data)
      setRefreshing(false)
    })
  }, []);

  useEffect(() => {
    user && queryDBUser(user.user_id, route.params.user.user_id).then((res: any) => {
      setAccountUser(res.data[0])
      setIsFollowing(res.data[0].is_following == 1 )
    })
    queryTilesForUser(route.params.user.user_id).then((res: any) => {
      setPosts(res.data)
      setIsLoading(false);
    })
  }, [])

  const handleFollowUserClick = () => {
    if (user && accountUser) {
      if (isFollowing) {
        removeFriend(user.user_id, accountUser.user_id).then(() => {
          setIsFollowing(false);
        })
      } else {
        addFriend(user?.user_id, accountUser?.user_id).then(() => {
          setIsFollowing(true)
        })
      }
    }
    
  }

if (isLoading) {
        return (
            <PageWrapper route={route} showHeader={false}>
                <View style={{flex: 1, justifyContent: 'center'}} >
                    <ActivityIndicator  />
                </View>
            </PageWrapper>
        );
    }

  return (
    <PageWrapper route={route} showHeader={false}>
      {/* Header Section */}
      <StyledView style={styles.header} variant="none">
        <Image
          style={styles.avatar}
          source={accountUser?.user_photo != null ? { uri: getImageURL(accountUser.user_photo), headers: { Authorization: basicAuth}}: require("../../../assets/noPhoto.png")}
        />
        <View style={styles.headerTextContainer}>
          <StyledText variant="h2">@{accountUser?.display_name}</StyledText>
          <StyledText variant="body" style={styles.subtext}>{posts.length} tiles</StyledText>
        </View>

        {user?.user_id === accountUser?.user_id ? (
          <TouchableOpacity style={styles.settingsButton} onPress={() => navigate("AccountMenu")}>
              <Settings />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.settingsButton} onPress={handleFollowUserClick}>
            {isFollowing ? <UserMinus/> : <UserPlus />}
          </TouchableOpacity>
        )}
      </StyledView>

      {/* Posts */}
      {posts.length != 0 && <FlatList
        data={posts}
        numColumns={2}
        renderItem ={(({item}: {item: TileType}) => {
          if (item.image_path) return (
            <TouchableOpacity style={styles.postTile} activeOpacity={0.8} onPress={() => navigate("Tile", {tile: item})}>
              <Image source={{ uri: getImageURL(item.image_path) }} style={styles.postImage} />
            </TouchableOpacity>
          ) 
          return (<Text>test</Text>)
        })}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        initialNumToRender={12}
        windowSize={10}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
      />}
    </PageWrapper>
  );
}

const tileSize = width / 2 ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: "700",
  },
  subtext: {
    fontSize: 14,
    marginTop: 4,
  },
  settingsButton: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "gray",
  },
  gridContainer: {
    paddingBottom: 80,
  },
  postTile: {
    width: tileSize,
    height: tileSize,
    marginRight: StyleSheet.hairlineWidth,
    marginBottom: StyleSheet.hairlineWidth,
    backgroundColor: "#f0f0f0",
    // borderRadius: 4,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
});
