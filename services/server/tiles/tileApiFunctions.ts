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