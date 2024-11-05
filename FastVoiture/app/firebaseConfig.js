// Import the functions you need from the SDKs you need
// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8jyGFzLuAvrzZ5dBH_SjDmewVLd1JWAs",
  authDomain: "fastvoiture-33718.firebaseapp.com",
  projectId: "fastvoiture-33718",
  storageBucket: "fastvoiture-33718.appspot.com",
  messagingSenderId: "1036883287146",
  appId: "1:1036883287146:web:808c066fe42bd3aea33e13",
  measurementId: "G-F4SMV92X01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const dbdrivers = getFirestore(app);

//Initialize Storage

const storage = getStorage(app)

export { dbdrivers,storage };