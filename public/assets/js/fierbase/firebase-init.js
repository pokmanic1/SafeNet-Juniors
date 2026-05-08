// Import SDK-uri Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configurația
const firebaseConfig = {
  apiKey: "AIzaSyAXwFweuQuYYH-XbZ7cbhvGpwZeQA3hp7A",
  authDomain: "safenet-juniors.firebaseapp.com",
  databaseURL: "https://safenet-juniors-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "safenet-juniors",
  storageBucket: "safenet-juniors.firebasestorage.app",
  messagingSenderId: "518363329516",
  appId: "1:518363329516:web:b579aeb0ad672b689946c9",
  measurementId: "G-0NNKX47XYD"
};
// npm install firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { onAuthStateChanged };
