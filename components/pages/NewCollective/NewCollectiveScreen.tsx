import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigationProp, RootStackParamList } from "../../../navigation/RootNavigator";
import PageWrapper from "../PageWrapper";
import StyledText from "../../styled/styledText";
import StyledView from "../../styled/styledView";
import { Camera } from "lucide-react-native";
import {  useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../../hooks/useAppTheme";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "NewCollective">;

export default function NewCollectiveScreen({route}: Props) {
    const [ collectiveName, setCollectiveName ] = useState<string>("");
    const [ collectivePhoto, setCollectivePhoto ] = useState<string>("");
    const { navigate } = useNavigation<RootNavigationProp>()
    const { colors } = useAppTheme();

    return (
        <PageWrapper route={route} showFooter={false}>
            <StyledView variant="none" style={styles.container}>
                <View style={{paddingVertical: '20%', }}>
                    <Image
                        source={require("../../../assets/noPhoto.png")}
                        style={[styles.image, {borderColor: colors.third}]}
                    />
                    <StyledView variant="buttonColor" style={styles.cameraButton}>
                        <Camera color={colors.secondary}/>
                    </StyledView>
                </View>
                <TextInput 
                    value={collectiveName} 
                    placeholder="Collective Name"
                    style={[styles.textInput, {backgroundColor: colors.third, borderColor: colors.third, color: colors.text}]} 
                    placeholderTextColor="gray"
                    onChangeText={(text: string) => setCollectiveName(text)}
                />
                <TouchableOpacity 
                    disabled={collectiveName === ""} 
                    style={styles.nextButton}
                    onPress={() => navigate("NewCollectiveAddMembers", {collectiveName, collectivePhoto})}
                >
                    <StyledView variant={collectiveName !== "" ? "buttonColor": "third"}>
                        <StyledText color="primary" center={true} variant="h2">Next</StyledText>
                    </StyledView>
                </TouchableOpacity>
            </StyledView>
        </PageWrapper>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center'
    },
    textInput: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
    },
    nextButton: {
        position: "absolute",
        bottom : 60,
        left: 10,
        width: '100%',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 5,
        borderWidth: 1
    },
    cameraButton: {
        position: 'relative',
        left: 125,
        bottom : 25,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: "center"
    }
})