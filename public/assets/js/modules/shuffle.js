//----------------------------------------------------------------------------------------------------------------------
//Jocul shuffle
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
        // window.location.href = "../../../pages/conecteazate.html";
        const DacaNuSaConectat = document.getElementById("dacaNuSaConectat");
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

        if (!snap.exists()) {
            //console.log("Nu există date.");
            return;
        }
        const data = snap.data();
        const vizitat_shuffle_game = data.documentationVisits?.shuffle;
        const counters = data.gameCounters || {};

        // Citim contoarele din Firebase
        contor_assasment_corecte = counters.shuffle_corecte || 0;
        contor_assasment_incercari = counters.shuffle_incercari || 0;

        //console.log("Datele utilizatorului vizitat_shuffle_game:", vizitat_shuffle_game);

        if (!vizitat_shuffle_game) {
            // window.location.href = "../../../pages/assessment.html";
            const DacaNuAVizitatDocu = document.getElementById("dacaNuACititDocum");
            DacaNuAVizitatDocu.classList.remove("hidden");
        }
    }
});



//----------------------------------------------------------------------------------------------------------------------
//Verificam daca in local storage e salvat un arr cu jocuri creat de profesori
// localStorage.setItem se face in pagina de clase sau creaza jocuri pentru profesori
//----------------------------------------------------------------------------------------------------------------------
let dateSalvate = JSON.parse(localStorage.getItem("shuffleGameData")) || [];
//console.log("Datele salvate de profesor -----------------------------------------");
//console.log(dateSalvate);



//----------------------------------------------------------------------------------------------------------------------
//Arraiurile sectionate pe nivele
//----------------------------------------------------------------------------------------------------------------------
let arrText1 = [], arrImaginea1 = [];
let arrText2 = [], arrImaginea2 = [];
let arrText3 = [], arrImaginea3 = [];
let arrText4 = [], arrImaginea4 = [];
//Arraiul care il folosim pentru genereare jocului
let arrText = [];
let arrImaginea = [];




//----------------------------------------------------------------------------------------------------------------------
//citim din fisierul json datele la arraiuri pe nivele si le atribui variabelelor
//----------------------------------------------------------------------------------------------------------------------
fetch('../../../assets/js/modules/date-jocuri/shuffle.json')
    .then(response => response.json())
    .then(data => {
        arrText1 = data.arrText1;
        arrImaginea1 = data.arrImaginea1;
        arrText2 = data.arrText2;
        arrImaginea2 = data.arrImaginea2;
        arrText3 = data.arrText3;
        arrImaginea3 = data.arrImaginea3;
        arrText4 = data.arrText4;
        arrImaginea4 = data.arrImaginea4;

        arrText = [...arrText1];
        arrImaginea = [...arrImaginea1];

        initializare();
    });

let nivelul = 1;
let totalSecondsElapsed = 0;



//----------------------------------------------------------------------------------------------------------------------
//Nivelul selectat de utilizator
//----------------------------------------------------------------------------------------------------------------------
const selectNivel = document.querySelector(".nivelul");
selectNivel.addEventListener('change', (event) => {
    nivelul = event.target.value;
    if (nivelul == 1) {
        arrText = arrText1;
        arrImaginea = arrImaginea1;
    } else if (nivelul == 2) {
        arrText = arrText2;
        arrImaginea = arrImaginea2;
    } else if (nivelul == 3) {
        arrText = arrText3;
        arrImaginea = arrImaginea3;
    } else if (nivelul == 4) {
        arrText = arrText4;
        arrImaginea = arrImaginea4;
    }

    jocul.innerHTML = '';
    newArr = [];
    contor = 0;
    contorPerechi = 0;
    document.querySelector(".scor").innerHTML = `Scorul : 0`;

    clearInterval(interval);

    initializare();
});


let primaIncercareId = null;
let aDouaIncercareId = null;
let contor = 0;
const DELAY = 1000;
let jocul = document.querySelector('.joc');
let interval;
let newArr = [];




