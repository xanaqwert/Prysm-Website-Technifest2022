import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBpYMH_XBO5NRg2RcYvznZ2yl03Ga2jTk",
  authDomain: "prysm-a6286.firebaseapp.com",
  projectId: "prysm-a6286",
  storageBucket: "prysm-a6286.appspot.com",
  messagingSenderId: "802947391514",
  appId: "1:802947391514:web:d56f8358d85280c9cff1a3",
  measurementId: "G-41FLXB1XF5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
