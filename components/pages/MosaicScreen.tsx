import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import PageWrapper from "./PageWrapper";
import StyledText from "../styled/styledText";

type Props = NativeStackScreenProps<RootStackParamList, "Mosaic">;

export default function MosaicScreen({ route }: Props) {

  return (
    <PageWrapper route={route}>
        <StyledText>Mosaics</StyledText>
    </PageWrapper>
  );
}
