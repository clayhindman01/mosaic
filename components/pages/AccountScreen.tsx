import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import PageWrapper from "./PageWrapper";
import StyledText from "../styled/styledText";

type Props = NativeStackScreenProps<RootStackParamList, "Account">;

export default function AccountScreen({ route }: Props) {

  return (
    <PageWrapper route={route}>
        <StyledText>Account</StyledText>
    </PageWrapper>
  );
}