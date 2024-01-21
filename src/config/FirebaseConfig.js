// Import the functions you need from the SDKs you need
// JavaScript
// src.firebase.js
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhuGp4o6opyBn8ljkQ7WacBCrWeWlYRsE",
  authDomain: "fooddat-39850.firebaseapp.com",
  projectId: "fooddat-39850",
  storageBucket: "fooddat-39850.appspot.com",
  messagingSenderId: "785467016236",
  appId: "1:785467016236:web:8dd5183d3dd433c4b2fd89",
  measurementId: "G-1YRJ4XYP0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);

export default app;
