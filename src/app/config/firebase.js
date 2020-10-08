import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // apiKey: "AIzaSyAb99g5tAmCKaRjwQ_4fkEP4D4tlfxnLXI",
  // authDomain: "revents-dbb-2020.firebaseapp.com",
  // databaseURL: "https://revents-dbb-2020.firebaseio.com",
  // projectId: "revents-dbb-2020",
  // storageBucket: "revents-dbb-2020.appspot.com",
  // messagingSenderId: "651558773337",
  // appId: "1:651558773337:web:4ebbeba97b66c9bfde4748",
  apiKey: "AIzaSyC-vPlLcQ3n14sIy7v22m3mM3SGH1G8Jfo",
  authDomain: "archive-ca476.firebaseapp.com",
  databaseURL: "https://archive-ca476.firebaseio.com",
  projectId: "archive-ca476",
  storageBucket: "archive-ca476.appspot.com",
  messagingSenderId: "112012234103",
  appId: "1:112012234103:web:148283fdec686cb0526572"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
