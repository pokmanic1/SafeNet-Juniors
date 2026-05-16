import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";
import { db } from "../fierbase/firebase-init.js";
import {
    doc,
    getDoc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
onAuthStateChanged(auth, (user) => {
    if (!user) {
        const DacaNuSaConectat = document.getElementById("dacaNuSaConectat");
        DacaNuSaConectat.classList.remove("hidden");
    }
});

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

        console.log("Utilizator autentificat, vizitat_truefalse_game:", vizitat_truefalse_game);
        if (!vizitat_truefalse_game) {
            const DacaNuAVizitatDocu = document.getElementById("dacaNuACititDocum");
            DacaNuAVizitatDocu.classList.remove("hidden");
        }
    }
});









let dateSalvate = JSON.parse(localStorage.getItem("intrebariTrueFalse")) || [];



let arr1 = [], arr2 = [], arr3 = [], arr4 = [];
let arr = [];

fetch('../../../assets/js/modules/date-jocuri/true-false-game.json')
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




let newArr = [];
let arrCuExercitii = [];
let arrIndex = [];

const selectNivel = document.querySelector(".nivelul");
let nivelul = 1;
selectNivel.addEventListener('change', (event) => {
    nivelul = event.target.value;
    if (nivelul == 1) {
        arr = arr1;
        console.log("nivelul a fost schimbat");

    } else if (nivelul == 2) {
        arr = arr2;
        console.log("nivelul a fost schimbat");

    } else if (nivelul == 3) {
        arr = arr3; console.log("nivelul a fost schimbat");

    } else if (nivelul == 4) {
        arr = arr4; console.log("nivelul a fost schimbat");

    }
    clearInterval(interval);
    restart();

});






let contor = 0;
let contorCorect = 0;
let interval;
function creareArr() {
    newArr = [];
    arrCuExercitii = [];
    arrIndex = [];

    if (dateSalvate && dateSalvate.length > 0) {
        console.log("Folosim întrebările profesorului.");
        arrCuExercitii = [...dateSalvate];
    }
    else {
        console.log("Folosim întrebările default.");
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

// ... 

function genereazaHTML() {
    if (contor < arrCuExercitii.length) {

        document.querySelector('.restart').innerHTML = `<img class="w-[60%] " src="../../../assets/img/img-shufle-game/A-buton-restart.png" alt="">`;
        document.querySelector('#true').style.display = 'inline-block';
        document.querySelector('#false').style.display = 'inline-block';

        document.querySelector('.nrIntrebare').innerHTML = `Intrebare ${contor + 1}`;
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
            // Quest: câștigă True/False cu cel puțin 7 răspunsuri corecte
            localStorage.setItem('quest_truefalse_7', 'true');
            // --------------------

        }
        else {
            contor_assasment_incercari++;
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
        document.querySelector('#restart-btn').addEventListener('click', function () {
            restart();
        });
    }
}

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

document.querySelector('#true').addEventListener('click', function () {
    dacaECorect(true);
    genereazaHTML();
});

document.querySelector('#false').addEventListener('click', function () {
    dacaECorect(false);
    genereazaHTML();
});

document.querySelector('.restart').addEventListener('click', function () {
    restart();
    genereazaHTML();
});
document.querySelector('.restart1').addEventListener('click', function () {
    restart();
    genereazaHTML();
    const modal = document.getElementById("finalModal");
    modal.classList.add("hidden");

});

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

function initializare() {
    pornesteCeas(0, 0);
    genereazaHTML()
}

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
    console.log("Jocul a fost resetat la întrebările implicite.");
}