//----------------------------------------------------------------------------------------------------------------------
//1)Verificam daca exista arr dat de profesor
//2)Alegem un numar random de la 1 la n si in arrail obiectul pe pozitia numarului random 
//  il introducem arr cu care il vom folosi la genrare de cartonase
//3)in newArr introducem doar nr exac de cartonase caren e trebuie
//  arr care l-am atribuit mai sus are multe imagini si texte dar in newArr alegem doar 8 din ele 
//----------------------------------------------------------------------------------------------------------------------
function genereazaPerechi() {
    if (dateSalvate.length === 0) {
        let indexuri = [];
        // 
        while (indexuri.length < 8) {
            let rand = Math.floor(Math.random() * arrText.length);
            if (!indexuri.includes(rand)) {
                indexuri.push(rand);
            }
        }

        indexuri.forEach(i => {

            newArr.push({
                id: i,
                type: "text",
                value: arrText[i]
            });

            newArr.push({
                id: i,
                type: "image",
                value: arrText[i],
                imaginea: arrImaginea[i]
            });

        });
    }
    else {
        newArr = [...dateSalvate];
    }
}
//console.log(newArr)





//----------------------------------------------------------------------------------------------------------------------
//Sorteaza random cartonasele ca sa nu fie textul langa imagine
//----------------------------------------------------------------------------------------------------------------------
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}





//----------------------------------------------------------------------------------------------------------------------
//Se creaza cartile li se adauga clasele 
//----------------------------------------------------------------------------------------------------------------------
function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = Number(item.id);

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');

    if (item.type === "image") {
        back.style.backgroundImage = `url('${item.imaginea}')`;
        back.style.backgroundSize = "cover";
        back.style.backgroundPosition = "center";
    } else {
        back.textContent = item.value;
        back.style.display = "flex";
        back.style.justifyContent = "center";
        back.style.alignItems = "center";
        back.style.fontSize = "16px";
        back.style.fontWeight = "bold";
        back.style.textAlign = "center"

    }

    card.appendChild(front);
    card.appendChild(back);

    return card;
}






//----------------------------------------------------------------------------------------------------------------------
//la click 
//1)Verificam daca sunt matched in primul rand sau daca a deja sa apasat pe el pentru a nu putea apasa de 2 ori pe acelasi cartonas
//2)Vedem daca contorul e pana la 2 poti apasa cate 2 cartonase odata (sa li se vada fata) 
//3)Daca contorul e unu la variabila prima incercare i se atribuie id-ul cardului care a fost apasat 
//  Daca contorul e doi la variabila a doua incercare i se atribuie id-ul cardului care a fost apasat 
//4)Daca cartonasele apasate auacelasi ID li se atribuie clasa matched si nu mai pot fi apasate
//5)Apoi se reseteaza tot contor 0 incercarile sunt null si toate elementele cu clasa selected sau fliped sunt sterse clasele respective
//----------------------------------------------------------------------------------------------------------------------
function Click(event) {
    const clicked = event.target.closest('.card');
    if (!clicked || clicked.classList.contains('matched') || clicked.classList.contains('selected')) return;

    if (contor < 2) {
        contor++;
        clicked.classList.add('selected', 'flipped');

        if (contor === 1) {
            primaIncercareId = clicked.dataset.id;
        } else {
            aDouaIncercareId = clicked.dataset.id;

            if (primaIncercareId === aDouaIncercareId) {
                setTimeout(match, DELAY);
            }
            setTimeout(reset, DELAY);
        }
    }
}





