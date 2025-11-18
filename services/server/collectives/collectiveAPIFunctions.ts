import axios from "axios";
import { base_url, authHeaders } from "../serverConfig";

export const getCollectivesForUser = (user_id: number) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        axios.post(
          `${base_url}/getCollectivesForUser`,
          { user_id },
          authHeaders
        )
      );
    } catch (e) {
      reject(e);
    }
  });
};