import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootNavigationProp, RootStackParamList } from "../../../navigation/RootNavigator";
import StyledText from "../../styled/styledText";
import StyledView from "../../styled/styledView";
import PageWrapper from "../PageWrapper";
import LoginInput from "./LoginInput";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../../hooks/useAppTheme";
import {  useNavigation } from "@react-navigation/native";
import { getFirebaseUser, loginUser } from "../../../services/firebase/firebaseFunctions";
import Error from "./Error";
import { useUserContext } from "../../../services/userContext";
import { queryDBUserByFirebaseUID } from "../../../services/server/users/userApiFunctions";
import { AxiosResponse } from "axios";
import { UserType } from "../../../types/UserType";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({route}: Props) {
    const [ email, setEmail ] = useState<string>("")
    const [ password, setPassword ] = useState<string>("")
    const [ loginError, setLoginError ] = useState<string>("");
    const { setUser } = useUserContext();

    const navigation = useNavigation<RootNavigationProp>();
    const { colors } = useAppTheme();

    const handleLoginPress = () => {
        loginUser(email, password)
            .then(async () => {
                queryDBUserByFirebaseUID().then((res: any) => {
                    setUser(res.data[0]);
                    navigation.navigate('Home')
                })
            }).catch((error) => {
                setLoginError(error.toString())
            })
    }

    return (
        <PageWrapper route={route} showFooter={false} showHeader={false}>
            <StyledView variant="secondary" style={styles.container}>
                <View style={{height: '20%', justifyContent: 'flex-end'}}>
                    <StyledText variant="h1" center={true} style={{marginBottom: 25}}>Mosaic</StyledText>
                    <StyledText variant="h3" center={true}>Login or create an account to get started!</StyledText>
                </View>
                
                <View>
                    <LoginInput value={email} setValue={setEmail} placeholderText="Email" />
                    <LoginInput value={password} setValue={setPassword} placeholderText="Password" hideText={true} />

                    <TouchableOpacity onPress={handleLoginPress} >
                        <StyledView variant="buttonColor" style={{marginBottom: 10}}>
                            <StyledText variant="h2" center={true} style={{color: colors.primary}}>Continue</StyledText>
                        </StyledView>
                    </TouchableOpacity>

                    {loginError != "" && <Error errorMsg={loginError} />}

                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>

                        <View style={styles.border} />
                        <StyledText variant="body"style={{marginBottom: -7, color: 'gray'}}>Or</StyledText>
                        <View style={styles.border} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup") } >
                        <StyledView variant="third" style={{marginBottom: 10}}>
                            <StyledText variant="h2" center={true} style={{color: colors.buttonColor}}>Create new account</StyledText>
                        </StyledView>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Signup") } >
                        <StyledView variant="none" style={{marginBottom: 10}}>
                            <StyledText variant="h2" center={true} style={{color: colors.buttonColor}}>Continue as Guest</StyledText>
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