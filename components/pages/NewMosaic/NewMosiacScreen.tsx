import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import PageWrapper from "../PageWrapper";
import StyledText from "../../styled/styledText";

type Props = NativeStackScreenProps<RootStackParamList, "NewMosaic">;

export default function NewMosaicScreen({route}: Props) {
    return (
        <PageWrapper route={route} showFooter={false}>
            <StyledText>New Mosaics</StyledText>
        </PageWrapper>
    )
}