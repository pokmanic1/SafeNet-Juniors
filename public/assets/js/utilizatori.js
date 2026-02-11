import { utilizator } from "./main.js";
import { onAuthStateChanged, auth } from "./fierbase/firebase-init.js";

// users array (example/test data)
export const utilizatori_Arr = [
    {
        User_UID: '6nHdmz1BYdSfpAgRQRbDRe5eWbk1',
        Nume: 'Petru',
        Email: 'cozma.petru@elev.cihcahul.md',
        Parola: 'aaaaa'
    }
];

// Listen for auth state changes and compare to local users array
if (typeof onAuthStateChanged === 'function') {
    onAuthStateChanged(auth, (user) => {
        if (user && utilizator) {
            const userData = utilizatori_Arr.find(u => u.User_UID === utilizator.User_UID);
            if (userData) {
                console.log("User is authenticated:", userData);
            } else {
                console.log("User is authenticated but not found in database");
            }
        } else {
            console.log("User is not authenticated");
        }
        console.log("Current utilizator object:", utilizator);
    });
}