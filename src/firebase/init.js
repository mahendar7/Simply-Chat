import firebase from "firebase";

const config = {
    apiKey: "AIzaSyCftt0JqQI09lfP1Q1xsmBSCBMRs55mxQQ",
    authDomain: "vue-chat-19e82.firebaseapp.com",
    databaseURL: "https://vue-chat-19e82.firebaseio.com",
    projectId: "vue-chat-19e82",
    storageBucket: "vue-chat-19e82.appspot.com",
    messagingSenderId: "820829193852",
    appId: "1:820829193852:web:b79138a02b43af8d356bf9",
    measurementId: "G-1YC37S2ZQC"
};

/*eslint-disable */

// Initialize Firebase
const firebaseApp = firebase.initializeApp(config)

// Reference to Database
const db = firebaseApp.firestore();
/*eslint-disable */


export default db;