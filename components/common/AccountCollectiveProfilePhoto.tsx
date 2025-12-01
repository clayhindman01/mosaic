import { Image } from "react-native"
import { getImageURL } from "../../services/server/serverConfig"

type Props = {
    photoUrl: string | null | undefined,
    photoSize?: number | null | undefined
}

export default function AccountCollectiveProfilePhoto({photoUrl, photoSize=40} : Props) {
const styles = {
    image: {
        height: photoSize,
        width: photoSize,
        borderRadius: 4,
    }
}
    return (
        <Image 
            style={styles.image}
            source={photoUrl != null ? { uri: getImageURL(photoUrl)}: require("../../assets/noPhoto.png")}
        />
    )
}

