import PageWrapper from "../PageWrapper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigationProp, RootStackParamList } from "../../../navigation/RootNavigator";
import StyledText from "../../styled/styledText";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { UserType } from "../../../types/UserType";
import { getFriendsForUser } from "../../../services/server/friends/friendsApiFunctions";
import { useUserContext } from "../../../services/userContext";
import { useNavigation } from "@react-navigation/native";
import StyledView from "../../styled/styledView";
import { createNewCollective } from "../../../services/server/collectives/collectiveAPIFunctions";

type Props = NativeStackScreenProps<RootStackParamList, "NewCollectiveAddMembers">;

export default function NewCollectiveAddMembersScreen({route}: Props) {
    const { collectiveName, collectivePhoto } = route.params

    const [friends, setFriends] = useState<UserType[]>([]);
    const { user } = useUserContext();
    const [ selectedFriends, setSelectedFriends ] = useState<number[] >(user? [user.user_id]: []);
    const { navigate } = useNavigation<RootNavigationProp>()

    const handleNextClick = () => {
        const body = {
            collective_name: collectiveName,
            collective_image: collectivePhoto,
            userIds: selectedFriends 
        }
        createNewCollective(body)
        .then((res: any) => {
            navigate("CollectiveView", {collective: {
                collective_id: res.data.collective_id,
                collective_name: collectiveName,
                collective_photo: collectivePhoto,
                incomplete_mosaics_count: 0,
                permissions: 0,

            }})
        })
    }

    useEffect(() => {
        if (user) getFriendsForUser(user.user_id).then((res: any) => {
            const users : UserType[] = res.data
            setFriends(users)
        })
    }, [])

    return (
        <PageWrapper route={route} showFooter={false}>
            <StyledView variant="none" style={{ height: '100%', }}>
                {friends.map((friend: UserType) => (
                    <StyledText key={friend.user_id}>{friend.display_name}</StyledText>
                ))}
                <TouchableOpacity 
                    disabled={collectiveName === ""} 
                    style={styles.nextButton}
                    onPress={() => handleNextClick()} 
                >
                    <StyledView variant={selectedFriends.length !== 0 ? "buttonColor": "third"}>
                        <StyledText color="primary" center={true} variant="h2">Next</StyledText>
                    </StyledView>
                </TouchableOpacity>
            </StyledView>
        </PageWrapper>
    )
}

const styles = StyleSheet.create({

    nextButton: {
        position: "absolute",
        bottom : 60,
        left: 10,
        width: '100%',
    }
})