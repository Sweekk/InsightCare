// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiQ6dSMTqxOxoLrz_4julDFrF9Qee_5Ow",
  authDomain: "insightcare-bb7b8.firebaseapp.com",
  projectId: "insightcare-bb7b8",
  storageBucket: "insightcare-bb7b8.firebasestorage.app",
  messagingSenderId: "205419414839",
  appId: "1:205419414839:web:35aad9e707e8cb2a7d46b2",
  measurementId: "G-RDVGJRMSNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();