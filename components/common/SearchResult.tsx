import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { UserType } from "../../types/UserType";
import StyledView from "../styled/styledView";
import { basicAuth, getImageURL } from "../../services/server/serverConfig";
import { useNavigation, useTheme } from "@react-navigation/native";
import StyledText from "../styled/styledText";
import { RootNavigationProp } from "../../navigation/RootNavigator";

export default function SearchResult({user}: {user: UserType}) {
    const { colors } = useTheme();
    const navigation = useNavigation<RootNavigationProp>();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
            <StyledView variant="none" style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                    source={user.user_photo != null ? { uri: getImageURL(user.user_photo), headers: { Authorization: basicAuth}}: require("../../assets/noPhoto.png")}
                    style={[styles.image, {borderColor: colors.secondary}]}
                />
                <View>
                    <StyledText style={{fontWeight: 'bold'}}>{user.display_name}</StyledText>
                    <StyledText >{user.display_name}</StyledText>
                </View>
            </StyledView>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 45,
        height: 45,
        marginRight: 10,
        borderRadius: 4,
        borderWidth: 1 
    }
})