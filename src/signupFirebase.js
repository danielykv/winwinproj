import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
// import {} from './signup'

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

// const colRef = collection(db,'Data');
const auth = getAuth();

// sign up
const signUpForm = document.querySelector(".Fsignup");
console.log(signUpForm);
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // if(signUpForm.email.value=="") {
  //     document.querySelector("#msg1").innerHTML="אנא הכנס שם פרטי";
  // }
  // if(signUpForm.email.value!="") {
  //   document.querySelector("#msg1").innerHTML="";
  // }
  console.log(signUpForm.email.value);
  const email = signUpForm.email.value;
  const password = signUpForm.password.value;
  const firstname = signUpForm.firstname.value;
  const lastname = signUpForm.lastname.value;
  const EmployerOrSearcher = signUpForm.EmployerOr.value;
  const passwordlength = password.length;
  console.log(passwordlength);
  if (
    firstname != "" &&
    lastname != "" &&
    email != "" &&
    password != "" &&
    passwordlength >= 6 &&
    phone != ""
  ) {
    document.querySelector("#msg1").innerHTML = "";
    document.querySelector("#msg2").innerHTML = "";
    document.querySelector("#msg3").innerHTML = "";
    document.querySelector("#msg4").innerHTML = "";

    if (EmployerOrSearcher == "1") {
      document.querySelector("#msg5").innerHTML = "";
      var Company = signUpForm.Company.value;

      var eOrS = "Employer";
      if (Company != "") {
        document.querySelector("#msg6").innerHTML = "";
        createUserWithEmailAndPassword(auth, email, password).then((cred) => {
          // Signed in
          const user = cred.user;
          addDoc(collection(db, "users"), {
            firstname,
            lastname,
            email,
            password,
            Company,
            eOrS,
          });
          alert("משתמש נרשם בהצלחה!");
          signUpForm.reset();
        });
      } else {
        document.querySelector("#msg6").innerHTML = "אנא הכנס שם חברה";
      }
    } else if (EmployerOrSearcher == "2") {
      document.querySelector("#msg5").innerHTML = "";
      var age = signUpForm.age.value;
      var gender = signUpForm.gender.value;
      var Occ = signUpForm.MainOcc.value;
      var phone = signUpForm.phone.value;
      
      if (age != "" && gender != "" && Occ != "") {
        document.querySelector("#msg7").innerHTML = "";
        document.querySelector("#msg8").innerHTML = "";
        document.querySelector("#msg9").innerHTML = "";
        var eOrS = "Work Searcher";
        createUserWithEmailAndPassword(auth, email, password).then((cred) => {
          // Signed in
          const user = cred.user;
          addDoc(collection(db, "users"), {
            firstname,
            lastname,
            email,
            password,
            age,
            gender,
            Occ,
            eOrS,
            phone,
          });
          alert("משתמש נרשם בהצלחה!");
          signUpForm.reset();
        });
      } else {
        if (age == "") {
          document.querySelector("#msg7").innerHTML = "אנא הכנס גיל";
        } else if (gender == "") {
          document.querySelector("#msg7").innerHTML = "";
          document.querySelector("#msg8").innerHTML = "אנא בחר מין";
        } else {
          document.querySelector("#msg7").innerHTML = "";
          document.querySelector("#msg8").innerHTML = "";
          document.querySelector("#msg9").innerHTML =
            "אנא בחר תחום עיסוק עיקרי";
        }
      }
    } else {
      document.querySelector("#msg5").innerHTML = "בחר סוג משתמש";
    }
  } else {
    if (firstname == "") {
      document.querySelector("#msg1").innerHTML = "אנא הכנס שם פרטי";
    } else if (lastname == "") {
      document.querySelector("#msg1").innerHTML = "";
      document.querySelector("#msg2").innerHTML = "אנא הכנס שם משפחה";
    } else if (email == "") {
      document.querySelector("#msg1").innerHTML = "";
      document.querySelector("#msg2").innerHTML = "";
      document.querySelector("#msg3").innerHTML = "אנא הכנס כתובת מייל";
    } else if (password == "") {
      document.querySelector("#msg1").innerHTML = "";
      document.querySelector("#msg2").innerHTML = "";
      document.querySelector("#msg3").innerHTML = "";
      document.querySelector("#msg4").innerHTML = "אנא הכנס סיסמא";
    } else if (passwordlength < 6) {
      document.querySelector("#msg4").innerHTML =
        "אורך הסיסמא אמור להיות מעל 6 תווים";
    }
  }
});

onAuthStateChanged(auth, (user) => {
  console.log("User status changed", user);
});
``