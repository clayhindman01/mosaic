import { Image, StyleSheet, View } from "react-native"
import { CommentType } from "../../../../types/CommentType"
import StyledView from "../../../styled/styledView"
import { basicAuth, getImageURL } from "../../../../services/server/serverConfig"
import { useAppTheme } from "../../../../hooks/useAppTheme"
import StyledText from "../../../styled/styledText"

type Props = {
    comment: CommentType
}

export default function Comment({ comment }:Props) {
    const { colors } = useAppTheme();
    return (
        <StyledView variant="none" style={styles.container}>
            <Image
                source={comment.user_photo != null ? { uri: getImageURL(comment.user_photo), headers: { Authorization: basicAuth}}: require("../../../../assets/noPhoto.png")}
                style={[styles.image, {borderColor: colors.primary}]}
            />
            <View>
                <StyledText variant="caption">{comment.display_name}</StyledText>
                <StyledText>{comment.comment_desc}</StyledText>
            </View>
        </StyledView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 2,
        borderRadius: 10,
        borderWidth: 1 
    },
})