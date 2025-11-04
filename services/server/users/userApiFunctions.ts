import { getFirebaseUser } from "../../firebase/firebaseFunctions";
import { base_url, authHeaders } from "../serverConfig";
import axios from "axios";

/**
 * Call Node API and search database for usernames containing the search result.
 * username: String, username to search for in database
 * setSearchResults: function, sets the state value of search result to the selected data
 */
export const searchUser = async (search: string) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(axios.get(`${base_url}/searchUser/${search}`, authHeaders));
    } catch (e) {
      reject(e);
    }
  });
};

export const addDBUser = (username: string, expo_push_token: string) => {
  return new Promise((resolve, reject) => {
    try {
      const user: any = getFirebaseUser();
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

export const queryDBUser = async (user_id_signed_in: number, user_id: number) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        axios.get(
          `${base_url}/getUser/${user_id_signed_in}/${user_id}`,
          authHeaders
        )
      );
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

export const queryTilesForUser = (uid: number) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(axios.get(base_url + `/getTilesForUser/${uid}`, authHeaders));
    } catch (e) {
      reject(e);
    }
  });
};

export const getSuggestedFriends = (body: {user_id: number}) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(axios.post(`${base_url}/getSuggestedFriends`, body, authHeaders))
        } catch (e) {
            reject(e)
        }
    })  
}