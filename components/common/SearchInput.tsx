import { StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { UserType } from "../../types/UserType"
import { useEffect, useState } from "react"
import StyledView from "../styled/styledView"
import { useNavigation, useTheme } from "@react-navigation/native"
import { searchUser } from "../../services/server/users/userApiFunctions"
import { AxiosResponse } from "axios"
import { ChevronLeft, Search } from "lucide-react-native"
import StyledText from "../styled/styledText"
import { RootNavigationProp } from "../../navigation/RootNavigator"

type Props = {
    setSearchResults: (user: UserType[]) => void
}

export default function SearchInput({setSearchResults}: Props) {
    const [ textToSearchFor, setTextToSearchFor ] = useState<string>("");
    const { colors } = useTheme();

    const navigation = useNavigation<RootNavigationProp>();

    const updateText = (text: string) => {
        setTextToSearchFor(text);
    }

    useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (textToSearchFor != "") {
        searchUser(textToSearchFor)
          .then((res: any) => {
            setSearchResults(res.data);
          })
          .catch(() => {
            console.log("Unable to get searchResults");
          });
      } else {
        setSearchResults([]);
      }
    }, 250);
    return () => clearTimeout(delayDebounceFn);
  }, [textToSearchFor]);

    return (
        <StyledView variant="none" style={styles.container}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <ChevronLeft color={colors.text} style={{padding:10}} size={30} />
          </TouchableOpacity>
            <TextInput 
                value={textToSearchFor} 
                placeholder="Search User"
                style={[styles.textInput, {backgroundColor: colors.third, borderColor: colors.third, color: colors.text}]} 
                placeholderTextColor="gray"
                onChangeText={(text: string) => updateText(text)}
            />
        </StyledView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        width: "100%",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    textInput: {
        width: "90%",
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
    }
})