import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAVWAPNk-ZT2iBspROdcFMTMbyJOVoC3As",
  authDomain: "mosaic-76e3c.firebaseapp.com",
  projectId: "mosaic-76e3c",
  storageBucket: "mosaic-76e3c.appspot.com",
  messagingSenderId: "471984825969",
  appId: "1:471984825969:web:170877dfb0fd7d2cbf5dd0",
  measurementId: "G-PL0GTDTZPS",
};

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const app = initializeApp(firebaseConfig);
const auth = firebaseAuth.initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };