// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBFln0ltpRqkBRm4XDHFIHUFgt3d9uhUmg",
  authDomain: "twtfk-5e127.firebaseapp.com",
  projectId: "twtfk-5e127",
  storageBucket: "twtfk-5e127.appspot.com",
  messagingSenderId: "755333890541",
  appId: "1:755333890541:web:ac6bd29328fa077c96a7e4"
});

const db = getFirestore();

export default db