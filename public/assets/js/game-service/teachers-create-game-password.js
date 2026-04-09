import { db, auth } from "../fierbase/firebase-init.js";
import {
    collection,
    addDoc,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../../../index.html";

    }
});



export const salveazaJocPassword = async (joc) => {
    const user = auth.currentUser;
    if (!user) {
        console.error("Userul nu e autentificat!");
        return;
    }

    try {
        const jocuriRef = collection(db, "users", user.uid, "jocuri_password");
        await addDoc(jocuriRef, {
            ...joc,
            creatLa: serverTimestamp()
        });
        console.log("Jocul a fost salvat în Firestore!");
    } catch (error) {
        console.error("Eroare la salvare:", error);
    }
};

export const getToateJocurilePassword = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    try {
        const jocuriRef = collection(db, "users", user.uid, "jocuri_password");
        const snapshot = await getDocs(jocuriRef);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Eroare la citire:", error);
        return [];
    }
};