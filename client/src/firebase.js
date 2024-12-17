// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  authDomain: "mern-blog-a4fc6.firebaseapp.com",
  projectId: "mern-blog-a4fc6",
  storageBucket: "mern-blog-a4fc6.firebasestorage.app",
  messagingSenderId: "138484990697",
  appId: "1:138484990697:web:e362b0111d015c996f6678",
  measurementId: "G-3NPD0D475D",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
