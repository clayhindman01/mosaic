import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import StyledView from "../../../styled/styledView";
import { ChevronLeft, Send } from "lucide-react-native";
import { useState } from "react";
import { useAppTheme } from "../../../../hooks/useAppTheme";
import { createTileComment, CreateTileComment, getCommentsForTile } from "../../../../services/server/comments/commentApiFunctions";
import { useUserContext } from "../../../../services/userContext";
import { TileType } from "../../../../types/TileType";
import { CommentType } from "../../../../types/CommentType";

type Props = {
    tile: TileType,
    setComments: (value: CommentType[]) => void;
}

export default function CommentInput({tile, setComments}: Props) {
    const [commentText, setCommentText] = useState<string>("");
    const { colors } = useAppTheme()
    const { user } = useUserContext();

    const createComment = () => {
        const body: CreateTileComment = {
            user_id: user?.user_id,
            tile_id: tile.tile_id,
            comment_desc: commentText, 
        }

        if (commentText == "") return;
        
        createTileComment(body).then(() => {
            getCommentsForTile({tile_id: tile.tile_id}).then((res: any) => {
                setComments(res.data)
            })
        })
        setCommentText("")
    }
    return (
        <View style={styles.container}>
          
            <TextInput 
                value={commentText} 
                placeholder="New Comment"
                style={[styles.textInput, {backgroundColor: colors.third, borderColor: colors.third, color: colors.text}]} 
                placeholderTextColor="gray"
                onChangeText={(text: string) => setCommentText(text)}
            />
            <TouchableOpacity onPress={() => createComment()}>
            <Send color={colors.text} style={{padding:10}} size={30} />
          </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        width: "100%",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    textInput: {
        width: "90%",
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
    }
})