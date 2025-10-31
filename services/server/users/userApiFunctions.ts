import { getFirebaseUser } from "../../firebase/firebaseFunctions";
import { base_url, authHeaders } from "../serverConfig";
import axios from "axios";

/**
 * Call Node API and search database for usernames containing the search result.
 * username: String, username to search for in database
 * setSearchResults: function, sets the state value of search result to the selected data
 */
export const searchUser = async (search) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(axios.get(`${base_url}/searchUser/${search}`, authHeaders));
    } catch (e) {
      reject(e);
    }
  });
};

export const addDBUser = (username, expo_push_token) => {
  return new Promise((resolve, reject) => {
    try {
      const user = getFirebaseUser();
      resolve(
        axios.post(
          base_url + "/createUser",
          {
            firebase_uid: user.uid,
            user_email: user.email,
            display_name: username,
            expo_push_token: expo_push_token,
          },
          authHeaders
        )
      );
    } catch (e) {
      reject(e);
    }
  });
};

// Query the user where uid from firebase === user_id from db
export const queryDBUserByFirebaseUID = async () => {
  try {
    const user = getFirebaseUser();
    return new Promise((resolve, reject) => {
      try {
        resolve(
          axios.get(
            base_url + `/getUserByFirebaseUID/${user?.uid}`,
            authHeaders
          )
        );
      } catch (e) {
        console.log("error in queryDBUserByFirebaseUID", e);
        reject(e);
      }
    });
  } catch (e) {
    console.error("Exception in queryDBUserByFirebaseUID", e);
  }
};