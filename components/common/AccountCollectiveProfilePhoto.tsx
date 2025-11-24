import { Image } from "react-native"
import { getImageURL } from "../../services/server/serverConfig"

type Props = {
    photoUrl: string | null
}

export default function AccountCollectiveProfilePhoto({photoUrl} : Props) {
    return (
        <Image 
            style={styles.image}
            source={photoUrl != null ? { uri: getImageURL(photoUrl)}: require("../../assets/noPhoto.png")}
        />
    )
}

const styles = {
    image: {
        height: 45,
        width: 45,
        borderRadius: 4,
    }
}