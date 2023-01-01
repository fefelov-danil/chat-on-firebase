import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from 'app/App';
import reportWebVitals from './reportWebVitals';
import { getFirestore } from 'firebase/firestore/lite';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {Provider} from "react-redux";
import {store} from "bll/store";

// Initialize Firebase
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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
