
import { register, login } from "./fierbase/auth.js";
import { auth, db, onAuthStateChanged } from "./fierbase/firebase-init.js";
//import { utilizatori_Arr } from "./utilizatori.js";
console.log(auth, db);



const registerBtn = document.getElementById("registerBtn");


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
        if(username.value.trim() !== "" && email.value.trim() !== ""
            && password.value.trim() !== "" && role.value.trim() !== ""){
            registerBtn.style.backgroundColor = "black";
    }
}

}
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    const email1 = document.getElementById("loginEmail");
    const password1 = document.getElementById("loginPassword");

    function x() {
        if (email1.value.trim() !== "" && password1.value.trim() !== "") {
            loginBtn.style.backgroundColor = "black";
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
           // const userData = utilizatori_Arr.find(u => u.User_UID === user.uid);
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

