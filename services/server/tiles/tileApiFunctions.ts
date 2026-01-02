import { UserType } from "../../../types/UserType";
import { base_url, authHeaders } from "../serverConfig";
import axios from "axios";

export const getTile = (tile_id: number) => {
	return new Promise((resolve, reject) => {
		try {
			resolve(axios.get(`${base_url}/getTile/${tile_id}`, authHeaders))
		} catch (e) {
			reject(e);
			console.error("Exception in getTile", e)
		}
	})
}

export const getUserFeedData = (user_id: number) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        axios.get(base_url + `/getUserFeed/${user_id}`, authHeaders)
      );
    } catch (e) {
      reject(e);
    }
  });
};

export const updateTile = async (
  photo: {uri: string},
  user_id: number,
  tile_id: number,
  isPrivate: boolean = false
) => {
  try {
    const splitURI = photo.uri.split("/");
    const body = {
      user_id: user_id,
      tile_id: tile_id,
      image_path: splitURI[splitURI.length - 1],
      is_private: isPrivate,
    };
    console.log("updateTile body", body)
    await axios.post(`${base_url}/updateTile`, body, authHeaders).then((r) => {
      console.log("Tile Updated", r.data);
    });
  } catch (e) {
    console.error("Exeption in updateTile", e);
  }
};