import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


export async function register(username, email, password, role) {
    try {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
        username: username,
        email: email,
        role: role,
        createdAt: new Date()
    });

        alert("Înregistrare reușită!");
        const link = document.querySelector('.autentificat');
        if (link) {
            link.style.display = 'block';
            link.classList.remove('hidden');
        }
    } catch (error) {
    alert(error.message);
    }
}

export async function login(email, password) {
    try {
    await signInWithEmailAndPassword(auth, email, password);
        alert("Autentificat cu succes!");
        const link = document.querySelector('.autentificat');
        if (link) {
            link.style.display = 'block';
        }
    } catch (error) {
    alert(error.message);
    }
}



