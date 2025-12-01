import { FlatList } from "react-native"
import { UserType } from "../../../types/UserType"
import StyledView from "../../styled/styledView"
import AccountCollectiveProfilePhoto from "../../common/AccountCollectiveProfilePhoto"
import StyledText from "../../styled/styledText"

type Props = {
    members: UserType[]
}

export default function Members({members}: Props) {
    return (
        <FlatList
            data={members}
            renderItem={(({item}: {item: UserType}) => (
                <StyledView variant="none" padded={false} style={{flexDirection: 'row', paddingVertical: 10,}}>
                    <AccountCollectiveProfilePhoto photoUrl={item.user_photo}/>
                    <StyledText style={{marginLeft: 10}}>{item.display_name}</StyledText>
                </StyledView>
            ))}
            />
    )
}