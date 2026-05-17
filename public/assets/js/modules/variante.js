//----------------------------------------------------------------------------------------------------------------------
//Jocul Variante
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
        const vizitat_variante_game = data.documentationVisits?.variante;
        const counters = data.gameCounters || {};

        contor_assasment_corecte  = counters.variante_corecte  || 0;
        contor_assasment_incercari = counters.variante_incercari || 0;

        if (!vizitat_variante_game) {
            const DacaNuAVizitatDocu = document.getElementById("dacaNuACititDocum");
            DacaNuAVizitatDocu.classList.remove("hidden");
        }
    }
});





//----------------------------------------------------------------------------------------------------------------------
//Verificam daca in local storage e salvat un arr cu jocuri creat de profesori
// localStorage.setItem se face in pagina de clase sau creaza jocuri pentru profesori
//----------------------------------------------------------------------------------------------------------------------
let dateSalvate = JSON.parse(localStorage.getItem('jocVarianteCustom')) || [];





//----------------------------------------------------------------------------------------------------------------------
//Arraiurile sectionate pe nivele
//----------------------------------------------------------------------------------------------------------------------
let arr1 = [], arr2 = [], arr3 = [], arr4 = [];
//Arraiul care il folosim pentru genereare jocului
let arr = [];





//----------------------------------------------------------------------------------------------------------------------
//Nivelul selectat de utilizator
//----------------------------------------------------------------------------------------------------------------------
let interval;
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
    restart()

});




//----------------------------------------------------------------------------------------------------------------------
//citim din fisierul json datele la arraiuri pe nivele si le atribui variabelelor
//----------------------------------------------------------------------------------------------------------------------
fetch('../../../assets/js/modules/date-jocuri/variante.json')
    .then(response => response.json())
    .then(data => {
        arr1 = data.arr1;
        arr2 = data.arr2;
        arr3 = data.arr3;
        arr4 = data.arr4;
        arr = [...arr1];
        createArr();
        initializare();
    });


//----------------------------------------------------------------------------------------------------------------------
//Selectam elementele html si le atribuim variabilelor
//----------------------------------------------------------------------------------------------------------------------
let intrebareElement = document.querySelector('.intrebarea1');
let varianta1Element = document.querySelector('.varianta1');
let varianta2Element = document.querySelector('.varianta2');
let varianta3Element = document.querySelector('.varianta3');
let varianta4Element = document.querySelector('.varianta4');

let textIntrebare = document.querySelector('.textIntrebare');
let textScoar = document.querySelector('.textScoar');
let contorScor = 0;
let butonRestart = document.querySelector('.butonRestart');






//----------------------------------------------------------------------------------------------------------------------
//1)Verificam daca exista arr dat de profesor
//2)Alegem un numar random de la 1 la n si in arrail obiectul pe pozitia numarului random 
//  il introducem arr cu care il vom folosi la genrare de cartonase
//3)in newArr introducem doar nr exac de conditii care ne trebuie
//  arr care l-am atribuit mai sus are multe conditii si alegem doar 10 din ele
//----------------------------------------------------------------------------------------------------------------------
let newArr = [];
let arrCuExercitii = [];
let arrIndex = [];
function createArr() {
    if (dateSalvate.length > 0) {
        console.log("Folosim întrebările profesorului.");
        newArr = [...dateSalvate];
    } else {
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
    }

}
console.log(newArr);






//----------------------------------------------------------------------------------------------------------------------
//geneream HTML schimbam textle din html cu celele din arr de x ori x-nr de inrebari
//dupa ce a trecut de x ori afisam panoul de final 
//verificam daca raspuns de un numar specific de ore cucare consideeram daca a castigat sau nu jocul
//Salvam in fiebase datele despre cate ori a incercat si de cate ori a castigat
//----------------------------------------------------------------------------------------------------------------------
let contor = 0;
function genereazaHTML() {
    if (contor < newArr.length) {

        let itemCurent = newArr[contor];
        intrebareElement.innerHTML = itemCurent.intrebare;
        varianta1Element.innerHTML = itemCurent.variante[0].varianta;
        varianta2Element.innerHTML = itemCurent.variante[1].varianta;
        varianta3Element.innerHTML = itemCurent.variante[2].varianta;
        varianta4Element.innerHTML = itemCurent.variante[3].varianta;
        textIntrebare.innerHTML = `Intrebarea : ${contor + 1}`;
        textScoar.innerHTML = contorScor;

    } else {
        textIntrebare.innerHTML = contor;
        textScoar.innerHTML = contorScor;
        clearInterval(interval);
        if (contorScor > 7) {

            contor_assasment_corecte++;
            contor_assasment_incercari++;

            // ---- FLAG QUEST ----
            localStorage.setItem('quest_variante_8', 'true');
            // --------------------

        }
        else {
            contor_assasment_incercari++;
        }

        const modal = document.getElementById("finalModal");
        modal.classList.remove("hidden");

        document.getElementById("scorFinal").innerText = `${contorScor} / ${newArr.length}`;
        document.getElementById("nivelFinal").innerText = nivelul;
        document.getElementById("timpFinal").innerText = document.querySelector(".time").innerText;

        if (_currentUser) {
            const userRef = doc(db, "users", _currentUser.uid);
            const updateObj = { "gameCounters.variante_incercari": increment(1) };
            if (contorScor > 7) {
                updateObj["gameCounters.variante_corecte"] = increment(1);
            }
            updateDoc(userRef, updateObj).catch(err => console.error("Eroare Firebase variante:", err));
        }

    }
}






//----------------------------------------------------------------------------------------------------------------------
//Verificam daca raspunsul apasat de utilizator e acelasi ca cel din Arr
//Daca da marim contorul pentru raspunsul corect
//----------------------------------------------------------------------------------------------------------------------
let butoane = document.querySelectorAll('.butonVariante');
butoane.forEach((buton, index) => {
    buton.addEventListener('click', () => {

        if (contor >= newArr.length) return;

        let intrebareCurenta = newArr[contor];

        if (intrebareCurenta.variante[index].raspuns === true) {

            contorScor++; contor++;
            genereazaHTML();
        } else {

            contor++;
            genereazaHTML();

        }

    });
});




//----------------------------------------------------------------------------------------------------------------------
//butonul restart 
//----------------------------------------------------------------------------------------------------------------------
butonRestart.addEventListener('click', () => {
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
    newArr = [];
    arrCuExercitii = [];
    arrIndex = [];
    contor = 0;
    contorScor = 0;
    localStorage.removeItem("jocVarianteCustom");
    createArr();
    genereazaHTML();
    clearInterval(interval)
    pornesteCeas(0, 0);

}






//----------------------------------------------------------------------------------------------------------------------
//Aici se initializaraza jocul
//cu aceasta se porneste tot incepand dupa ce sau scos datele din fisierul json
//----------------------------------------------------------------------------------------------------------------------
function initializare() {
    pornesteCeas(0, 0);
    genereazaHTML();

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
