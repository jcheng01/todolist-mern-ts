// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "todo-mern-92355.firebaseapp.com",
  projectId: "todo-mern-92355",
  storageBucket: "todo-mern-92355.appspot.com",
  messagingSenderId: "262201949371",
  appId: "1:262201949371:web:c4cac81be6a74e8cb7bd9e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
