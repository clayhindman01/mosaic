import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PageWrapper from "../PageWrapper"
import { RootStackParamList } from "../../../navigation/RootNavigator";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AccountCollectiveProfilePhoto from "../../common/AccountCollectiveProfilePhoto";
import StyledView from "../../styled/styledView";
import { useEffect, useState } from "react";
import ColletiveScreenMenu, { MenuEnum } from "./CollectiveViewMenu";
import StyledText from "../../styled/styledText";
import { getCommentsForCollective } from "../../../services/server/comments/commentApiFunctions";
import Chat from "./Chat";
import { getMosaicIdsForCollective, getUsersForCollective } from "../../../services/server/collectives/collectiveAPIFunctions";
import Members from "./Members";
import { CommentType } from "../../../types/CommentType";
import { TileType } from "../../../types/TileType";
import MosaicComponent from "../Mosaic/MosaicComponent";
import { getTilesForMosaic } from "../../../services/server/mosaics/mosaicApiFunctions";

type Props = NativeStackScreenProps<RootStackParamList, "CollectiveView">;

export default function CollectiveViewScreen ({route} : Props) {
    const { collective } = route.params
    const [ selectedTab, setSelectedTab ] = useState<MenuEnum>("Mosaics");
    const [ comments, setComments ] = useState<CommentType[]>([]);
    const [ members, setMembers ] = useState([]);
    const [ mosaicData, setMosaicData ] = useState<TileType[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    useEffect(() => {
        getUsersForCollective(collective.collective_id).then((res: any) => {
            setMembers(res.data)
        })
        getCommentsForCollective({collective_id: collective.collective_id}).then((res: any) => {
            setComments(res.data)
        })
        getMosaicIdsForCollective(collective.collective_id).then((res: any) => {
            getTilesForMosaic(res.data[0].mosaic_id).then((res: any) => {
                setMosaicData(res.data)
                setIsLoading(false)
            })
        }).catch(() => {
            setMosaicData([]);
            setIsLoading(false)
        })
    }, [])

    return (
        <PageWrapper route={route}>
            <StyledView variant="none">
                <StyledView variant="none" style={styles.collectiveHeader}>
                    <AccountCollectiveProfilePhoto photoUrl={collective.collective_photo} photoSize={60}/> 
                    <StyledText style={{marginLeft: 10,}} variant="h3">{collective.collective_name}</StyledText>
                </StyledView>
                <ColletiveScreenMenu selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                
                {(selectedTab === "Mosaics") && (!isLoading ? (
                    mosaicData.length === 0 ?
                    <NoMosaicComponent />
                    : <MosaicComponent data={mosaicData} /> 
                ) : (
                    <LoadingComponent />
                ))}
                {/* {(selectedTab === "Mosaics") && (!isLoading ? <MosaicComponent data={mosaicData} /> : (
                    <LoadingComponent />
                ))} */}
                {selectedTab === "Members" && <Members members={members} />}
                {selectedTab === "Chat" && <Chat comments={comments} collective_id={collective.collective_id} setComments={setComments} />}
            </StyledView>
           
        </PageWrapper>
    )
}

const LoadingComponent = () => (
    <View style={{height: '75%', justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
    </View>
)

const NoMosaicComponent = () => (
    <View style={{height: '75%', justifyContent: 'center', alignItems: 'center'}}>
        <StyledText>Click the + button to create a new mosaic</StyledText>
    </View>
)

const styles = StyleSheet.create({
    collectiveHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})