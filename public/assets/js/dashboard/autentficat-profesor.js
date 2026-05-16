//----------------------------------------------------------------------------------------------------------------------
//pagina care verificam daca utilizatorul e autentificat ca profesor
//----------------------------------------------------------------------------------------------------------------------


import { auth, db, onAuthStateChanged } from "../fierbase/firebase-init.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
onAuthStateChanged(auth, async (user) => {
    console.log("USER:", user);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {

        const data = userSnap.data();

        if (data.role !== "Profesor") {
                    window.location.href = "/public/index.html";
        }

    }

});