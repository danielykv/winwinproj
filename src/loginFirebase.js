import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {} from "./login";

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
const docRef = doc(db, "users", "eOrS");
const docSnap = await getDoc(docRef);
const docAllusers = collection(db, "users");

const auth = getAuth();

const Flogin = document.querySelector(".Flogin");
Flogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = Flogin.email.value;
  const password = Flogin.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user logged in:", cred.user);
      window.alert("logged in");
      var logEmail = cred.user.email;
      // Name, email address, and profile photo Url
      // alert(logEmail)
      let usernumber;
      getDocs(docAllusers).then((snapshot) => {
        let allUsers = [];
        snapshot.docs.forEach((doc) => {
          allUsers.push({ ...doc.data(), id: doc.id });
        });
        let userq = allUsers.length;
        console.log(allUsers);
        for (let index = 0; index < userq; index++) {
          if (allUsers[index].email == logEmail) usernumber = index;
        }

        if (allUsers[usernumber].eOrS == "Employer") {
          location.href = "employeer.html";
        } else if (allUsers[usernumber].eOrS == "Work Searcher") {
          location.href = "worksearcher.html";
        } else {
          location.href = "admin.html";
        }
      });
    })
    .catch((err) => {
      document.querySelector("#Alert_massage").innerHTML =
        "Wrong password/username";
    });
});

onAuthStateChanged(auth, (user) => {
  console.log("User status changed", user);
});
