import firebase from "firebase";
const firebaseObj = firebase.initializeApp({
    apiKey: "AIzaSyCfnO5zWNHR2ckL9UadX76dY0gdH1octfI",
    authDomain: "to-do-taskmanager-3370f.firebaseapp.com",
    projectId: "to-do-taskmanager-3370f",
    storageBucket: "to-do-taskmanager-3370f.appspot.com",
    messagingSenderId: "57159349489",
    appId: "1:57159349489:web:8397c8752fd3113e06e550",
    measurementId: "G-T9EQCX9DW7"
})

const db = firebaseObj.firestore();
export default db;