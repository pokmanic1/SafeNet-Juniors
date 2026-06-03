//----------------------------------------------------------------------------------------------------------------------
//Jocul True False
//----------------------------------------------------------------------------------------------------------------------
import { auth, onAuthStateChanged } from "/assets/js/fierbase/firebase-init.js";
import { db } from "/assets/js/fierbase/firebase-init.js";
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
        if (!snap.exists()) return;

        const data = snap.data();
        const vizitat_truefalse_game = data.documentationVisits?.true_false;
        const counters = data.gameCounters || {};

        contor_assasment_corecte  = counters.truefalse_corecte  || 0;
        contor_assasment_incercari = counters.truefalse_incercari || 0;

        //console.log("Utilizator autentificat, vizitat_truefalse_game:", vizitat_truefalse_game);
        if (!vizitat_truefalse_game) {
            const DacaNuAVizitatDocu = document.getElementById("dacaNuACititDocum");
            DacaNuAVizitatDocu.classList.remove("hidden");
        }
    }
});








//----------------------------------------------------------------------------------------------------------------------
//Verificam daca in local storage e salvat un arr cu jocuri creat de profesori
// localStorage.setItem se face in pagina de clase sau creaza jocuri pentru profesori
//----------------------------------------------------------------------------------------------------------------------
let dateSalvate = JSON.parse(localStorage.getItem("intrebariTrueFalse")) || [];






//----------------------------------------------------------------------------------------------------------------------
//Arraiurile sectionate pe nivele
//----------------------------------------------------------------------------------------------------------------------
let arr1 = [], arr2 = [], arr3 = [], arr4 = [];
//Arraiul care il folosim pentru genereare jocului
let arr = [];






//----------------------------------------------------------------------------------------------------------------------
//citim din fisierul json datele la arraiuri pe nivele si le atribui variabelelor
//----------------------------------------------------------------------------------------------------------------------
fetch('/assets/js/modules/date-jocuri/true-false-game.json')
    .then(response => response.json())
    .then(data => {
        arr1 = data.arr1;
        arr2 = data.arr2;
        arr3 = data.arr3;
        arr4 = data.arr4;
        arr = [...arr1];
        creareArr();
        initializare();
    });




//----------------------------------------------------------------------------------------------------------------------
//Nivelul selectat de utilizator
//----------------------------------------------------------------------------------------------------------------------
let newArr = [];
let arrCuExercitii = [];
let arrIndex = [];

const selectNivel = document.querySelector(".nivelul");
let nivelul = 1;
selectNivel.addEventListener('change', (event) => {
    nivelul = event.target.value;
    if (nivelul == 1) {
        arr = arr1;
        //console.log("nivelul a fost schimbat");

    } else if (nivelul == 2) {
        arr = arr2;
        //console.log("nivelul a fost schimbat");

    } else if (nivelul == 3) {
        arr = arr3; 
        //console.log("nivelul a fost schimbat");

    } else if (nivelul == 4) {
        arr = arr4; 
        //console.log("nivelul a fost schimbat");

    }
    clearInterval(interval);
    restart();

});





