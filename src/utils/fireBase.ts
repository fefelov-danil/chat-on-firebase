// Initialize Firebase
import firebase from "firebase/compat";
import {getFirestore} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBCrlKSJIWHouGCZarmSUUhSweJOI28mmU",
  authDomain: "chat-react-7192c.firebaseapp.com",
  projectId: "chat-react-7192c",
  storageBucket: "chat-react-7192c.appspot.com",
  messagingSenderId: "774936982611",
  appId: "1:774936982611:web:8bd7736a12eb38a72042a6",
  measurementId: "G-2NMBCBCFV2"
};

const app = firebase.initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = firebase.auth(app)