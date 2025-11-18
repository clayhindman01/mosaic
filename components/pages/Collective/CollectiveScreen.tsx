import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import PageWrapper from "../PageWrapper";
import StyledText from "../../styled/styledText";
import StyledView from "../../styled/styledView";
import { useEffect, useState } from "react";
import { getCollectivesForUser } from "../../../services/server/collectives/collectiveAPIFunctions";
import { useUserContext } from "../../../services/userContext";
import { CollectiveType } from "../../../types/CollectiveType";
import CollectiveItem from "./CollectiveItem";
import { ActivityIndicator, Dimensions, FlatList, View } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Collective">;

export default function CollectiveScreen({ route }: Props) {

  const [ collectiveData, setCollectiveData ] = useState<CollectiveType[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(true)
  const { user } = useUserContext();

  useEffect(() => {
    if (user?.user_id) getCollectivesForUser(user?.user_id).then((res: any) => {
      setCollectiveData(res.data)
      setIsLoading(false);
    })
  }, [])

  const EmptyComponent = () => {
    return (
    <View style={{flex: 1, height: Dimensions.get('screen').height -250, alignItems: 'center', justifyContent: 'center'}}>
      <StyledText style={{color: 'gray'}}>Create or join a collective to view them here.</StyledText>
    </View>
    )
  }

  if (isLoading) return (
    <PageWrapper route={route}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator/>
      </View>
    </PageWrapper>
  )

  return (
    <PageWrapper route={route} >
      <StyledView variant="none">
          <FlatList
            data={collectiveData}
            renderItem={(({item}: {item: CollectiveType}) => (
              <CollectiveItem collective={item} />
            ))}
            ListEmptyComponent={() => <EmptyComponent />}
          />
        </StyledView>
    </PageWrapper>
  );
}