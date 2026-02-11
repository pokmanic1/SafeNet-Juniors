import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";

const greetingDiv = document.getElementById("userGreeting");

onAuthStateChanged(auth, (user) => {
    if (user) {

        greetingDiv.innerHTML = `<h2>Bună ziua, ${user.email}</h2>`;

    } else {
        greetingDiv.innerHTML = `
            <h2>Conectează-te</h2>
            <a href="index.html">Login</a>
        `;
    }
});

