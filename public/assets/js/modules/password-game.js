import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";

const dateSalvate = JSON.parse(localStorage.getItem("conditiiProfesori")) || [];
let newArrConditii1 = [];

dateSalvate.forEach(element => {
    let obj = {
        text: element.valoare ? `${element.conditie}: ${element.valoare}` : element.conditie,
        validate: null
    };

    // Construim logica de validare bazată pe textul condiției
    switch (element.conditie) {
        case "Să conțină un numar":
            obj.validate = (password) => /\d/.test(password);
            break;

        case "Să conțină un cuvânt specific":
            obj.validate = (password) => password.includes(element.valoare);
            break;

        case "Sa aiba un numar minim de caractere":
            obj.validate = (password) => password.length >= parseInt(element.valoare);
            break;

        case "Sa contina o litera mare":
            obj.validate = (password) => /[A-Z]/.test(password);
            break;

        case "Sa contina un caracter special":
            obj.validate = (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password);
            break;

        case "Sa aiba un numar minim de cifre":
            obj.validate = (password) => (password.match(/\d/g) || []).length >= parseInt(element.valoare);
            break;

        case "Sa nu contina spatii":
            obj.validate = (password) => !password.includes(" ");
            break;

        case "Sa aiba lungime para":
            obj.validate = (password) => password.length % 2 === 0;
            break;

        case "Sa aiba lungime impara":
            obj.validate = (password) => password.length % 2 !== 0;
            break;

        case "Sa contine un numar specifica": // Atenție la typo-ul din HTML "specifica"
            obj.validate = (password) => password.includes(element.valoare);
            break;

        case "Sa contine o litera specifica":
            obj.validate = (password) => password.includes(element.valoare);
            break;

        default:
            obj.validate = (password) => true;
    }

    newArrConditii1.push(obj);
});

console.log("Condiții profesor încărcate:", newArrConditii1);

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

let numarDeConditii=4;

const selectNivel = document.querySelector(".nivelul");
let nivelul = 1;
selectNivel.addEventListener('change', (event) => {
    nivelul = event.target.value;
        if (nivelul == 1) {numarDeConditii=4;} 

        else if (nivelul == 2) {numarDeConditii=5;} 

        else if (nivelul == 3) {numarDeConditii=6; } 

        else if (nivelul == 4) {numarDeConditii=7;}
    restart()

});






let newArrConditii=[];
let arrIndex=[];
creareArr();
function creareArr() {
    if (newArrConditii1.length === 0) {
        console.log("Generăm condiții aleatorii...");
        for (let i = 0; i < numarDeConditii; i++) { 
            let nr;
            let adv = true;
            while (adv) {
                let mem = false;
                nr = Math.floor(Math.random() * Conditii.length);
                for (let j = 0; j < arrIndex.length; j++) {
                    if (nr === arrIndex[j]) {
                        mem = true;
                    }
                }
                if (!mem) {
                    adv = false;
                    arrIndex.push(nr);
                }
            }
            newArrConditii.push(Conditii[nr]);
        }
    } 
    else {
        console.log("Folosim condițiile profesorului.");
        newArrConditii = [...newArrConditii1];
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
            p-2
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

document.querySelector('.restart').addEventListener('click',function (){
    restart();
})

function restart() {
    const win = document.querySelector('#winMessage');
    if (win) {
        win.remove();
    }

    container.innerHTML = "";
    input.disabled = false;
    input.value = ""; 
    localStorage.removeItem("conditiiProfesori");

    contor = 0;
    newArrConditii = [];
    arrIndex = [];
    
    newArrConditii1 = []; 

    creareArr();
    
    afisareConditii();
}

input.addEventListener("input", (e) => {
    verificaParola(e.target.value);
});

afisareConditii();
 


// -------------------------------------
//pentru profesori



































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