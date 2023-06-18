import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

import {} from "./main";
import {} from "./createad";

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
$("#box").hide();
const adColRef = collection(db, "Ads");
const sendLinks = collection(db, "Sendedlinks");
const auth = getAuth();
let allUsers = [];
var timeStamps = new Date().toLocaleDateString();
let logEmail, logCompany, userfirstname;
let sended = [];
const docAllusers = collection(db, "users");
getDocs(docAllusers).then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    allUsers.push({ ...doc.data(), id: doc.id });
  });
  let userq = allUsers.length;
  console.log(allUsers);
  for (let index = 0; index < userq; index++) {
    if (allUsers[index].email == logEmail) {
      logCompany = allUsers[index].Company;
      userfirstname = allUsers[index].firstname;
    }
  }
  document.querySelector("#welcometext").innerHTML =
    "<h1 id=welcometext>שלום " + userfirstname + ", צור מודעה חדשה</h1>";
  getDocs(sendLinks).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      sended.push({ ...doc.data(), id: doc.id });
    });
    console.log(sended);
    let userNotifCount = 0;
    let sendedLength = sended.length;
    for (let f = 0; f < sendedLength; f++) {
      if (sended[f].emailofemployer == logEmail) {
        userNotifCount++;
        console.log("check");
      }
    }
    if (userNotifCount > 0) {
      $("#bellnotif").append(
        "<span class='circlebell position-absolute start-150 translate-middle badge rounded-pill bg-danger'>" +
          userNotifCount +
          "</span>"
      );
    }
  });
  $(document).ready(function () {
    var down = false;
    $("#bell").click(function (e) {
      var color = $(this).text();
      if (down) {
        // alert("check");
        // $(".added1").hide();
        $("#box").toggle("drop");
        $("#box").css("height", "0px");
        $("#box").css("opacity", "0");
        $(".added1").remove();
        down = false;
      } else {
        $(".added1").remove();
        $("#box").toggle();
        $("#box").css("height", "auto");
        $("#box").css("opacity", "1");
        down = true;
      }
      console.log("checkbell");
      let sendedLength = sended.length;
      console.log(sendedLength);
      let userNotifCount1 = 0;

      for (let i = 0; i < sendedLength; i++) {
        if (sended[i].emailofemployer === logEmail) {
          userNotifCount1++;
          console.log("checkit" + i);
          console.log(sended[i].downloadLink);
          $("#box").append(
            "<div class='added1 notifications-item'> <img src='/dist/img/occpics/occ" +
              sended[i].imgid +
              ".jpeg' alt='img'> <div class='text mx-2'><h4>המשתמש " +
              sended[i].nameOfsender +
              " הגיש קורות חיים למשרתך</h4   <p><a href=" +
              sended[i].downloadLink +
              "> לחץ כאן על מנת להוריד</a> </p> </div><i id='notidelete" +
              i +
              "' class='mt-4 mx-3 fa-regular fa-trash-can'></i> </div>"
          );

          const buttonDeleteNotfi = document.getElementById("notidelete" + i);
          if (buttonDeleteNotfi) {
            buttonDeleteNotfi.addEventListener("click", function () {
              var docDelNotfi = doc(db, "Sendedlinks", sended[i].id);
              deleteDoc(docDelNotfi).then(() => {
                location.reload();
              });
            });
          }
        }
        document.querySelector("#notifcount").innerHTML = userNotifCount1;
      }

      // }
      return false;
    });
  });
});

// sending data messaages

const adForm = document.querySelector(".adF");
adForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // add new info to firebase messages
  addDoc(adColRef, {
    company: logCompany,
    emailofemployer: logEmail,
    des: adForm.desc.value,
    location: adForm.Adloc.value,
    dep: adForm.MainOccupation1.value,
    imgid: whichnumber(adForm.MainOccupation1.value),
    req: adForm.reqs.value,
    title: adForm.title.value,
    // accepted: false,
    viewsCount: 0,
    Date: timeStamps,
  }).then(() => {
    alert("Success");
    location.href = "employeer.html";
  });
});
function whichnumber(x) {
  switch (x) {
    case "הנדסת בניין":
      return 1;
    case "הנדסת מכונות":
      return 2;
    case "הנדסת חשמל ואלקטרוניקה":
      return 3;
    case "הנדסת תוכנה":
      return 4;
    case "הנדסת תעשייה וניהול":
      return 5;
    case "הנדסה כימית":
      return 6;
    case "אדריכלות":
      return 7;
    case "תקשורת חזותית":
      return 8;
    case "מדעי המחשב":
      return 9;
      
    
  }
}

const logoutButton = document.querySelector(".logoutBtn");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("signout");
      location.href = "index.html";
    })
    .catch((err) => {
      console.log(err.message);
    });
});

onAuthStateChanged(auth, (user) => {
  console.log("User status changed", user);
  if (user != null) {
    logEmail = user.email;
  }
  if (user == null) {
    location.href = "index.html";
  }
});
