// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-T5OB_BW78KN-2YzQUAaqlYuIihhJMq0",
  authDomain: "pharmarx-b99ac.firebaseapp.com",
  projectId: "pharmarx-b99ac",
  storageBucket: "pharmarx-b99ac.firebasestorage.app",
  messagingSenderId: "576131556029",
  appId: "1:576131556029:web:e647b878373926609f8dd4",
  measurementId: "G-ERGV0MFD3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;