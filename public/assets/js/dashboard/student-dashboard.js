import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";



onAuthStateChanged(auth, (user) => {
    if (user) {

        console.log(`Bună ziua, ${user.email}`)
    } else {
        console.log('conecteazate')
    }
});

