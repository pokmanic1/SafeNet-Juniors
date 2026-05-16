//Pagina pentru gestionare a conectarii si inregistrarii
//ia datele din pagina si cu ajutorul metodelor registeri si login din auth.js inregistreaza/conecteaza utilizatorul 
import { register, login } from "./fierbase/auth.js";
import { auth, db, onAuthStateChanged } from "./fierbase/firebase-init.js";


console.log(auth, db);



const registerBtn = document.getElementById("registerBtn");

//ia datele din pagina cu butonul register si inregistreaza utilizatorul
if (registerBtn) {
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const role = document.getElementById("role");
    registerBtn.addEventListener("input", x);
    email.addEventListener("input", x);
    password.addEventListener("input", x);
    role.addEventListener("input", x);


    registerBtn.addEventListener("click", () => {
        const username1 = username.value;
        const email1 = email.value;
        const password1 = password.value;
        const role1 = role.value;

        register(username1, email1, password1, role1);
    });

    function x() {
        if (username.value.trim() !== "" && email.value.trim() !== ""
            && password.value.trim() !== "" && role.value !== "Selectează rol") {
            registerBtn.style.backgroundColor = "black";      

        }
        else {
            registerBtn.style.backgroundColor = "rgb(229 231 235)";  

        }
    }

}


//ia datele din pagina cu butonul logic si conecteaza  utilizatorul
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    const email1 = document.getElementById("loginEmail");
    const password1 = document.getElementById("loginPassword");
    //functia x schimba culoarea butonului dupa ce campuile au fost completate
    function x() {
        if (email1.value.trim() !== "" && password1.value.trim() !== "") {
            loginBtn.style.backgroundColor = "black";
        }
        else {
            loginBtn.style.backgroundColor = "rgb(229 231 235)";
        }
    }

    email1.addEventListener("input", x);
    password1.addEventListener("input", x);

    loginBtn.addEventListener("click", () => {
        const email = email1.value;
        const password = password1.value;

        login(email, password);
    });

}

//functia x schimba culoarea butonului dupa ce campuile au fost completate



export function checkAuthState() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
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


