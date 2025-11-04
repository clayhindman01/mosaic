import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const getFirebaseUser = () => {
  return auth.currentUser;
};

// Register a user in firebase using
export const registerFirebaseUser = async (state: {email: string, password: string}) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        createUserWithEmailAndPassword(auth, state.email, state.password)
      );
    } catch (e) {
      reject(e);
    }
  });
};

// Login a user with email and password
export const loginUser = async (email: string, password: string) => {
  try {
    return new Promise((resolve) => {
      resolve(signInWithEmailAndPassword(auth, email, password));
    });
  } catch (error) {
    console.log(error);
  }
};