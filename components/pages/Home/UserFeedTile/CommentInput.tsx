import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import StyledView from "../../../styled/styledView";
import { ChevronLeft, Send } from "lucide-react-native";
import { useState } from "react";
import { useAppTheme } from "../../../../hooks/useAppTheme";

export default function CommentInput() {
    const [commentText, setCommentText] = useState<string>("");
    const { colors } = useAppTheme()
    return (
        <View style={styles.container}>
          
            <TextInput 
                value={commentText} 
                placeholder="New Comment"
                style={[styles.textInput, {backgroundColor: colors.third, borderColor: colors.third, color: colors.text}]} 
                placeholderTextColor="gray"
                onChangeText={(text: string) => setCommentText(text)}
            />
            <TouchableOpacity onPress={() => null}>
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