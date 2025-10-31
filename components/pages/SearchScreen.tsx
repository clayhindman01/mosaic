import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import PageWrapper from "./PageWrapper";
import { UserType } from "../../types/UserType";
import SearchInput from "../common/SearchInput";
import StyledText from "../styled/styledText";
import { FlatList } from "react-native";
import SearchResult from "../common/SearchResult";
import StyledView from "../styled/styledView";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

export default function SearchScreen({ navigation, route }: Props) {

  const [ searchResults, setSearchResults ] = useState<UserType[]>([])

  return (
    <PageWrapper showHeader={false} route={route}>
      <SearchInput setSearchResults={setSearchResults} /> 
      <StyledView variant="none">
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={searchResults}
          renderItem={(({item}: {item: UserType}) => (
            <SearchResult user={item} />
          ))}
        />
      </StyledView>
    </PageWrapper>
  );
}
