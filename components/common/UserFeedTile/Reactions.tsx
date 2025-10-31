import { Text, TouchableOpacity, View } from "react-native";
import { TileType } from "../../../types/TileType";
import { useTheme } from "@react-navigation/native";
import { useAppTheme } from "../../../hooks/useAppTheme";

type Emoji = {
    name: string,
    code: string
}

export default function Reactions({tile} : {tile : TileType}) {

    const { colors } = useAppTheme();

    const emojiHexCode = [
        {
        name: "laughing-crying",
        code: "1F602",
        },
        {
        name: "heart-eyes",
        code: "1F60D",
        },
        {
        name: "neutral",
        code: "1F610",
        },
        {
        name: "pensive",
        code: "1F614",
        },
        {
        name: "fire",
        code: "1F525",
        },
    ];

    return (
        emojiHexCode.map((emoji: Emoji) => (
          <TouchableOpacity
            key={emoji.code + tile.tile_id}
            // onPress={() => handleReactionPress(emoji)}
          >
            <Text style={{ fontSize: 22, paddingHorizontal: 2 }}>
              {String.fromCodePoint(parseInt(emoji.code, 16)).toString()}
            </Text>
            {tile.reactions && tile.reactions.map((reaction) => {
              return (
                reaction.reaction_text === emoji.code && (
                  <View
                    key={emoji.code + tile.tile_id}
                    style={{
                      justifyContent: "center",
                      marginLeft: 15,
                      marginTop: -12,
                      padding: 2,
                      minWidth: 18,
                      backgroundColor:
                        reaction.user_reacted == 1
                          ? colors.buttonColor
                          : colors.third,
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          reaction.user_reacted == 1
                            ? colors.secondary
                            : colors.text,
                        fontSize: 10,
                        textAlign: "center",
                      }}
                    >
                      {reaction.total_count}
                    </Text>
                  </View>
                )
              );
            })}
        </TouchableOpacity>
        ))
    )
}