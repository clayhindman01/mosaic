import { FlatList, StyleSheet, View } from "react-native";
import StyledText from "../../../styled/styledText";
import { CommentType } from "../../../../types/CommentType";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

type Props = {
    comments: CommentType[];
    setIsScrolling: (value: boolean) => void
}

export default function CommentMenu({ comments, setIsScrolling }: Props) {
  return (
    <View style={{ flex: 1 }}> 
      <StyledText center={true} variant="h3">Comments</StyledText>
      <View style={styles.border} />

      <FlatList
        data={comments}
        keyExtractor={(item) => `${item.comment_id}`}
        onScrollBeginDrag={() => setIsScrolling(true)}
        onScrollEndDrag={() => setIsScrolling(false)}
        renderItem={({ item }) => (
          <Comment comment={item} key={item.comment_id} />
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

      <CommentInput />
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