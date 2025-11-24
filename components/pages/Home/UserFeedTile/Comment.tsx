import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { CommentType } from "../../../../types/CommentType"
import StyledView from "../../../styled/styledView"
import { basicAuth, getImageURL } from "../../../../services/server/serverConfig"
import { useAppTheme } from "../../../../hooks/useAppTheme"
import StyledText from "../../../styled/styledText"
import { useNavigation } from "@react-navigation/native"
import { RootNavigationProp } from "../../../../navigation/RootNavigator"

type Props = {
    comment: CommentType,
    setIsModalVisible: (value: boolean) => void | null;
}

export default function Comment({ comment, setIsModalVisible }:Props) {
    const { colors } = useAppTheme();
    const { navigate } = useNavigation<RootNavigationProp>();
    return (
        <StyledView variant="none" style={styles.container}>
            <TouchableOpacity onPress={() => {
                navigate("Account", {user: {user_id: comment.user_id}})
                setIsModalVisible(false)
            }}>
                <Image
                    source={comment.user_photo != null ? { uri: getImageURL(comment.user_photo), headers: { Authorization: basicAuth}}: require("../../../../assets/noPhoto.png")}
                    style={[styles.image, {borderColor: colors.primary}]}
                />
            </TouchableOpacity>
            
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