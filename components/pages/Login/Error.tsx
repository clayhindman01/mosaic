import { errorMessageMap } from "../../../utils";
import StyledText from "../../styled/styledText";
import StyledView from "../../styled/styledView";

export default function Error({errorMsg}: {errorMsg: string}) {
    console.log("Error.tsx", errorMessageMap.get(errorMsg), errorMsg)
    return (
        <StyledView variant="none" style={{backgroundColor: 'red'}}>
            <StyledText center={true}>{errorMessageMap.get(errorMsg)}</StyledText>
        </StyledView>
    )
}