//----------------------------------------------------------------------------------------------------------------------
//1)Verificam daca exista arr dat de profesor
//2)Alegem un numar random de la 1 la n si in arrail obiectul pe pozitia numarului random 
//  il introducem arr cu care il vom folosi la genrare de cartonase
//3)in newArr introducem doar nr exac de conditii care ne trebuie
//  arr care l-am atribuit mai sus are multe conditii si alegem doar 10 din ele
//----------------------------------------------------------------------------------------------------------------------
let contor = 0;
let contorCorect = 0;
let interval;
function creareArr() {
    newArr = [];
    arrCuExercitii = [];
    arrIndex = [];

    if (dateSalvate && dateSalvate.length > 0) {
        //console.log("Folosim întrebările profesorului.");
        arrCuExercitii = [...dateSalvate];
    }
    else {
        //console.log("Folosim întrebările default.");
        for (let i = 0; i < 10; i++) {
            let nr;
            let adv = true;
            while (adv) {
                let mem = false;
                nr = Math.floor(Math.random() * arr.length);
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

            newArr.push(arr[nr]);
        }

        for (let i = 0; i < newArr.length; i++) {
            let nrPropozitie = Math.floor(Math.random() * 3);
            arrCuExercitii.push(newArr[i].propozitii[nrPropozitie]);
        }
    }
}




//----------------------------------------------------------------------------------------------------------------------
//geneream HTML schimbam textle din html cu celele din arr de x ori x-nr de inrebari
//dupa ce a trecut de x ori afisam panoul de final 
//verificam daca raspuns de un numar specific de ore cucare consideeram daca a castigat sau nu jocul
//Salvam in fiebase datele despre cate ori a incercat si de cate ori a castigat
//----------------------------------------------------------------------------------------------------------------------
function genereazaHTML() {
    if (contor < arrCuExercitii.length) {

        document.querySelector('#true').style.display = 'inline-block';
        document.querySelector('#false').style.display = 'inline-block';

        document.querySelector('.nrIntrebare').innerHTML = `Intrebare: ${contor + 1}`;
        document.querySelector('.textIntrebare').innerHTML = `${arrCuExercitii[contor].text}`;
        document.querySelector(".scorul").innerHTML = `Scor: ${contorCorect}`;
        document.querySelector(".scorul").style.display = 'block';

    }
    else {

        document.querySelector(".scorul").innerHTML = `Scor Final: ${contorCorect}`;
        document.querySelector('.textIntrebare').innerHTML =
            `Ai răspuns corect la ${contorCorect} întrebări din ${arrCuExercitii.length}.`;

        document.querySelector('#true').style.display = 'none';
        document.querySelector('#false').style.display = 'none';
        clearInterval(interval);

        if (contorCorect > 6) {

            contor_assasment_corecte++;
            contor_assasment_incercari++;

            // ---- FLAG QUEST ----
            localStorage.setItem('quest_truefalse_7', 'true');
            // --------------------

        }
        else {
            contor_assasment_incercari++;
        }



        if (contorCorect > 6 && nivelul == 3) {
            // ---- FLAG QUEST ----
            localStorage.setItem('quest_truefalse_7_lvl_3', 'true');
            // --------------------
        }
        if (contorCorect > 6 && nivelul == 2) {
            // ---- FLAG QUEST ----
            localStorage.setItem('quest_truefalse_lvl_2', 'true');
            // --------------------
        }
        if (nivelul == 4) {
            // ---- FLAG QUEST ----
            localStorage.setItem('quest_truefalse_lvl_4', 'true');
            // --------------------
        }











        if (_currentUser) {
            const userRef = doc(db, "users", _currentUser.uid);
            const updateObj = { "gameCounters.truefalse_incercari": increment(1) };
            if (contorCorect > 6) {
                updateObj["gameCounters.truefalse_corecte"] = increment(1);
            }
            updateDoc(userRef, updateObj).catch(err => console.error("Eroare Firebase truefalse:", err));
        }


        const modal = document.getElementById("finalModal");
        modal.classList.remove("hidden");

        document.getElementById("scorFinal").innerText = `${contorCorect} / ${arrCuExercitii.length}`;
        document.getElementById("nivelFinal").innerText = nivelul;
        document.getElementById("timpFinal").innerText = document.querySelector(".time").innerText;
    }
}





//----------------------------------------------------------------------------------------------------------------------
//Verificam daca raspunsul apasat de utilizator e acelasi ca cel din Arr
//Daca da marim contorul pentru raspunsul corect
//----------------------------------------------------------------------------------------------------------------------
function dacaECorect(raspunsUtilizator) {
    {
        if (raspunsUtilizator === arrCuExercitii[contor].raspuns) {
            contorCorect++;
        }
        else {
            contorCorect = contorCorect;
        }
        contor++;
    }
}




//----------------------------------------------------------------------------------------------------------------------
//Butonul true din html daca daca e apasat se duce  variabila true la functia DacaE corect
//----------------------------------------------------------------------------------------------------------------------

document.querySelector('#true').addEventListener('click', function () {
    dacaECorect(true);
    genereazaHTML();
});
//----------------------------------------------------------------------------------------------------------------------
//Butonul false din html daca daca e apasat se duce  variabila false la functia DacaE corect
//----------------------------------------------------------------------------------------------------------------------

document.querySelector('#false').addEventListener('click', function () {
    dacaECorect(false);
    genereazaHTML();
});

//----------------------------------------------------------------------------------------------------------------------
//butonul restart 
//----------------------------------------------------------------------------------------------------------------------
document.querySelector('.restart').addEventListener('click', function () {
    restart();
});
//----------------------------------------------------------------------------------------------------------------------
//butonul Incearca din nou din panou joc final  
//----------------------------------------------------------------------------------------------------------------------
document.querySelector('.restart1')?.addEventListener('click', function () {
    restart();
    document.getElementById("finalModal").classList.add("hidden");
});

//----------------------------------------------------------------------------------------------------------------------
//butonul #restart-btn din modal final (adaugat o singura data)
//----------------------------------------------------------------------------------------------------------------------
document.querySelector('#restart-btn')?.addEventListener('click', function () {
    restart();
    document.getElementById("finalModal").classList.add("hidden");
});








//----------------------------------------------------------------------------------------------------------------------
//Functia care incepe tot jocul de la inceput
//sterge araiul profesorului daca exista
//opreste cronometru
//si incepe jocul din nou
//----------------------------------------------------------------------------------------------------------------------
function restart() {
    localStorage.removeItem("intrebariTrueFalse");

    dateSalvate = [];

    contor = 0;
    contorCorect = 0;
    newArr = [];
    arrCuExercitii = [];
    arrIndex = [];

    creareArr();
    genereazaHTML();
    clearInterval(interval);
    pornesteCeas(0, 0);
    //console.log("Jocul a fost resetat la întrebările implicite.");
}







//----------------------------------------------------------------------------------------------------------------------
//Aici se initializaraza jocul
//cu aceasta se porneste tot incepand dupa ce sau scos datele din fisierul json
//----------------------------------------------------------------------------------------------------------------------
function initializare() {
    pornesteCeas(0, 0);
    genereazaHTML()
}






//----------------------------------------------------------------------------------------------------------------------
//Cronometrul
//----------------------------------------------------------------------------------------------------------------------
function pornesteCeas(minute, secunde) {

    interval = setInterval(() => {

        document.querySelector(".time").innerHTML = `${String(minute).padStart(2, '0')}:${String(secunde).padStart(2, '0')}`;


        secunde++;

        if (secunde === 60) {
            secunde = 0;
            minute++;
        }

        if (minute === 59 && secunde === 59) {

            clearInterval(interval);

        }

    }, 1000);

}