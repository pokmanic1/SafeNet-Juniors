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

        afiseazaEroare("Înregistrare reușită!", "text-green-600");
        window.location.href = "games.html";
        const link = document.querySelector('.autentificat');
        if (link) {
            link.style.display = 'block';
            link.classList.remove('hidden');
        }
    } catch (error) {
        afiseazaEroare("Inregistrare nereusita", "text-red-600");
        console.error(error.message);
    }
}


export async function login(email, password) {
    let conectare_p = document.querySelector('.conectare_p');
    try {
        await signInWithEmailAndPassword(auth, email, password);
        
        conectare_p.innerText = afiseazaEroare("Autentificat cu succes!", "text-green-600");
        window.location.href = "games.html";
        const link = document.querySelector('.autentificat');
        if (link) {
            link.style.display = 'block';
        }
    } catch (error) {
        afiseazaEroare("Inregistrare nereusita", "text-red-600");
        console.error(error.message);
    }
}


export let userData = null;

export async function getToateDatele() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.log("[getToateDatele] Niciun user conectat.");
                resolve(null);
                return;
            }

            console.log("[getToateDatele] UID Auth:", user.uid);
            console.log("[getToateDatele] Email:", user.email);

            try {
                const snap = await getDoc(doc(db, "users", user.uid));

                if (snap.exists()) {
                    const raw = snap.data();
                    console.log("[getToateDatele] Date gasite:", JSON.stringify(raw));

                    userData = {
                        uid: user.uid,
                        email: user.email,
                        username: raw.usearname || raw.usarname || raw.username
                            || user.displayName || user.email.split("@")[0],
                        role: raw.role || "Elev",
                        ancora: raw.role === "Profesor"
                            ? "/public/pages/dashbord/dashbord.html"
                            : "/public/pages/dashbord/dashbord.elev.html"
                    };

                    console.log("[getToateDatele] userData final:", userData);
                    resolve(userData);

                } else {
                    console.warn("[getToateDatele] Document inexistent pentru UID:", user.uid);
                    console.warn("[getToateDatele] Emailul Auth:", user.email);
                    console.warn("[getToateDatele] Posibil: contul a fost sters si recreat din Auth.");
                    console.warn("[getToateDatele] Mergi in Firestore si adauga manual documentul cu ID:", user.uid);
                    resolve(null);
                }

            } catch (err) {
                console.error("[getToateDatele] Eroare Firestore:", err);
                resolve(null);
            }
        });
    });
}


let mesajEroare = document.querySelectorAll('.conectare_p'); // ------------

function afiseazaEroare(text, culoare, timp = 5000) {

    mesajEroare.forEach(el => { // ------------
        el.innerText = text;
        el.classList.remove("hidden");
        el.classList.add(culoare);
    });

    setTimeout(() => {
        mesajEroare.forEach(el => { // ------------
            el.classList.add("hidden");
            el.innerText = "";
        });
    }, timp);

    return text;
}