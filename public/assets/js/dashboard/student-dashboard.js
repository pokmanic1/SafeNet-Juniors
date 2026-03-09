import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";
console.log(auth)
const x = document.getElementById("ConecteazataID");
const y = document.getElementById("InregistreazataID");

onAuthStateChanged(auth, (user) => {
    if (user) {
        x.innerHTML = `
        <div class="flex items-center">
            <p  class="w-[60px] text-[13px] ">Conectata  ${user.email}</p>
            <button class="butonDashboard w-8 h-8 rounded-[40px] bg-black border-0" ></button>
        </div>`;
        y.style.display = "none";


        console.log(`Bună ziua, ${user.email}`)
    } else {

        console.log('conecteazate');

    }
});

document.querySelector('.butonDashboard').addEventListener('click',()=>{

    
    
});