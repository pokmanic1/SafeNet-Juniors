//----------------------------------------------------------------------------------------------------------------------
//Jocul Password
//----------------------------------------------------------------------------------------------------------------------
import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";
import { db } from "../fierbase/firebase-init.js";
import {
    doc,
    getDoc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";




//----------------------------------------------------------------------------------------------------------------------
//Verificam daca e conectat daca nu insereaza panoul de conectare din materialHTML inserturi
//----------------------------------------------------------------------------------------------------------------------
onAuthStateChanged(auth, (user) => {
    if (!user) {
        const DacaNuSaConectat=document.getElementById("dacaNuSaConectat");
        DacaNuSaConectat.classList.remove("hidden");
    }
});







//----------------------------------------------------------------------------------------------------------------------
//Verificam daca e conectat si daca e conectat 
// din fierbase verificam daca a vizitat documentatia 
// si luam contoarele de cate ori a castigat jocul si de cate ori a incercat sa joace
//----------------------------------------------------------------------------------------------------------------------
let contor_assasment_corecte = 0;
let contor_assasment_incercari = 0;
let _currentUser = null;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        _currentUser = user;
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (!snap.exists()) return;

        const data = snap.data();
        const vizitat_password_game = data.documentationVisits?.password;
        const counters = data.gameCounters || {};

        contor_assasment_corecte  = counters.password_corecte  || 0;
        contor_assasment_incercari = counters.password_incercari || 0;

        if (!vizitat_password_game) {
            // window.location.href = "../../../pages/assessment.html";
            const DacaNuAVizitatDocu= document.getElementById("dacaNuACititDocum");
            DacaNuAVizitatDocu.classList.remove("hidden");
        }
    }
});
    







//----------------------------------------------------------------------------------------------------------------------
//Verificam daca in local storage e salvat un arr cu jocuri creat de profesori
// localStorage.setItem se face in pagina de clase sau creaza jocuri pentru profesori
//----------------------------------------------------------------------------------------------------------------------
const dateSalvate = JSON.parse(localStorage.getItem("conditiiProfesori")) || [];
let newArrConditii1 = [];



