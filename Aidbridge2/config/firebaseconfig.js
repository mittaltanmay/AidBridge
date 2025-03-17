// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: REACT_API_KEY,
    authDomain: REACT_AUTH_DOAMIN,
    projectId: REACT_PROJECTID,
    storageBucket: REACT_STORAGEBUCKET,
    messagingSenderId: REACT_MESSENGER_ID,
    appId: REACT_API_ID
  };
const app = initializeApp(firebaseConfig);