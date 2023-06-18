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
import {} from "./emloyeer";
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
const auth = getAuth();
$("#box").hide();
let logEmail;
let allUsers = [];
let usernumber, useremail, userfirstname, userlastname;
let flag = 0;
let darkflag = 0;
let textflag = 0;
let sended = [];
// onAuthStateChanged(auth,(user)=>{
//   console.log("User status changed",user);

//   if(user==null) {
//     location.href="404.html"
//   }
// })

const adColRef = collection(db, "Ads");
const docAllusers = collection(db, "users");
const sendLinks = collection(db, "Sendedlinks");
getDocs(docAllusers).then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    allUsers.push({ ...doc.data(), id: doc.id });
  });
  let userq = allUsers.length;
  console.log(allUsers);

  for (let index = 0; index < userq; index++) {
    if (allUsers[index].email == logEmail) {
      useremail = allUsers[index].email;
      userfirstname = allUsers[index].firstname;
      userlastname = allUsers[index].lastname;
    }
  }
  document.querySelector("#welcometext").innerHTML =
    "<h2 id='welcometext' class='lead text-muted'>ברוך הבא " +
    userfirstname +
    ", הנה המודעות שפירסמת באתרנו</h2>";
});

onAuthStateChanged(auth, (user) => {
  console.log("User status changed", user);
  if (user != null) {
    logEmail = user.email;
  } else {
    location.href = "index.html";
  }
});

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

var adSize;
var countAds = 0;
getDocs(adColRef)
  .then((snapshot) => {
    let Ads = [];
    snapshot.docs.forEach((doc) => {
      Ads.push({ ...doc.data(), id: doc.id });
    });
    adSize = Ads.length;
    console.log(Ads);
    for (let index = 0; index < adSize; index++) {
      let indexR = index + 1;
      if (Ads[index].emailofemployer == useremail) {
        countAds++;
        $("#try1").append(
          "<div class='col-md-4'> <div class='card mb-4 box-shadow'><img class='card-img-top' src='/dist/img/occpics/occ" +
            Ads[index].imgid +
            ".jpeg' alt='Thumbnail [100%x225]' style='height: 225px; width: 100%; display: block;' data-holder-rendered='true'><div class='card-body'> <h5 id='cardHeader' dir='rtl'><b>" +
            Ads[index].title +
            "</b></h5> <p class='card-text' id='cardText' dir='rtl'>" +
            Ads[index].des +
            "</p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button id='delbtn" +
            index +
            "' class='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#exampleModal'>מחיקה</button><button id='view" +
            index +
            "' class='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#modal2'>צפה</button></div>" +
            "<small class='text-muted'>" +
            Ads[index].Date +
            "</small></div></div></div></div>"
        );
      }
    }
    if (countAds == 0) {
      $("#non").append(
        "<div class = 'd-flex justify-content-center'> <h3 dir='rtl'>זיהינו שעוד לא פירסמת מודעה באתרנו! תוכל ליצור מודעה חדשה <a href='createad.html'>כאן</a></h3></div><div class ='d-flex justify-content-center'> <img class='d-flex justify-content-center' src='/dist/img/noads.png' alt='nonads' style=' width: 50%;'</div>"
      );
    } else {
      document.querySelector("#adC").innerHTML =
        "כמות מודעות (" + countAds + ")";
    }
    getDocs(sendLinks).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        sended.push({ ...doc.data(), id: doc.id });
      });
      console.log(sended);
      let userNotifCount = 0;
      let sendedLength = sended.length;
      for (let f = 0; f < sendedLength; f++) {
        if (sended[f].emailofemployer == useremail) {
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
          if (sended[i].emailofemployer === useremail) {
            userNotifCount1++;
            console.log("checkit" + i);
            console.log(sended[i].downloadLink);
            $("#box").append(
              "<div class='added1 notifications-item'> <img src='/dist/img/occpics/occ" +
                sended[i].imgid +
                ".jpeg' alt='img'> <div class='text mx-2'><h4>המשתמש " +
                sended[i].nameOfsender +
                " הגיש פנייה למודעתך</h4>  <p><h4>תוכן הפנייה: " +
                sended[i].downloadLink +
                "</h4></p> <h4>מספר טלפון ליצירת קשר: " + sended[i].phoneNumber+"<h4></div><i id='notidelete" +
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
    for (let index = 0; index < adSize; index++) {
      const buttonE = document.getElementById("delbtn" + index);
      const buttonE2 = document.getElementById("view" + index);

      if (buttonE) {
        buttonE.addEventListener("click", function () {
          console.log("yougay");
          var buttonD = document.getElementById("YesDelete");
          if (buttonD) {
            buttonD.addEventListener("click", function () {
              console.log("the index is:", index);
              console.log(Ads[index]);
              var docDelAds = doc(db, "Ads", Ads[index].id);
              deleteDoc(docDelAds).then(() => {
                location.reload();
              });
            });
          }
        });
      }
      if (buttonE2) {
        buttonE2.addEventListener("click", function () {
          console.log("younotgay" + index);
          document.querySelector("#Mtitle").innerHTML = Ads[index].title;
          if (Ads[index].company == null) {
            document.querySelector("#Mcompany").innerHTML = "חסוי";
          } else {
            document.querySelector("#Mcompany").innerHTML = Ads[index].company;
          }
          document.querySelector("#Mlocation").innerHTML = Ads[index].location;
          document.querySelector("#Mdescribe").innerHTML = Ads[index].des;
          document.querySelector("#Mreq").innerHTML = Ads[index].req;
          document.querySelector("#Mviews").innerHTML =
            Ads[index].viewsCount + " <i class='fa-regular fa-eye'></i>";
          document.querySelector("#Mdep").innerHTML = Ads[index].dep;
          document.querySelector("#Mimg").src =
            "/dist/img/occpics/occ" + Ads[index].imgid + ".jpeg";
        });
      }

      // });
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