//----------------------------------------------------------------------------------------------------------------------
//luam fiecare conditie care a adaugato profesorul si ii dam o  expresie regulata
//apoi il adaugam in arr cu conditii create de profesor
//----------------------------------------------------------------------------------------------------------------------
dateSalvate.forEach(element => {
    let obj = {
        text: element.valoare ? `${element.conditie}: ${element.valoare}` : element.conditie,
        validate: null
    };

    switch (element.conditie) {
        case "Să conțină un număr":
            obj.validate = (password) => /\d/.test(password); 
            break;

        case "Să conțină un cuvânt specific":
            obj.validate = (password) => password.includes(element.valoare); 
            break;

        case "Să aibă un număr minim de caractere":
            obj.validate = (password) => password.length >= parseInt(element.valoare); 
            break;

        case "Să conțină o literă mare":
            obj.validate = (password) => /[A-Z]/.test(password); 
            break;

        case "Să conțină un caracter special":
            obj.validate = (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password); 
            break;

        case "Să aibă un număr minim de cifre":
            obj.validate = (password) => (password.match(/\d/g) || []).length >= parseInt(element.valoare); 
            break;

        case "Să nu conțină spații":
            obj.validate = (password) => !password.includes(" "); 
            break;

        case "Să aibă lungime pară":
            obj.validate = (password) => password.length % 2 === 0; 
            break;

        case "Să aibă lungime impară":
            obj.validate = (password) => password.length % 2 !== 0; 
            break;

        case "Să conțină un număr specific": 
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




//----------------------------------------------------------------------------------------------------------------------
//Arraiurile sectionate pe nivele
//fiecare conditie are textul si o metoda(o verificare a expresiei regulate)
//passwordul e valoare inputului care vin din html ce a pus utilizatorul
//----------------------------------------------------------------------------------------------------------------------
const Conditii1 = [
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
const Conditii2 = [
    { text: "Minim 10 caractere", validate: (p) => p.length >= 10 },
    { text: "Conține cel puțin 3 cifre", validate: (p) => (p.match(/\d/g) || []).length >= 3 },
    { text: "Conține o lună din an (ex: mai, iunie)", validate: (p) => /(ianuarie|februarie|martie|aprilie|mai|iunie|iulie|august|septembrie|octombrie|noiembrie|decembrie)/i.test(p) },
    { text: "Conține un simbol de monedă ($, €, £)", validate: (p) => /[$€£]/.test(p) },
    { text: "Include numele 'Net'", validate: (p) => p.includes("Net") },
    { text: "Lungimea parolei este număr par", validate: (p) => p.length % 2 === 0 },
    { text: "Conține o cifră impară (1, 3, 5, 7, 9)", validate: (p) => /[13579]/.test(p) }
];

const Conditii3 = [
    { text: "Minim 12 caractere", validate: (p) => p.length >= 12 },
    { text: "Conține un număr prim de o cifră (2, 3, 5 sau 7)", validate: (p) => /[2357]/.test(p) },
    { text: "Suma primelor două cifre din parolă este 10", validate: (p) => {
        const digits = p.match(/\d/g);
        return digits && digits.length >= 2 && (parseInt(digits[0]) + parseInt(digits[1]) === 10);
    }},
    { text: "Conține o culoare (rosu, verde, albastru)", validate: (p) => /(rosu|verde|albastru|galben|negru|alb)/i.test(p) },
    { text: "Include un an din secolul 21 (2000-2099)", validate: (p) => /20\d{2}/.test(p) },
    { text: "Conține cel puțin 2 litere mari", validate: (p) => (p.match(/[A-Z]/g) || []).length >= 2 },
    { text: "Nu are caractere care se repetă consecutiv (ex: 'aa')", validate: (p) => !/(.)\1/.test(p) }
];
const Conditii4 = [
    { text: "Lungime exactă de 16 caractere", validate: (p) => p.length === 16 },
    { text: "Conține un prefix de protocol securizat (https)", validate: (p) => p.toLowerCase().includes("https") },
    { text: "Conține un numeral roman (I, V, X, L, C)", validate: (p) => /[IVXLC]/.test(p) },
    { text: "Include extensia unui fișier periculos (.exe, .bat, .vbs)", validate: (p) => /(\.exe|\.bat|\.vbs)/i.test(p) },
    { text: "Ultimele 3 caractere sunt litere mici", validate: (p) => /[a-z]{3}$/.test(p) },
    { text: "Conține cel puțin 3 caractere speciale diferite", validate: (p) => new Set(p.match(/[!@#$%^&*(),.?":{}|<>]/g)).size >= 3 },
    { text: "Conține un număr format din 3 cifre", validate: (p) => /\d{3}/.test(p) }
];





//----------------------------------------------------------------------------------------------------------------------
//Nivelul selectat de utilizator
//----------------------------------------------------------------------------------------------------------------------
let numarDeConditii=4;
let interval;
const selectNivel = document.querySelector(".nivelul");
let nivelul = 1;
let Conditii = [...Conditii1]; 
let totalSecondsElapsed = 0;
selectNivel.addEventListener('change', (event) => {
    nivelul = parseInt(event.target.value);
    
    if (nivelul == 1) { 
        Conditii = [...Conditii1]; 
        numarDeConditii = 4; 
    } 
    else if (nivelul == 2) { 
        Conditii = [...Conditii2]; 
        numarDeConditii = 5; 
    } 
    else if (nivelul == 3) { 
        Conditii = [...Conditii3]; 
        numarDeConditii = 6; 
    } 
    else if (nivelul == 4) { 
        Conditii = [...Conditii4]; 
        numarDeConditii = 7; 
    }

    restart(); 
    clearInterval(interval);
    pornesteCeas(0, 0);
});







//----------------------------------------------------------------------------------------------------------------------
//1)Verificam daca exista arr dat de profesor
//2)Alegem un numar random de la 1 la n si in arrail obiectul pe pozitia numarului random 
//  il introducem arr cu care il vom folosi la genrare de cartonase
//3)in newArr introducem doar nr exac de conditii care ne trebuie
//  arr care l-am atribuit mai sus are multe conditii si alegem doar 10 din ele
//----------------------------------------------------------------------------------------------------------------------
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



//----------------------------------------------------------------------------------------------------------------------
//geneream HTML a toate conditiilor 
//----------------------------------------------------------------------------------------------------------------------
const container = document.getElementById("conditiiContainer");
const input = document.querySelector(".input-parola");
function afisareConditii() {

    newArrConditii.forEach((conditie, index) => {

        const div = document.createElement("div");

        div.id = "conditie-" + index;
        
        div.className = `
            py-[16px]
            //border-2
            //border-black
            rounded-xl
            bg-[#1156EA]
            text-center
            font-semibold
            transition
            text-white
            
        `;

        div.textContent = conditie.text;

        container.appendChild(div);
    });

}








//----------------------------------------------------------------------------------------------------------------------
//Verificam daca conditia e completata si ii schimbam culoarea
//dupa ce a  completat toate condiitiile
//Afisam panoul de final de joc
//Salvam in fiebase datele despre cate ori a incercat si de cate ori a castigat
//----------------------------------------------------------------------------------------------------------------------
function verificaParola(password) {

    let completate = 0;

    newArrConditii.forEach((conditie, index) => {

        const element = document.getElementById("conditie-" + index);

        if (conditie.validate(password)) {

            element.classList.remove("bg-[#1156EA]");
            element.classList.add("bg-[#22C55E]");
            element.classList.add("shadow-[0_0_15px_#22C55E]");
            completate++;

        } else {    

            element.classList.remove("bg-[#22C55E]");
            element.classList.add("bg-[#1156EA]");
            element.classList.remove("shadow-[0_0_15px_#22C55E]");
        }

    });

    if (completate === newArrConditii.length) {

        container.insertAdjacentHTML("afterend", `
            <div id="winMessage" class="mt-6 text-2xl font-bold text-green-600">
                Ai câștigat jocul!
            </div>
        `);

            if (totalSecondsElapsed < 60) { 
                contor_assasment_corecte++;
                contor_assasment_incercari++;

                // ---- FLAG QUEST ----
                localStorage.setItem('quest_password_60', 'true');
                // --------------------

            } else {
                contor_assasment_incercari++;  
            }
            const modal = document.getElementById("finalModal");
            modal.classList.remove("hidden");

            document.getElementById("scorFinal").innerText = `${newArrConditii.length} / ${newArrConditii.length}`;
            document.getElementById("nivelFinal").innerText = nivelul;
            document.getElementById("timpFinal").innerText = document.querySelector(".time").innerText;

            if (_currentUser) {
                const userRef = doc(db, "users", _currentUser.uid);
                const updateObj = { "gameCounters.password_incercari": increment(1) };
                if (totalSecondsElapsed < 60) {
                    updateObj["gameCounters.password_corecte"] = increment(1);
                }
                updateDoc(userRef, updateObj).catch(err => console.error("Eroare Firebase password:", err));
            }



        clearInterval(interval);
        input.disabled = true;
            
    }

}






//----------------------------------------------------------------------------------------------------------------------
//butonul restart 
//----------------------------------------------------------------------------------------------------------------------
document.querySelector('.restart').addEventListener('click',function (){
    restart();
})


//----------------------------------------------------------------------------------------------------------------------
//butonul Incearca din nou din panou joc final  
//----------------------------------------------------------------------------------------------------------------------
document.querySelector('.restart1').addEventListener('click', function () {
    restart();
    
    const modal = document.getElementById("finalModal");
    modal.classList.add("hidden");

});






//----------------------------------------------------------------------------------------------------------------------
//Functia care incepe tot jocul de la inceput
//sterge araiul profesorului daca exista
//opreste cronometru
//si incepe jocul din nou
//----------------------------------------------------------------------------------------------------------------------
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
    clearInterval(interval);
    pornesteCeas(0, 0);
}





//----------------------------------------------------------------------------------------------------------------------
//Verificam de fiecare data cand a adaugat cevain imput 
// si transmitem valoare catre metoda verificaParola care testeaza daca se indeplinesc cerintele 
//----------------------------------------------------------------------------------------------------------------------
input.addEventListener("input", (e) => {
    verificaParola(e.target.value);
});





//----------------------------------------------------------------------------------------------------------------------
//Aici se initializaraza jocul
//cu aceasta se porneste tot 
//----------------------------------------------------------------------------------------------------------------------
function initializare() {
afisareConditii();
pornesteCeas(0, 0);
}
initializare();




//----------------------------------------------------------------------------------------------------------------------
//Cronometrul
//----------------------------------------------------------------------------------------------------------------------
function pornesteCeas(minute, secunde) {

    interval = setInterval(() => {

        document.querySelector(".time").innerHTML = `${String(minute).padStart(2, '0')}:${String(secunde).padStart(2, '0')}`;


        secunde++;
        totalSecondsElapsed++;
        if (secunde === 60) {
            secunde = 0;
            minute++;
        }

        if (minute === 59 && secunde === 59) {

            clearInterval(interval);

        }

    }, 1000);

}