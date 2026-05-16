//----------------------------------------------------------------------------------------------------------------------
//pagina care creaza functiile de inregistrare si logare care le folosim in main.js
//----------------------------------------------------------------------------------------------------------------------


import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

//----------------------------------------------------------------------------------------------------------------------
//functia arata toate mesajele de eroare
//----------------------------------------------------------------------------------------------------------------------

function mesajPentruEroare(error, context = "register") {
    switch (error.code) {
        case "auth/email-already-in-use":
            return "Acest email este deja folosit. Încearcă să te conectezi.";
        case "auth/invalid-email":
            return "Adresa de email nu este validă.";
        case "auth/weak-password":
            return "Parola este prea slabă. Folosește cel puțin 6 caractere.";
        case "auth/operation-not-allowed":
            return "Înregistrarea este dezactivată momentan.";

        case "auth/user-not-found":
            return "Nu există niciun cont cu acest email.";
        case "auth/wrong-password":
            return "Parola introdusă este incorectă.";
        case "auth/invalid-credential":
            return "Email sau parolă incorectă. Verifică și încearcă din nou.";
        case "auth/user-disabled":
            return "Contul tău a fost dezactivat. Contactează un administrator.";
        case "auth/too-many-requests":
            return "Prea multe încercări. Așteaptă câteva minute și încearcă din nou.";

        case "auth/network-request-failed":
            return "Eroare de rețea. Verifică conexiunea la internet.";

        default:
            return context === "login"
                ? "Conectare eșuată. Verifică datele și încearcă din nou."
                : "Înregistrare eșuată. Încearcă din nou.";
    }
}

//----------------------------------------------------------------------------------------------------------------------
//functia de inregistrare
//----------------------------------------------------------------------------------------------------------------------

export async function register(username, email, password, role) {
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

        window.location.href = "games.html";
        const link = document.querySelector('.autentificat');
        if (link) {
            link.style.display = 'block';
            link.classList.remove('hidden');
        }
    } catch (error) {

        const mesaj = mesajPentruEroare(error, "register");
        afiseazaEroare(mesaj, "text-red-600");
        console.error("[register]", error.code, error.message);
    }
}
//----------------------------------------------------------------------------------------------------------------------
//functia de conectare
//----------------------------------------------------------------------------------------------------------------------


export async function login(email, password) {

    try {
        await signInWithEmailAndPassword(auth, email, password);


        window.location.href = "games.html";
        const link = document.querySelector('.autentificat');
        if (link) {
            link.style.display = 'block';
        }
    } catch (error) {
        const mesaj = mesajPentruEroare(error, "login");
        afiseazaEroare(mesaj, "text-red-600");
        console.error("[login]", error.code, error.message);
    }
}


export let userData = null;

//----------------------------------------------------------------------------------------------------------------------
//mesajul care apare de desubt la butoanele de conectare si inregistrare -cu rosu pentru erori
//----------------------------------------------------------------------------------------------------------------------


let mesajEroare = document.querySelectorAll('.conectare_p');

 function afiseazaEroare(text, culoare, timp = 5000) {
    mesajEroare.forEach(el => {
        el.innerText = text;
        el.classList.remove("hidden");
        el.classList.add(culoare);
    });

    setTimeout(() => {
        mesajEroare.forEach(el => {
            el.classList.add("hidden");
            el.innerText = "";
        });
    }, timp);

    return text;
}