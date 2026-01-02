import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootNavigationProp, RootStackParamList } from "../../../navigation/RootNavigator"
import PageWrapper from "../PageWrapper";
import StyledView from "../../styled/styledView";
import { ActivityIndicator, Dimensions, Image, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { BookImage, ChevronLeft, Library, SwitchCamera} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { CameraCapturedPicture, CameraType, CameraView, useCameraPermissions } from "expo-camera"
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "../../../hooks/useAppTheme";
import StyledText from "../../styled/styledText";
import * as ImagePicker from "expo-image-picker";
import { updateTile } from "../../../services/server/tiles/tileApiFunctions";
import { useUserContext } from "../../../services/userContext";
import { uploadImage } from "../../../services/server/filesystem/filesystemApiFunctions";

type Props = NativeStackScreenProps<RootStackParamList, "Camera">;

export default function CameraScreen({route}: Props) {
    const { pop } = useNavigation<RootNavigationProp>();
    const [ facing, setFacing ] = useState<CameraType>("back")
    const [ permission, requestPermission ] = useCameraPermissions();
    const insets = useSafeAreaInsets(); 
    const [ isCameraReady, setIsCameraReady ] = useState<boolean>(false);
    const [ picture, setPicture ] = useState<{uri: string}>({uri: ""});
    const iconSize = 35;
    const ref = useRef<CameraView>(null)
    const { colors } = useAppTheme();
    const { user } = useUserContext();

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const cameraReady = () => {
        setIsCameraReady(true)
    }

    const uploadPhotoToDB = async () => {
        await uploadImage(picture).then(async () => {
            if (user != null) {
                await updateTile(
                    picture,
                    user.user_id,
                    route.params.tile.tile_id,
                );
                console.log(`tile ${route.params.tile.tile_id} updated`)
                pop();
            }
        })
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setPicture({uri: result.assets[0].uri});
        }
    };

    const takePhoto = async () => {
        if (!isCameraReady) return;

        const photo : CameraCapturedPicture | undefined = await ref.current?.takePictureAsync({
            quality: 0.5,
            skipProcessing: true,
        });
        if (photo != undefined) setPicture(photo)
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

                <TouchableOpacity onPress={pickImage}>
                    <StyledView variant="buttonColor">
                        <BookImage size={iconSize} color={colors.secondary} />
                    </StyledView>
                </TouchableOpacity>
            </StyledView>
            </CameraView>
        </View>
    )

    return (
        <View style={[styles.container, {backgroundColor: route.params.tile.primary_color}]}>
            <View style={{flexDirection: 'row', position: 'absolute', top: insets.top, width: '100%', justifyContent: 'space-between', padding: 10}}>
                <TouchableOpacity onPress={() => setPicture({uri: ""})}>
                    <StyledView variant="secondary">
                        <StyledText variant="h3">Retake Photo</StyledText>
                    </StyledView>
                </TouchableOpacity>

                <TouchableOpacity onPress={uploadPhotoToDB}>
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