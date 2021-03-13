import { createApp } from 'vue'
import App from './App.vue'
import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Create .env.local and put VUE_APP_API_KEY and others to grant access.
// Note that this is not secure at all!
const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
    measurementId: process.env.VUE_APP_MEASUREMENT_ID,
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
    db.collection("/users").doc(userId).set({name: "new user"});
    return userId;
}

function loadUserId(){
    const st = localStorage.getItem('WebHanabiUserId');
    let userId = "";
    if(st && typeof st === "string" && st.length === userIdLength){
        userId = st;
    }
    else{
        // If the data is not as expected, regenerate random id
        userId = randomizeUserId();
    }
    return userId;
}

export const userId = loadUserId();

export async function loadUserName(){
    const data = await db.collection("/users").doc(userId).get();
    if(data.exists){
        return data.get("name") as string;
    }
    return "new user";
}


createApp(App).mount('#app')
