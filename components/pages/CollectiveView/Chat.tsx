import { Dimensions, FlatList, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { CommentType } from "../../../types/CommentType"
import StyledView from "../../styled/styledView"
import { Dispatch, SetStateAction, useState } from "react"
import { useAppTheme } from "../../../hooks/useAppTheme"
import { Send } from "lucide-react-native"
import StyledText from "../../styled/styledText"
import AccountCollectiveProfilePhoto from "../../common/AccountCollectiveProfilePhoto"
import { CreateCollectiveComment, createCollectiveComment, getCommentsForCollective } from "../../../services/server/comments/commentApiFunctions"
import { useUserContext } from "../../../services/userContext"

type Props = {
    comments: CommentType[],
    collective_id: number,
    setComments: Dispatch<SetStateAction<CommentType[]>>
}

export default function Chat({comments, collective_id, setComments}: Props) {
    const [ newComment, setNewComment ] = useState<string>("")
    const { colors } = useAppTheme();
    const { user } = useUserContext();

    const handleClick = () => {
        const body: CreateCollectiveComment = {
            user_id: user?.user_id,
            collective_id: collective_id,
            comment_desc: newComment 
        }
        createCollectiveComment(body).then(() => {
            getCommentsForCollective({collective_id: collective_id}).then((res: any) => {
                setComments(res.data);
            })
        }).finally(() => {
            setNewComment("");
        })
    }
    return (
        <StyledView variant="none" padded={false} style={{height: Dimensions.get('screen').height}}>
            <FlatList
                data={comments}
                contentContainerStyle={{paddingBottom: 370}}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={{paddingTop: 250, justifyContent: 'center',alignItems: 'center'}}>
                        <StyledText style={{color: "gray"}}>No Comments</StyledText>
                    </View>
                )}
                renderItem={(({item}: {item: CommentType}) => (
                    <StyledView variant="none" padded={false} style={styles.commentItemContainer}>
                        <AccountCollectiveProfilePhoto photoUrl={item.user_photo} photoSize={35} />
                        <View style={{marginLeft: 5,}}>
                            <StyledText variant="caption">{item.display_name}</StyledText>
                            <StyledText variant="caption">{new Date(item.comment_date).toLocaleDateString()}</StyledText>
                            <StyledText>{item.comment_desc}</StyledText>
                        </View>
                    </StyledView>   
                ))}
            />
            <View style={styles.inputContainer}>
                <TextInput 
                    value={newComment} 
                    placeholder="New Comment"
                    style={[styles.textInput, {backgroundColor: colors.third, borderColor: colors.third, color: colors.text}]} 
                    placeholderTextColor="gray"
                    onChangeText={(text: string) => setNewComment(text)}
                />
                <TouchableOpacity onPress={() => handleClick()}>
                <Send color={colors.buttonColor} style={{padding:10}} size={30} />
            </TouchableOpacity>
            </View>
            
        </StyledView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row', 
        width: "100%",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 325,
    },
    textInput: {
        width: "90%",
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
    },
    commentItemContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
    }
})