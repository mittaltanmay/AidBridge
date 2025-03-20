// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.REACT_API_KEY,
    authDomain: import.meta.env.REACT_AUTH_DOAMIN,
    projectId: import.meta.env.REACT_PROJECTID,
    storageBucket: import.meta.env.REACT_STORAGEBUCKET,
    messagingSenderId: import.meta.env.REACT_MESSENGER_ID,
    appId: import.meta.env.REACT_API_ID
  };
const app = initializeApp(firebaseConfig);