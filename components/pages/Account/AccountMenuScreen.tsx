import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigationProp, RootStackParamList } from "../../../navigation/RootNavigator";
import PageWrapper from "../PageWrapper";
import { Alert, TouchableOpacity, View } from "react-native";
import StyledView from "../../styled/styledView";
import StyledText from "../../styled/styledText";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { signOutUser } from "../../../services/firebase/firebaseFunctions";
import { memo } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "AccountMenu">

interface AccountMenuItemProps {
    text: string;
    onPress?: () => void;
    textStyle?: any 
}

/**
 * Features to complete:
 * 
 * 1. Update Theme
 * 2. User sign out
 * 3. Update user profile photo
 * 4. Delete Account
 * 
 */
export default function AccountMenuScreen({route}: Props) {

    const { pop, navigate } = useNavigation<RootNavigationProp>();
    
    const handleSignOutUserPress = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to proceed?",
            [
                {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel" // Optional: style for iOS
                },
                {
                text: "Sign Out",
                onPress: () => signOutUser().then(() => navigate("Login")),
                style:"destructive" 
                }
            ]
        )
    } 

    const iconSize = 35;
    return (
        <PageWrapper route={route} showFooter={false} showHeader={false}>
            <StyledView variant="none" style={{
                flexDirection: 'row', 
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => pop()}>
                    <ChevronLeft size={iconSize}/>
                </TouchableOpacity>
                <StyledText center={true} variant="h2">Settings</StyledText>
                <View style={{width: iconSize}} />
            </StyledView>
            <AccountMenuItem text="Change Theme" />
            <AccountMenuItem text="Update User Photo" />
            <AccountMenuItem text="Sign Out" textStyle={{color: 'red'}} onPress={handleSignOutUserPress}/>
            <AccountMenuItem text="Delete Account" textStyle={{color: 'red'}} />
        </PageWrapper>
    )
}

const AccountMenuItem = ({text, textStyle, onPress = () =>null}: AccountMenuItemProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <StyledView variant="none">
                <StyledText variant="h3" style={textStyle}>{text}</StyledText>
            </StyledView>
        </TouchableOpacity>
    )
}