//----------------------------------------------------------------------------------------------------------------------
//1)La match se atribuie clasa matched care face  cartonasul verde 
//2)Creste contorul general
//3)Opreste jocul daca contorul e 8 (Toate cartonasele au fost gasite)
//4)Salveaza contoarele in fierbase
//----------------------------------------------------------------------------------------------------------------------
function match() {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('matched');

    });
    contorPerechi++;
    document.querySelector(".scor").innerHTML = `Scorul : ${contorPerechi}`;

    if (contorPerechi === 8) {

        clearInterval(interval);
        if (totalSecondsElapsed < 90) {
            contor_assasment_corecte++;
            contor_assasment_incercari++;

            // ---- FLAG QUEST ----
            localStorage.setItem('quest_shuffle_90', 'true');
            // --------------------

        } else {
            contor_assasment_incercari++;
        }

        if (totalSecondsElapsed < 120 && nivelul == 3) {
            // ---- FLAG QUEST ----
            localStorage.setItem('quest_shuffle_120_lvl_3', 'true');
            // --------------------
        }
        if (totalSecondsElapsed < 80 && nivelul == 2) {
            // ---- FLAG QUEST ----
            localStorage.setItem('quest_shuffle_80_lvl_2', 'true');
            // --------------------
        }
        if (nivelul == 4) {
            // ---- FLAG QUEST ----
            localStorage.setItem('quest_shuffle_lvl_4', 'true');
            // --------------------
        }




        if (_currentUser) {
            const userRef = doc(db, "users", _currentUser.uid);
            const updateObj = { "gameCounters.shuffle_incercari": increment(1) };
            if (totalSecondsElapsed < 90) {
                updateObj["gameCounters.shuffle_corecte"] = increment(1);
            }
            updateDoc(userRef, updateObj).catch(err => console.error("Eroare Firebase shuffle:", err));
        }


        const modal = document.getElementById("finalModal");
        modal.classList.remove("hidden");
        document.getElementById("scorFinal").innerText = `${contorPerechi} / 8`; document.getElementById("nivelFinal").innerText = nivelul;
        document.getElementById("timpFinal").innerText = document.querySelector(".time").innerText;
    }


}




//----------------------------------------------------------------------------------------------------------------------
//la reset se reseteaza tot jocul de la inceput inafara de cartonasele cu clasele matched
//----------------------------------------------------------------------------------------------------------------------
function reset() {

    primaIncercareId = null;
    aDouaIncercareId = null;
    contor = 0;

    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected', 'flipped');
    });
}





//----------------------------------------------------------------------------------------------------------------------
//Functia care incepe tot jocul de la inceput
//sterge araiul profesorului daca exista
//opreste cronometru
//si incepe jocul din nou
//----------------------------------------------------------------------------------------------------------------------
function rst() {
    localStorage.removeItem("shuffleGameData");
    primaIncercareId = null;
    aDouaIncercareId = null;
    newArr = [];
    contor = 0;
    contorPerechi = 0;
    document.querySelector(".scor").innerHTML = `Scorul : ${contorPerechi}`;


    jocul.innerHTML = '';
    clearInterval(interval);
    initializare();
}


//----------------------------------------------------------------------------------------------------------------------
//butonul restart 
//----------------------------------------------------------------------------------------------------------------------
document.querySelector(".restart").addEventListener('click', () => {
    rst();
});




//----------------------------------------------------------------------------------------------------------------------
//butonul Incearca din nou din panou joc final  
//----------------------------------------------------------------------------------------------------------------------
document.querySelector('.restart1').addEventListener('click', function () {
    rst();
    const modal = document.getElementById("finalModal");
    modal.classList.add("hidden");

});





let contorPerechi = 0;


jocul.addEventListener('click', Click);






//----------------------------------------------------------------------------------------------------------------------
//Aici se initializaraza jocul
//cu aceasta se porneste tot incepand dupa ce sau scos datele din fisierul json
//----------------------------------------------------------------------------------------------------------------------
function initializare() {
    genereazaPerechi();
    shuffle(newArr);
    pornesteCeas(0, 0);
    newArr.forEach(item => {
        const card = createCard(item);
        jocul.appendChild(card);
    });

}







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
