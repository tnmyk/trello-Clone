const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// firebase
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
require("firebase/analytics");
require("firebase/functions");
require("firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyDQg2Ge8iDjt237L_ZVyhj3HimYMr3aqos",
  authDomain: "prello-a1c6c.firebaseapp.com",
  projectId: "prello-a1c6c",
  storageBucket: "prello-a1c6c.appspot.com",
  messagingSenderId: "681873446013",
  appId: "1:681873446013:web:9bedb1d3bdf1a0cfb00d14",
  measurementId: "G-0YJT6PKBYK",
};
firebase.initializeApp(firebaseConfig);
// firebase

var db = firebase.firestore();
const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.NONE); //TO BE CHANGED
app.listen(process.env.PORT || 3000);

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

var currentUser;

app.get("/", (req, res) => {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      res.redirect("/boards");
    } else {
      res.render("signin", { err: "" });
    }
  });
});
app.get("/sign-up", (req, res) => {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      res.redirect("/boards");
    } else {
      res.render("signup", { err: "" });
    }
  });
});

app.get("/boards", (req, res,next) => {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      res.render("home",{username: user.displayName});
      // console.log(user.displayName)
    } else {
      res.redirect("/");
    }
  });
});

// app.post('/save',(req,res)=>{
//   db.collection('users').doc(auth.currentUser.uid).set({
//     contents:req.body.data
//   })
// })


app.post("/signup", (req, res) => {
  if (req.body.password != req.body.cpassword) {
    res.render("signup", { err: "Passwords do not match." });
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.password)
      .then((userCredential) => {
        var userid = userCredential.user.uid;
        const userCurrent = auth.currentUser;
        userCurrent
          .updateProfile({
            displayName: req.body.name,
          })
          .then(()=>{
              
              db.collection("users").doc(userid).set({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
              }).then(()=>{
                res.redirect("/boards");
              });
          })
          .catch(function (error) {
            // console.log(error)
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == "auth/email-already-in-use"){
          res.render("signup", { err: errorMessage });
        }
          
      });
  }
});


app.post('/signin',(req,res) => {
  auth.signInWithEmailAndPassword(req.body.email,req.body.password).then(()=>{
    res.redirect("/boards");
  }).catch(err => {
    var errCode = err.code;
    var errMessage = err.message;
    if (errCode == "auth/user-not-found") {
      res.render("signin", { err: "User does not exist." });
    } 
    else if (errCode == "auth/wrong-password") {
      res.render("signin", { err: "Wrong password." });
    }
    else if (errCode == "auth/invalid-email"){
      res.render("signin", { err: "Invalid email format." });
    }
     console.log(errCode);
  });
})

app.post('/signout',(req, res)=>{
  auth.signOut().then(()=>{
    res.redirect("/");
  })
})


