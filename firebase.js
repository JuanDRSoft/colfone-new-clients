import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSggn8v95gm--kJcMoMRbiJpBz-wGdiEk",
  authDomain: "colfone-a024b.firebaseapp.com",
  projectId: "colfone-a024b",
  storageBucket: "colfone-a024b.appspot.com",
  messagingSenderId: "650994195593",
  appId: "1:650994195593:web:012435ae5d49ca0ffcba58",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
