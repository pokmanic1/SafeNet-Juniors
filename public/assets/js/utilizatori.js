import { onAuthStateChanged, auth } from "./fierbase/firebase-init.js";

// Defensive implementation:
// - initialize utilizatori_Arr from localStorage (fallback to seed)
// - avoid referencing undefined variables during module evaluation
// - listen for auth state changes and add the user if missing

// const STORAGE_KEY = 'utilizatori';

// export const utilizatori_Arr = JSON.parse(localStorage.getItem(STORAGE_KEY) ) || [
//     {
//         User_UID: '6nHdmz1BYdSfpAgRQRbDRe5eWbk1',
//         Nume: 'Petru',
//         Email: 'cozma.petru@elev.cihcahul.md',
//         Role: 'elev'
//     }
// ];

// function save() {
//     try {
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(utilizatori_Arr));
//     } catch (e) {
//         console.warn('Could not save utilizatori to localStorage', e);
//     }
// }

if (typeof onAuthStateChanged === 'function') {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userData = utilizatori_Arr.find(u => u.User_UID === user.uid);
            if (userData) {
                console.log('User is authenticated (local):', userData);
            } else {
                const newUser = {
                    User_UID: user.uid,
                    Nume: user.displayName || '',
                    Email: user.email || '',
                    Role: 'elev'
                };
                utilizatori_Arr.push(newUser);
                save();
                console.log('Added user to utilizatori_Arr (local):', newUser);
            }
        } else {
            console.log('User is not authenticated');
        }
        console.log('Authenticated Firebase user (raw):', user);
    });
}

console.log('-----------------------------');
console.log('Current utilizatori_Arr:', utilizatori_Arr);

// persist current state (no-op if identical)
save();


