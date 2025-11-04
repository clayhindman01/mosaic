import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../common/Header";
import { RootStackParamList } from "../../navigation/RootNavigator";
import NavBar from "../common/NavBar";
import { RouteProp } from "@react-navigation/native";
import StyledView from "../styled/styledView";

type WrapperProps<T extends keyof RootStackParamList> = {
  route: RouteProp<RootStackParamList, T>;
  children: React.ReactNode;
  showHeader?: boolean
  showFooter?: boolean
};

export default function PageWrapper<T extends keyof RootStackParamList>({route, children, showHeader=true, showFooter=true}: WrapperProps<T>) {

    const insets = useSafeAreaInsets();

    return (
        <StyledView padded={showFooter == false && showHeader == false} rounded={false} variant="primary" style={{flex: 1, paddingBottom: insets.bottom, paddingTop: insets.top}}>
            {showHeader && <Header route={route} />}
            {children}
            {showFooter && <NavBar route={route} />} 
        </StyledView>
    )
}