// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzbSdHr643w",
  authDomain: "femcare-d1dde.firebaseapp.com",
  projectId: "femcare-d1dde",
  storageBucket: "femcare-d1dde.firebasestorage.app",
  messagingSenderId: "721644970543",
  appId: "1:721644970543:web:daaf2ff8914331182a5cda"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
