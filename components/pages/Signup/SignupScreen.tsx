import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigationProp, RootStackParamList } from "../../../navigation/RootNavigator";
import StyledText from "../../styled/styledText";
import StyledView from "../../styled/styledView";
import PageWrapper from "../PageWrapper";
import LoginInput from "../Login/LoginInput";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../../hooks/useAppTheme";
import {  useNavigation } from "@react-navigation/native";
import { loginUser } from "../../../services/firebase/firebaseFunctions";
import Error from "../Login/Error";

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function LoginScreen({route}: Props) {
    const [ email, setEmail ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")
    const [ username, setUsername] = useState<string>("")
    const [ loginError, setLoginError ] = useState<string>("");

    const navigation = useNavigation<RootNavigationProp>();
    const { colors } = useAppTheme();

    const handleLoginPress = () => {
        loginUser(email, password)
            .then(() => {
                navigation.navigate("Home");
            }).catch((error) => {
                setLoginError(error.toString())
            })
    }

    return (
        <PageWrapper route={route} showFooter={false} showHeader={false}>
            <StyledView variant="secondary" style={styles.container}>
                <View style={{height: '20%', justifyContent: 'flex-end'}}>
                    <StyledText variant="h1" center={true} style={{marginBottom: 25}}>Create a new Account</StyledText>
                </View>
                
                <View>
                    <LoginInput value={email} setValue={setEmail} placeholderText="Email" />
                    <LoginInput value={username} setValue={setUsername} placeholderText="Username"/>
                    <LoginInput value={password} setValue={setPassword} placeholderText="Password" hideText={true}/>

                    <TouchableOpacity onPress={handleLoginPress} >
                        <StyledView variant="buttonColor" style={{marginBottom: 10}}>
                            <StyledText variant="h2" center={true} style={{color: colors.primary}}>Continue</StyledText>
                        </StyledView>
                    </TouchableOpacity>

                    {loginError != "" && <Error errorMsg={loginError} />}

                    <TouchableOpacity onPress={() => navigation.pop() } >
                        <StyledView variant="buttonColor" style={{marginBottom: 10}}>
                            <StyledText variant="h2" center={true} style={{color: colors.primary}}>Back</StyledText>
                        </StyledView>
                    </TouchableOpacity>
                </View> 
                <StyledText variant="caption" center={true}>By clicking "Continue", you are agreeing with the Terms and Conditions and Privacy Policy</StyledText>
            </StyledView>
        </PageWrapper>

    )   
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between'
    },
    border: {
        borderColor: 'gray',
        width: '45%',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})