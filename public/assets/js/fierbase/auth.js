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
        let conectare_p = document.querySelector('.conectare_p');  
    try {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
        usearname: username,
        email: email,
        role: role,
        createdAt: new Date()
    });

        afiseazaEroare("Înregistrare reușită!");
        window.location.href = "games.html";
        const link = document.querySelector('.autentificat');
        if (link) {
            link.style.display = 'block';
            link.classList.remove('hidden');
        }
    } catch (error) {
    afiseazaEroare(error.message);
    }
}


export async function login(email, password) {
    let conectare_p = document.querySelector('.conectare_p');  
    try {
    await signInWithEmailAndPassword(auth, email, password);
        conectare_p.innerText=afiseazaEroare("Autentificat cu succes!");
        window.location.href = "games.html";
        const link = document.querySelector('.autentificat');
        if (link) {
            link.style.display = 'block';
        }
    } catch (error) {
    conectare_p.innerText=afiseazaEroare(error.message);
    }
}


let mesajEroare = document.querySelectorAll('.conectare_p'); // ------------

function afiseazaEroare(text, timp = 5000) {

    mesajEroare.forEach(el => { // ------------
        el.innerText = text;
        el.classList.remove("hidden");
    });

    setTimeout(() => {
        mesajEroare.forEach(el => { // ------------
            el.classList.add("hidden");
            el.innerText = "";
        });
    }, timp);

    return text;
}