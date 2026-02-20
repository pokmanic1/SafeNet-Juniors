import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../conecteazate.html";
    }
});



const Conditii = [
    {
        text: "Minim 8 caractere",
        validate: (password) => password.length >= 8
    },
    {
    
        text: "Conține o literă mare",
        validate: (password) => /[A-Z]/.test(password)
    },
    {
    
        text: "Conține o cifră",
        validate: (password) => /\d/.test(password)
    },
    {
    
        text: "Conține un caracter special",
        validate: (password) => /[!@#$%^&*]/.test(password)
    },
    {
    
        text: "Conține cuvântul 'safe'",
        validate: (password) => password.includes("safe")
    },
    {
    
        text: "Are cel puțin 2 cifre",
        validate: (password) => (password.match(/\d/g) || []).length >= 2
    },
    {
    
        text: "Nu conține spații",
        validate: (password) => !password.includes(" ")
    },
    {
        text: "Conține o lună din an",
        validate: (password) =>
            /(ianuarie|februarie|martie|aprilie|mai|iunie|iulie|august|septembrie|octombrie|noiembrie|decembrie)/i.test(password)
    },
    {
        text: "Are lungime pară",
        validate: (password) => password.length % 2 === 0
    },
    {
        
        text: "Conține '2024'",
        validate: (password) => password.includes("2024")
    }
];


let newArrConditii=[];
let arrIndex=[];
creareArr();
function creareArr() {
    for (let i = 0; i < 5; i++) {
        let nr;
        let adv = true;
        while (adv) {
            let mem =false;
            nr = Math.floor(Math.random() *  Conditii.length);
            for (let j = 0; j < arrIndex.length; j++) {
                if(nr===arrIndex[j]){
                    mem=true;
                }
            }
                if ( !mem) {
                    adv = false;
                    console.log(nr);
                    arrIndex.push(nr);
                }
                

        }
        for (let j = 0; j < Conditii.length; j++) {
            if (nr === j) {
                newArrConditii.push(Conditii[j]);

            }
        }

    }
}

console.log(newArrConditii)
let contor=0;

const container = document.getElementById("conditiiContainer");
const input = document.querySelector(".input-parola");

function afisareConditii() {

    newArrConditii.forEach((conditie, index) => {

        const div = document.createElement("div");

        div.id = "conditie-" + index;

        div.className = `
            p-4
            border-2
            border-black
            rounded-xl
            bg-red-200
            text-center
            font-semibold
            transition
        `;

        div.textContent = conditie.text;

        container.appendChild(div);
    });

}

function verificaParola(password) {

    let completate = 0;

    newArrConditii.forEach((conditie, index) => {

        const element = document.getElementById("conditie-" + index);

        if (conditie.validate(password)) {

            element.classList.remove("bg-red-200");
            element.classList.add("bg-green-300");

            completate++;

        } else {

            element.classList.remove("bg-green-300");
            element.classList.add("bg-red-200");

        }

    });

    if (completate === newArrConditii.length) {

        container.insertAdjacentHTML("afterend", `
            <div id="winMessage" class="mt-6 text-2xl font-bold text-green-600">
                Ai câștigat jocul!
            </div>
        `);

        input.disabled = true;

    }

}

input.addEventListener("input", (e) => {
    verificaParola(e.target.value);
});

afisareConditii();
 

// function genereazaHTML(){
//     if(contor<5){
//         document.querySelector('.restart').innerHTML = "";
//         document.querySelector('.numarul').innerHTML=`Conditita ${contor}`;
//         document.querySelector('.conditia').innerHTML=`${newArrConditii[contor].text}`;
//     }
//     else
//     {
//         document.querySelector('.input-parola').innerHTML=`
//                     <h1 class="text-3xl font-bold mb-[50px] mt-[100px]">ai finalizat jocul</h1>`;
//         document.querySelector('.conditia').style.display='none';
//         document.querySelector('.continua').style.display='none';
//         document.querySelector('.restart').innerHTML=` <button class="restart mt-[20px]"> restart</button>`;
        
//     }
// }
// function initializare(){
//     genereazaHTML();
// }

// document.querySelector('.continua').addEventListener('click' , function(){
//     contor++;
//     genereazaHTML
// });



// initializare();