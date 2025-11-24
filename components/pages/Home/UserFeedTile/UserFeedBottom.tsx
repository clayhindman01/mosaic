import { StyleSheet, TouchableOpacity } from "react-native";
import StyledView from "../../../styled/styledView";
import { MessageCircle } from "lucide-react-native";
import { useTheme } from "@react-navigation/native";
import { TileType } from "../../../../types/TileType";
import Reactions from "./Reactions";
import { useState } from "react";
import BottomSheetModal from "../../../common/Menu";
import CommentMenu from "./CommentMenu";
import { CommentType } from "../../../../types/CommentType";

export default function UserFeedBottom({tile}: {tile : TileType}) {
    const {colors} = useTheme();
    const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)
    const [ isScrolling, setIsScrolling] = useState<boolean>(false);

 
    return (
        <>
        <StyledView variant="none" style={styles.container} >
            <StyledView variant="secondary" style={[styles.reactionContainer, styles.generalContainer]}>
                <Reactions tile={tile} />
            </StyledView>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <StyledView variant="secondary" style={[styles.commentContainer, styles.generalContainer]}>
                    <MessageCircle color={colors.text} size={24}/>
                </StyledView>
            </TouchableOpacity>
        </StyledView>
            <BottomSheetModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} isScrolling={isScrolling}>
                <CommentMenu tile={tile} setIsScrolling={setIsScrolling} setIsModalVisible={setIsModalVisible} />
            </BottomSheetModal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        bottom: 60,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reactionContainer: {
        width: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    commentContainer: {
        width: 40,
        justifyContent: "center",
        alignItems: 'center',
    },
    generalContainer: {
      padding: 5,
      borderRadius: 10,
      opacity: 0.85
    }
})