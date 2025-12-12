import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootNavigationProp, RootStackParamList } from "../../../navigation/RootNavigator"
import PageWrapper from "../PageWrapper";
import StyledView from "../../styled/styledView";
import { ActivityIndicator, Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { BookImage, ChevronLeft, Library, SwitchCamera} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera"
import { useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "../../../hooks/useAppTheme";
import StyledText from "../../styled/styledText";

type Props = NativeStackScreenProps<RootStackParamList, "Camera">;

export default function CameraScreen({route}: Props) {
    const { pop } = useNavigation<RootNavigationProp>();
    const [ facing, setFacing ] = useState<CameraType>("back")
    const [ permission, requestPermission ] = useCameraPermissions();
    const insets = useSafeAreaInsets(); 
    const [ isCameraReady, setIsCameraReady ] = useState<boolean>(false);
    const [ picture, setPicture ] = useState({uri: null});
    const iconSize = 35;
    const ref = useRef(null)
    const { colors } = useAppTheme();

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const cameraReady = () => {
        setIsCameraReady(true)
    }

    const takePhoto = async () => {
        if (!isCameraReady) return;

        const photo = await ref.current?.takePictureAsync({
            quality: 0.5,
            skipProcessing: true,
        });
        setPicture(photo)
    }

    if (!permission) {
        return (
            <PageWrapper route={route} showFooter={false} showHeader={false}>
                <View style={{ flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator />
                </View>
            </PageWrapper>
        )
    }

    if (!permission.granted) {
        requestPermission();
        return null
    }

    if (!picture.uri) return (
        <View style={{flex: 1}}>
            <CameraView 
                style={{flex: 1, justifyContent: 'space-between'}} 
                facing={facing} 
                zoom={0} 
                onCameraReady={() => cameraReady()}
                ref={ref}
                mirror={true}
            >
            <StyledView variant="none" style={{
                flexDirection: 'row', 
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: insets.top
            }}>
                <TouchableOpacity onPress={() => pop()}>
                    <ChevronLeft size={iconSize}/>
                </TouchableOpacity>

                <View style={{
                    padding: 25,
                    borderRadius: 10,
                    backgroundColor: route.params.tile.primary_color
                }} />
                
            </StyledView>

            <StyledView variant="none" style={{ 
                borderWidth: 5, 
                borderColor: 'lightgray',
                height: Dimensions.get('screen').width - 20,
                margin: 10
            }} />

            <StyledView variant="none" style={{ paddingBottom: insets.bottom, flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                <StyledView variant="buttonColor">
                    <TouchableOpacity onPress={toggleCameraFacing}>
                        <SwitchCamera size={iconSize} color={colors.secondary} />
                    </TouchableOpacity>
                </StyledView>

                <TouchableOpacity onPress={() => takePhoto()}>
                    <View style={{ 
                        borderWidth: 7, 
                        borderColor: '#a6a2a2', 
                        padding: 40, 
                        borderRadius: 100, 
                        backgroundColor: "lightgray" 
                    }} />
                </TouchableOpacity>

                <StyledView variant="buttonColor">
                    <BookImage size={iconSize} color={colors.secondary} />
                </StyledView>
            </StyledView>
            </CameraView>
        </View>
    )

    return (
        <View style={[styles.container, {backgroundColor: route.params.tile.primary_color}]}>
            <View style={{flexDirection: 'row', position: 'absolute', top: insets.top, width: '100%', justifyContent: 'space-between', padding: 10}}>
                <TouchableOpacity onPress={() => setPicture({uri: null})}>
                    <StyledView variant="secondary">
                        <StyledText variant="h3">Retake Photo</StyledText>
                    </StyledView>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => pop()}>
                    <StyledView variant="secondary">
                        <StyledText variant="h3">Continue</StyledText>
                    </StyledView>
                </TouchableOpacity>
            </View>
            <Image 
                source={{uri : picture.uri}}
                style={{
                    height: Dimensions.get("screen").width - 20,
                    width: Dimensions.get("screen").width - 20,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.third
                }} 
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: "center", 
    }
})