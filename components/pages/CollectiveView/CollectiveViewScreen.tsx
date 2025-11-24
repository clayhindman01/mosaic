import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PageWrapper from "../PageWrapper"
import { RootStackParamList } from "../../../navigation/RootNavigator";
import StyledText from "../../styled/styledText";
import { Image, StyleSheet } from "react-native";
import { getImageURL } from "../../../services/server/serverConfig";
import AccountCollectiveProfilePhoto from "../../common/AccountCollectiveProfilePhoto";

type Props = NativeStackScreenProps<RootStackParamList, "CollectiveView">;

export default function CollectiveViewScreen ({route} : Props) {
    const { collective } = route.params

    return (
        <PageWrapper route={route}>
           <AccountCollectiveProfilePhoto photoUrl={collective.collective_photo} /> 
           
        </PageWrapper>
    )
}

const styles = StyleSheet.create({
})