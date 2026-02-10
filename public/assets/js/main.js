import { register, login } from "./fierbase/auth.js";
import { auth, db } from "./fierbase/firebase-init.js";

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


