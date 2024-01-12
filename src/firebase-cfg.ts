import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyANkWODAGf_oVjEzwbW1E92ife4MseQnWk",
    authDomain: "milliydev.firebaseapp.com",
    projectId: "milliydev",
    storageBucket: "milliydev.appspot.com",
    messagingSenderId: "224002764644",
    appId: "1:224002764644:web:78d784b86b937d1594d471"
};

const app = initializeApp(firebaseConfig);
export const dbAuth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)