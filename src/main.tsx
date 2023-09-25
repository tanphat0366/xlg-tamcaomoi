import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Provider } from 'react-redux'
import store from './lol/path_to_your_store.tsx'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUvdiO3FYY07lTaVpTPQIpe61A5EvOc28",
  authDomain: "w3s-login.firebaseapp.com",
  projectId: "w3s-login",
  storageBucket: "w3s-login.appspot.com",
  messagingSenderId: "602813382777",
  appId: "1:602813382777:web:aed40385ef6600fe1314a8",
  measurementId: "G-0WGVL8HQ4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)