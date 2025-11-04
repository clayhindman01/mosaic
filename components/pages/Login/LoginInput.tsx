import { StyleSheet, TextInput } from "react-native";
import { useAppTheme } from "../../../hooks/useAppTheme";

type Props = {
    value: string;
    setValue: (input: string) => void;
    placeholderText: string;
    hideText?: boolean
}

export default function LoginInput({value, setValue, placeholderText, hideText=false}: Props) {
    const { colors } = useAppTheme()
    return (
        <TextInput 
            value={value} 
            placeholder={placeholderText}
            style={[styles.textInput, {backgroundColor: colors.third, borderColor: colors.third, color: colors.text}]} 
            placeholderTextColor="gray"
            onChangeText={(text: string) => setValue(text)}
            secureTextEntry={hideText}
        />
    )
}

const styles = StyleSheet.create({
    textInput: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10
    }
})