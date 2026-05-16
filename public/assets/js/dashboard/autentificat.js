//----------------------------------------------------------------------------------------------------------------------
//pagina care verificam daca utilizatorul e autentificat 
//----------------------------------------------------------------------------------------------------------------------



import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "/public/index.html";
    }
});