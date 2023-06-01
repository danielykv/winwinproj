import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {} from "./main";
import {} from "./index";

const firebaseConfig = {
  apiKey: "AIzaSyDwGN4lr7jxfLaHTSe6u3FjvqzeHJ02AdY",
  authDomain: "winwin-fa05e.firebaseapp.com",
  projectId: "winwin-fa05e",
  storageBucket: "winwin-fa05e.appspot.com",
  messagingSenderId: "222386853735",
  appId: "1:222386853735:web:a0b0e6d510f69f5dbc01c2",
  measurementId: "G-JRSS8MJXHP",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);

// collection ref

const colRef = collection(db, "Data");
