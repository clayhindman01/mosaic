import { StyleSheet } from "react-native";
import StyledView from "../../../styled/styledView";
import { MessageCircle } from "lucide-react-native";
import { useTheme } from "@react-navigation/native";
import { TileType } from "../../../../types/TileType";
import Reactions from "./Reactions";

export default function UserFeedBottom({tile}: {tile : TileType}) {
    const {colors} = useTheme();
    return (
        <StyledView variant="none" style={styles.container} >
            <StyledView variant="secondary" style={[styles.reactionContainer, styles.generalContainer]}>
                <Reactions tile={tile} />
            </StyledView>
            <StyledView variant="secondary" style={[styles.commentContainer, styles.generalContainer]}>
                <MessageCircle color={colors.text} size={24}/>
            </StyledView>
        </StyledView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        bottom: 55,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    reactionContainer: {
        width: '50%',
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