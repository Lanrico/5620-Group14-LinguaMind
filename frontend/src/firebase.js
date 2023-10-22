// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDPF0M13ZOeiRDH6us7zfFRBn5fy9hPWI8",
  authDomain: "group14-linguamind.firebaseapp.com",
  projectId: "group14-linguamind",
  storageBucket: "group14-linguamind.appspot.com",
  messagingSenderId: "672730974965",
  appId: "1:672730974965:web:32a7e00205b665646253bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;