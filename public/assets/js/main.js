
import { register, login } from "./fierbase/auth.js";
import { auth, db, onAuthStateChanged } from "./fierbase/firebase-init.js";
import { utilizatori_Arr } from "./utilizatori.js";
console.log(auth, db);


   
  

document.getElementById("registerBtn").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    register(username, email, password, role);
});

document.getElementById("loginBtn").addEventListener("click", () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    login(email, password);
});

//  const username = document.getElementById("username").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const role = document.getElementById("role").value;

//     let utilizator={
//         User_UID: '',
//         Nume: username,
//         Email: email,
//         Parola: password,
//         Role: role
//     };

//   console.log("------------------------------");
//     console.log("------------------------------");
//     console.log("Current utilizator object:", utilizator);


export function checkAuthState() {
    onAuthStateChanged(auth, (user) => {
        if (user) { 
            const userData = utilizatori_Arr.find(u => u.User_UID === user.uid);
            if (userData) {
                console.log("User is authenticated:", userData);
            } else {
                console.log("User is authenticated but not found in database");
            }
        } else {
            console.log("User is not authenticated");
        }
        
    });
};

//export { utilizator };

