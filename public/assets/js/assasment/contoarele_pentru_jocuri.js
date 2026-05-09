import { db, auth } from "../fierbase/firebase-init.js";
import { incarcaDateFirebase, vizite } from "./vizitare_documentatie.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export const contoare_jocuri = {

    contor_assasment_corecte_shuffle:0 ,
    contor_assasment_incercari_shuffle:0 ,

    contor_assasment_corecte_truefalse:0 ,
    contor_assasment_incercari_truefalse:0 ,

    contor_assasment_corecte_password:0 ,
    contor_assasment_incercari_password:0 ,

    contor_assasment_corecte_variante:0 ,
    contor_assasment_incercari_variante:0 
};


export async function incarcaContoareFirebase(user) {

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        console.log("Nu există date.");
        return;
    }

    const data = snap.data();

    console.log("contoarele_pentru_jocuri.js — date incarcate din Firebase:");
    console.log(data);
        // vizite.shuffle   = data.documentationVisits?.shuffle    ? 1 : 0;
        // vizite.truefalse = data.documentationVisits?.true_false ? 1 : 0;
        // vizite.password  = data.documentationVisits?.password   ? 1 : 0;
        // vizite.variante  = data.documentationVisits?.variante   ? 1 : 0;

    // console.log(" vizitare_documentatie.js — date incarcate din Firebase:");
    // console.log("  Shuffle:",    vizite.shuffle);
    // console.log("  True/False:", vizite.truefalse);
    // console.log("  Password:",   vizite.password);
    // console.log("  Variante:",   vizite.variante);
}


