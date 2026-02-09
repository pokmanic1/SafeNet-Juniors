// Import SDK-uri Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configurația
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "safenet-juniors.firebaseapp.com",
  projectId: "safenet-juniors",
  storageBucket: "safenet-juniors.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);