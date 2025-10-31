import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import PageWrapper from "./PageWrapper";
import StyledText from "../styled/styledText";

type Props = NativeStackScreenProps<RootStackParamList, "Collective">;

export default function CollectiveScreen({ route }: Props) {

  return (
    <PageWrapper route={route}>
        <StyledText>Collectives</StyledText>
    </PageWrapper>
  );
}