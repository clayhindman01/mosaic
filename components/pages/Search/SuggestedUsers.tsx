import { ActivityIndicator, StyleSheet, View } from "react-native";
import StyledText from "../../styled/styledText";
import StyledView from "../../styled/styledView";
import { useEffect, useState } from "react";
import { UserType } from "../../../types/UserType";
import { getSuggestedFriends } from "../../../services/server/users/userApiFunctions";
import SearchResult from "./SearchResult";

export default function SuggestedUsers() {
    const [suggestedUsers, setSuggestedUsers] = useState<UserType[]>();
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(() => {
        getSuggestedFriends({user_id: 7}).then((res: any) => {
            setSuggestedUsers(res.data)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return (
            <StyledView variant="third" style={{height: 200, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator />
            </StyledView>
        )
    }
    return (
        <StyledView variant="third">
            <StyledText variant="h3" center={true}>Recommended Friends</StyledText>
            {suggestedUsers?.map((suggestedUser: any) => (
                <SearchResult user={suggestedUser} key={suggestedUser.user_id} />
            ))}
        </StyledView>
    )
}
