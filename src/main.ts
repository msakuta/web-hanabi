import { createApp } from 'vue'
import App from './App.vue'
import firebase from 'firebase';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Create .env.local and put VUE_APP_API_KEY and others to grant access.
// Note that this is not secure at all!
export let offlineMode = false;
if(!process.env.VUE_APP_API_KEY){
  offlineMode = true;
}
else{
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
}


// Initialize Cloud Firestore through Firebase
export const db = offlineMode ? null : firebase.firestore();


function generateUserId(){
  if(offlineMode || !db){
      return "";
  }
  const doc = db.collection("/users").doc();
  doc.set({name: "new user"});
  const userId = doc.id;
  localStorage.setItem('WebHanabiUserId', userId);
  return userId;
}

function loadUserId(){
  if(offlineMode || !db){
      return;
  }
  const st = localStorage.getItem('WebHanabiUserId');
  let userId = "";
  if(st && typeof st === "string" && st.length !== 0){
    userId = st;
  }
  else{
    // If the data is not as expected, regenerate random id
    userId = generateUserId();
  }
  return userId;
}

export const userId = loadUserId();

export async function loadUserName(){
  if(offlineMode || !db){
      return "new user";
  }
  const data = await db.collection("/users").doc(userId).get();
  if(data.exists){
      return data.get("name") as string;
  }
  return "new user";
}


createApp(App).mount('#app')
