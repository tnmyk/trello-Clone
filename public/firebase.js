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
  const auth = firebase.auth();
  var db = firebase.firestore()
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
