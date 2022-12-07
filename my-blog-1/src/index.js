import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4aqIZU-m2t_bdfY5KIMAbFVRr8lIXOXs",
    authDomain: "my-react-blog-c9676.firebaseapp.com",
    projectId: "my-react-blog-c9676",
    storageBucket: "my-react-blog-c9676.appspot.com",
    messagingSenderId: "983807820689",
    appId: "1:983807820689:web:84e1be31ce4e033d7f5030"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (<React.StrictMode>
    <App/>
</React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
