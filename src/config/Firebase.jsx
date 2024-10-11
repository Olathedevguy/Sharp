// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    // appId: import.meta.env.VITE_FIREBASE_APP_ID,
    // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    apiKey: "AIzaSyDCxiJ9abcp53OZUuFLyu1ELXYzpvBQiLU",
    authDomain: "sharp-b99f5.firebaseapp.com",
    projectId: "sharp-b99f5",
    storageBucket: "sharp-b99f5.appspot.com",
    messagingSenderId: "234143264934",
    appId: "1:234143264934:web:82756be76f9d7d913c4467",
    measurementId: "G-RGCJBJX6D0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleprovider = new GoogleAuthProvider()
export const db = getFirestore(app)
