import { StyleSheet } from "react-native";
import StyledView from "../../styled/styledView";
import { MessageCircle } from "lucide-react-native";
import { useTheme } from "@react-navigation/native";
import { TileType } from "../../../types/TileType";
import Reactions from "./Reactions";

export default function UserFeedBottom({tile}: {tile : TileType}) {
    const emojiHexCode = [
    {
      name: "laughing-crying",
      code: "1F602",
    },
    {
      name: "heart-eyes",
      code: "1F60D",
    },
    {
      name: "neutral",
      code: "1F610",
    },
    {
      name: "pensive",
      code: "1F614",
    },
    {
      name: "fire",
      code: "1F525",
    },
  ];
    const {colors} = useTheme();
    return (
        <StyledView variant="none" style={styles.container} >
            <StyledView variant="secondary" style={styles.reactionContainer}>
                <Reactions tile={tile} />
            </StyledView>
            <StyledView variant="secondary" style={styles.commentContainer}>
                <MessageCircle color={colors.text} />
            </StyledView>
        </StyledView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        bottom: 65,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reactionContainer: {
        width: '50%',
        flexDirection: 'row',
    },
    commentContainer: {
        width: 'auto'
    }
})