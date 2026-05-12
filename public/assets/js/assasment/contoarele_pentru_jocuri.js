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

    contor_assasment_corecte_shuffle: 0,
    contor_assasment_incercari_shuffle: 0,

    contor_assasment_corecte_truefalse: 0,
    contor_assasment_incercari_truefalse: 0,

    contor_assasment_corecte_password: 0,
    contor_assasment_incercari_password: 0,

    contor_assasment_corecte_variante: 0,
    contor_assasment_incercari_variante: 0
};

onAuthStateChanged(auth, async (user) => {
    if (!user) return;
    await incarcaContoareFirebase(user);
});

export async function incarcaContoareFirebase(user) {

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        console.log("Nu există date.");
        return;
    }

    const data = snap.data().gameCounters || {};

   

    contoare_jocuri.contor_assasment_corecte_shuffle = data.shuffle_corecte || 0;
    contoare_jocuri.contor_assasment_incercari_shuffle = data.shuffle_incercari || 0;

    contoare_jocuri.contor_assasment_corecte_truefalse = data.truefalse_corecte || 0;
    contoare_jocuri.contor_assasment_incercari_truefalse = data.truefalse_incercari || 0;

    contoare_jocuri.contor_assasment_corecte_password = data.password_corecte || 0;
    contoare_jocuri.contor_assasment_incercari_password = data.password_incercari || 0;

    contoare_jocuri.contor_assasment_corecte_variante = data.variante_corecte || 0;
    contoare_jocuri.contor_assasment_incercari_variante = data.variante_incercari || 0;

    // console.log(" contoarele_pentru_jocuri.js — contoare incarcate:");
    // console.log("  Shuffle corecte:", contoare_jocuri.contor_assasment_corecte_shuffle);
    // console.log("  Shuffle incercari:", contoare_jocuri.contor_assasment_incercari_shuffle);
    // console.log("  True/False corecte:", contoare_jocuri.contor_assasment_corecte_truefalse);
    // console.log("  True/False incercari:", contoare_jocuri.contor_assasment_incercari_truefalse);
    // console.log("  Password corecte:", contoare_jocuri.contor_assasment_corecte_password);
    // console.log("  Password incercari:", contoare_jocuri.contor_assasment_incercari_password);
    // console.log("  Variante corecte:", contoare_jocuri.contor_assasment_corecte_variante);
    // console.log("  Variante incercari:", contoare_jocuri.contor_assasment_incercari_variante);


}


