import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "../fierbase/firebase-init.js";
import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";

// Exportam un OBIECT (by reference) in loc de primitive
// Asa cand assasment.js citeste vizite.shuffle, vede mereu valoarea curenta
export const vizite = {
    shuffle: 0,
    truefalse: 0,
    password: 0,
    variante: 0
};

onAuthStateChanged(auth, async (user) => {
    if (!user) return;
    await incarcaDateFirebase(user);
});

export async function incarcaDateFirebase(user) {

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        console.log("Nu există date.");
        return;
    }

    const data = snap.data();

    // Modificam proprietatile obiectului exportat (nu reasignam variabila)
    vizite.shuffle   = data.documentationVisits?.shuffle    ? 1 : 0;
    vizite.truefalse = data.documentationVisits?.true_false ? 1 : 0;
    vizite.password  = data.documentationVisits?.password   ? 1 : 0;
    vizite.variante  = data.documentationVisits?.variante   ? 1 : 0;

    console.log(" vizitare_documentatie.js — date incarcate din Firebase:");
    console.log("  Shuffle:",    vizite.shuffle);
    console.log("  True/False:", vizite.truefalse);
    console.log("  Password:",   vizite.password);
    console.log("  Variante:",   vizite.variante);
}
