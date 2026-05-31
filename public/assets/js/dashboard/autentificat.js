//----------------------------------------------------------------------------------------------------------------------
//pagina care verificam daca utilizatorul e autentificat 
//----------------------------------------------------------------------------------------------------------------------



import { auth, onAuthStateChanged } from "/assets/js/fierbase/firebase-init.js";
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "/index.html";
    }
});