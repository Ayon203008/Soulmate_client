// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain:import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket:import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDb5QT98ppzd41yZ5FFbYMSHaa7O6RFg4o",
//   authDomain: "last-try-f6ea0.firebaseapp.com",
//   projectId: "last-try-f6ea0",
//   storageBucket: "last-try-f6ea0.firebasestorage.app",
//   messagingSenderId: "924050387678",
//   appId: "1:924050387678:web:137043d69e6ddb691ec84f"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);