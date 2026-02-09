import { register, login } from "./firebase/auth.js";
import { auth, db } from "./firebase/firebase-init.js";

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


//aici legam fisiere fiebase cu fisieurm indexhtml
