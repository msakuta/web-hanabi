import { createApp } from 'vue'
import App from './App.vue'
import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Create .env.local and put VUE_APP_API_KEY to grant access.
// Note that this is not secure at all!
const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: "web-hanabi.firebaseapp.com",
    projectId: "web-hanabi",
    storageBucket: "web-hanabi.appspot.com",
    messagingSenderId: "486326971095",
    appId: "1:486326971095:web:cba7224b5b6ce39cb39e92",
    measurementId: "G-93MV15EL3B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();


const userIdLength = 40; // We assume 40 bytes are long enough for collision avoidance until 16^20 ~ 1.2e24 users.

function randomizeUserId(){
    let userId = "";
    // This is not cryptographically safe random number, but we'd settle for this
    // because this application is not serious.
    for(let i = 0; i < userIdLength; i++)
        userId += Math.floor(Math.random() * 16).toString(16);
    localStorage.setItem('WebHanabiUserId', userId);
    return userId;
}

function loadUserId(){
    const st = localStorage.getItem('WebHanabiUserId');
    let ok = false;
    let userId = "";
    if(st && typeof st === "string" && st.length === userIdLength){
        ok = true;
        userId = st;
        // var elem = document.getElementById("userId");
        // if(elem)
        // 	elem.value = st;
    }
    else{
        // If the data is not as expected, regenerate random id
        userId = randomizeUserId();
    }
    return userId;
}

export const userId = loadUserId();

db.collection("/users").doc(userId).set({hello: "world"})


createApp(App).mount('#app')
