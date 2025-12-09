import { FlatList, StyleSheet, View } from "react-native";
import StyledText from "../../../styled/styledText";
import { CommentType } from "../../../../types/CommentType";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { TileType } from "../../../../types/TileType";
import { useEffect, useState } from "react";
import { getCommentsForTile } from "../../../../services/server/comments/commentApiFunctions";

type Props = {
    tile: TileType;
    setIsScrolling: (value: boolean) => void;
    setIsModalVisible: (value: boolean) => void;
}

export default function CommentMenu({ tile, setIsScrolling, setIsModalVisible }: Props) {
  const [ comments, setComments ] = useState<CommentType[]>(tile.comments);

  useEffect(() => {
    getCommentsForTile({tile_id: tile.tile_id}).then((res: any) => {
      setComments(res.data)
    })
  }, [])

  return (
    <View style={{ flex: 1 }}> 
      <StyledText center={true} variant="h2">Comments</StyledText>
      <View style={styles.border} />

      <FlatList
        data={comments}
        keyExtractor={(item) => `${item.comment_id}`}
        onScrollBeginDrag={() => setIsScrolling(true)}
        onScrollEndDrag={() => setIsScrolling(false)}
        renderItem={({ item }) => (
          <Comment comment={item} key={item.comment_id} setIsModalVisible={setIsModalVisible} />
        )}
        ListEmptyComponent={() => (
          <View style={{ height: 250, alignItems: "center", justifyContent: "center" }}>
            <StyledText variant="body" style={{ color: "gray" }}>
              No Comments
            </StyledText>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      <CommentInput tile={tile} setComments={setComments} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    border: {
        width: "100%",
        borderColor: 'lightgray',
        borderWidth: StyleSheet.hairlineWidth,
        margin: 5,
    }
})