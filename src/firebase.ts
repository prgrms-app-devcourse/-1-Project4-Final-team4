// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAi71ZNNWQm5Hw-XuIAbfqyjRY6WxMLCXo",
  authDomain: "get-ready-with-p.firebaseapp.com",
  projectId: "get-ready-with-p",
  storageBucket: "get-ready-with-p.appspot.com",
  messagingSenderId: "428118474456",
  appId: "1:428118474456:web:ed24c4c729c3890572a1ad",
  measurementId: "G-YKKWQMKN6F"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };