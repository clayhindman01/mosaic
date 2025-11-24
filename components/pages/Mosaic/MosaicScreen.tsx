import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/RootNavigator";
import PageWrapper from "../PageWrapper";
import MosaicComponent from "./MosaicComponent";
import { useEffect, useState } from "react";
import { getCurrentMosaic } from "../../../services/server/mosaics/mosaicApiFunctions";
import { TileType } from "../../../types/TileType";
import { ActivityIndicator, FlatList, View } from "react-native";
import StyledView from "../../styled/styledView";
import StyledText from "../../styled/styledText";

type Props = NativeStackScreenProps<RootStackParamList, "Mosaic">;

export default function MosaicScreen({ route }: Props) {
  const [ currentMosaicData, setCurrentMosaicData ] = useState<TileType[]>([]); 
  const [ previousMosaics, setPreviousMosaics ] = useState();
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

  useEffect(() => {
    getCurrentMosaic().then((res: any) => {
      setCurrentMosaicData(res.data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return (
    <PageWrapper route={route}>
      <View style={{flex: 1, justifyContent: 'center'}} >
        <ActivityIndicator  />
      </View>
    </PageWrapper>
  )

  return (
    <PageWrapper route={route}>
      <StyledView variant="none" >
        <FlatList
          data={previousMosaics}
          renderItem ={(({item}: {item: any}) => (
            null
          ))}
          ListHeaderComponent={() => (
            <>
              <StyledView variant="none" padded={false}> 
                {/* <StyledText variant="h2" center={true} style={{paddingBottom: 10}}>Current Mosaic</StyledText> */}
                <MosaicComponent data={currentMosaicData} setData={setCurrentMosaicData}/>
              </StyledView>
              <StyledText variant="h2" center={true} style={{padding: 10}}>Past Mosaics</StyledText>
            </>
          )}
          ListEmptyComponent={() => (
            <StyledView variant="none" style={{height: 125, justifyContent: 'center'}}>
              <StyledText center={true} style={{color: "gray"}}>No past Mosaics yet.</StyledText>
              <StyledText center={true} style={{color: "gray"}}>Completed Mosaics will be shown here.</StyledText>
            </StyledView>
          )}
        />
      </StyledView>
    </PageWrapper>
  );
}
