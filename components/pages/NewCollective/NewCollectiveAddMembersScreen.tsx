import PageWrapper from "../PageWrapper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import StyledText from "../../styled/styledText";
import { View } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "NewCollectiveAddMembers">;

export default function NewCollectiveAddMembersScreen({route}: Props) {
    const { collectiveName, collectivePhoto } = route.params

    return (
        <PageWrapper route={route}>
            <View style={{ height: '100%'}}>
                <StyledText>{collectiveName + collectivePhoto}</StyledText>
            </View>
        </PageWrapper>
    )
}