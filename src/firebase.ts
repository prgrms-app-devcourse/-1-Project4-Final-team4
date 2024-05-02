import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from '@env';

const firebaseConfig = {
  apiKey: "AIzaSyAi71ZNNWQm5Hw-XuIAbfqyjRY6WxMLCXo",
  authDomain: "get-ready-with-p.firebaseapp.com",
  projectId: "get-ready-with-p",
  storageBucket: "get-ready-with-p.appspot.com",
  messagingSenderId: "428118474456",
  appId: "1:428118474456:web:ed24c4c729c3890572a1ad",
  measurementId: "G-YKKWQMKN6F"
};

// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID
// }

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);