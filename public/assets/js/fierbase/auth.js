import { auth, db } from "./firebase-init.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
    } catch (error) {
    alert(error.message);
    }
}

export async function login(email, password) {
    try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Autentificat cu succes!");
    } catch (error) {
    alert(error.message);
    }
}
