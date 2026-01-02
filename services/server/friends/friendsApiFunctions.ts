import axios from "axios";
import { base_url } from "../serverConfig";
import { UserType } from "../../../types/UserType";

export const getFriendsForUser = (friend_id: number) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        axios.post(`${base_url}/getFriendsForUser`, { friend_id })
      );
    } catch (e) {
      reject(e);
    }
  });
};