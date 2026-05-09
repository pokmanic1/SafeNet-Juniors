import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "../fierbase/firebase-init.js";
import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";

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

    vizite.shuffle   = data.documentationVisits?.shuffle    ? 1 : 0;
    vizite.truefalse = data.documentationVisits?.true_false ? 1 : 0;
    vizite.password  = data.documentationVisits?.password   ? 1 : 0;
    vizite.variante  = data.documentationVisits?.variante   ? 1 : 0;

}
