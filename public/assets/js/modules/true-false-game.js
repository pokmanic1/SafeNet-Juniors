import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../conecteazate.html";
    }
});
let dateSalvate = JSON.parse(localStorage.getItem("intrebariTrueFalse")) || [];


let arr1 = [

    {
        propozitii: [
            { text: 'Parola trebuie să fie cunoscută doar de tine.', raspuns: true },
            { text: 'Putem spune parola colegilor.', raspuns: false },
            { text: 'O parolă poate conține litere și cifre.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Numele este o dată personală.', raspuns: true },
            { text: 'Putem spune adresa oricui online.', raspuns: false },
            { text: 'Datele personale trebuie protejate.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Dacă ceva ne sperie online, spunem unui adult.', raspuns: true },
            { text: 'Ignorăm mereu lucrurile care ne sperie.', raspuns: false },
            { text: 'Este bine să cerem ajutor.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem avea încredere în orice persoană online.', raspuns: false },
            { text: 'Nu trebuie să oferim informații necunoscuților.', raspuns: true },
            { text: 'O persoană online poate să nu fie cine spune că este.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem instala jocuri fără permisiune.', raspuns: false },
            { text: 'Trebuie să cerem voie unui adult.', raspuns: true },
            { text: 'Toate jocurile de pe internet sunt sigure.', raspuns: false }
        ]
    },

    {
        propozitii: [
            { text: '„1234” este o parolă sigură.', raspuns: false },
            { text: 'O parolă simplă este ușor de ghicit.', raspuns: true },
            { text: 'Parolele trebuie să fie greu de ghicit.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem folosi calculatorul fără să anunțăm pe nimeni.', raspuns: false },
            { text: 'Este bine să folosim calculatorul responsabil.', raspuns: true },
            { text: 'Putem sta oricât dorim pe internet fără reguli.', raspuns: false }
        ]
    },

    {
        propozitii: [
            { text: 'Răspundem la orice mesaj primit.', raspuns: false },
            { text: 'Un mesaj ciudat trebuie raportat.', raspuns: true },
            { text: 'Este bine să ignorăm și să anunțăm un adult.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem trimite poze necunoscuților.', raspuns: false },
            { text: 'Pozele sunt informații personale.', raspuns: true },
            { text: 'Trebuie să protejăm fotografiile noastre.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Internetul este mereu sigur.', raspuns: false },
            { text: 'Trebuie să fim atenți pe internet.', raspuns: true },
            { text: 'Putem face orice online fără consecințe.', raspuns: false }
        ]
    }

];
let arr2 = [

    {
        propozitii: [
            { text: 'Parola trebuie să fie cunoscută doar de tine2.', raspuns: true },
            { text: 'Putem spune parola colegilo2r.', raspuns: false },
            { text: 'O parolă poate conține litere și cifre.2', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Numele este o dată personală2.', raspuns: true },
            { text: 'Putem spune adresa oricui online2.', raspuns: false },
            { text: 'Datele personale trebuie protejate2.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Dacă ceva ne sperie online, spunem unui adult2.', raspuns: true },
            { text: 'Ignorăm mereu lucrurile care ne sperie2.', raspuns: false },
            { text: 'Este bine să cerem ajutor.2', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem avea încredere în orice persoană online2.', raspuns: false },
            { text: 'Nu trebuie să oferim informații necunoscuților.2', raspuns: true },
            { text: 'O persoană online poate să nu fie cine spune că este.2', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem instala jocuri fără permisiune2.', raspuns: false },
            { text: 'Trebuie să cerem voie unui adult2.', raspuns: true },
            { text: 'Toate jocurile de pe internet sunt sigure2.', raspuns: false }
        ]
    },

    {
        propozitii: [
            { text: '„1234” este o parolă sigură2.', raspuns: false },
            { text: 'O parolă simplă este ușor de ghicit2.', raspuns: true },
            { text: 'Parolele trebuie să fie greu de ghicit2.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem folosi calculatorul fără să anunțăm pe nimeni2.', raspuns: false },
            { text: 'Este bine să folosim calculatorul responsabil2.', raspuns: true },
            { text: 'Putem sta oricât dorim pe internet fără reguli2.', raspuns: false }
        ]
    },

    {
        propozitii: [
            { text: 'Răspundem la orice mesaj primit2.', raspuns: false },
            { text: 'Un mesaj ciudat trebuie raportat2.', raspuns: true },
            { text: 'Este bine să ignorăm și să anunțăm un adult2.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem trimite poze necunoscuților2.', raspuns: false },
            { text: 'Pozele sunt informații personale2.', raspuns: true },
            { text: 'Trebuie să protejăm fotografiile noastre2.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Internetul este mereu sigur2.', raspuns: false },
            { text: 'Trebuie să fim atenți pe internet2.', raspuns: true },
            { text: 'Putem face orice online fără consecințe.2', raspuns: false }
        ]
    }

];

let arr3 = [

    {
        propozitii: [
            { text: 'Parola trebuie să fie cunoscută doar de tine3.', raspuns: true },
            { text: 'Putem spune parola colegilor3.', raspuns: false },
            { text: 'O parolă poate conține litere și cifre3.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Numele este o dată personală3.', raspuns: true },
            { text: 'Putem spune adresa oricui online3.', raspuns: false },
            { text: 'Datele personale trebuie protejate3.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Dacă ceva ne sperie online, spunem unui adult3.', raspuns: true },
            { text: 'Ignorăm mereu lucrurile care ne sperie3.', raspuns: false },
            { text: 'Este bine să cerem ajutor3.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem avea încredere în orice persoană online3.', raspuns: false },
            { text: 'Nu trebuie să oferim informații necunoscuțilo3r.', raspuns: true },
            { text: 'O persoană online poate să nu fie cine spune că este3.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem instala jocuri fără permisiune3.', raspuns: false },
            { text: 'Trebuie să cerem voie unui adult3.', raspuns: true },
            { text: 'Toate jocurile de pe internet sunt sigure3.', raspuns: false }
        ]
    },

    {
        propozitii: [
            { text: '„1234” este o parolă sigură.3', raspuns: false },
            { text: 'O parolă simplă este ușor de ghicit.3', raspuns: true },
            { text: 'Parolele trebuie să fie greu de ghicit.3', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem folosi calculatorul fără să anunțăm pe nimeni.3', raspuns: false },
            { text: 'Este bine să folosim calculatorul responsabil3.', raspuns: true },
            { text: 'Putem sta oricât dorim pe internet fără reguli.3', raspuns: false }
        ]
    },

    {
        propozitii: [
            { text: 'Răspundem la orice mesaj primit3.', raspuns: false },
            { text: 'Un mesaj ciudat trebuie raportat3.', raspuns: true },
            { text: 'Este bine să ignorăm și să anunțăm un adult3.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem trimite poze necunoscuților3.', raspuns: false },
            { text: 'Pozele sunt informații personale3.', raspuns: true },
            { text: 'Trebuie să protejăm fotografiile noastre.3', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Internetul este mereu sigur3.', raspuns: false },
            { text: 'Trebuie să fim atenți pe internet3.', raspuns: true },
            { text: 'Putem face orice online fără consecințe3.', raspuns: false }
        ]
    }

];
let arr4 = [

    {
        propozitii: [
            { text: 'Parola trebuie să fie cunoscută doar de tine4.', raspuns: true },
            { text: 'Putem spune parola colegilor4.', raspuns: false },
            { text: 'O parolă poate conține litere și cifre.4', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Numele este o dată personală4.', raspuns: true },
            { text: 'Putem spune adresa oricui online4.', raspuns: false },
            { text: 'Datele personale trebuie protejate4.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Dacă ceva ne sperie online, spunem unui adult4.', raspuns: true },
            { text: 'Ignorăm mereu lucrurile care ne sperie.4', raspuns: false },
            { text: 'Este bine să cerem ajutor4.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem avea încredere în orice persoană online.4', raspuns: false },
            { text: 'Nu trebuie să oferim informații necunoscuților4.', raspuns: true },
            { text: 'O persoană online poate să nu fie cine spune că este4.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem instala jocuri fără permisiune.4', raspuns: false },
            { text: 'Trebuie să cerem voie unui adult4.', raspuns: true },
            { text: 'Toate jocurile de pe internet sunt sigure.4', raspuns: false }
        ]
    },

    {
        propozitii: [
            { text: '„1234” este o parolă sigură4.', raspuns: false },
            { text: 'O parolă simplă este ușor de ghicit.4', raspuns: true },
            { text: 'Parolele trebuie să fie greu de ghicit4.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem folosi calculatorul fără să anunțăm pe nimeni.4', raspuns: false },
            { text: 'Este bine să folosim calculatorul responsabil.4', raspuns: true },
            { text: 'Putem sta oricât dorim pe internet fără reguli4.', raspuns: false }
        ]
    },

    {
        propozitii: [
            { text: 'Răspundem la orice mesaj primit4.', raspuns: false },
            { text: 'Un mesaj ciudat trebuie raportat4.', raspuns: true },
            { text: 'Este bine să ignorăm și să anunțăm un adult4.', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Putem trimite poze necunoscuților4.', raspuns: false },
            { text: 'Pozele sunt informații personale4.', raspuns: true },
            { text: 'Trebuie să protejăm fotografiile noastre.4', raspuns: true }
        ]
    },

    {
        propozitii: [
            { text: 'Internetul este mereu sigur4.', raspuns: false },
            { text: 'Trebuie să fim atenți pe internet.4', raspuns: true },
            { text: 'Putem face orice online fără consecințe4.', raspuns: false }
        ]
    }

];















let arr = [...arr1]
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
        arr = arr3;        console.log("nivelul a fost schimbat");

    } else if (nivelul == 4) {
        arr = arr4;        console.log("nivelul a fost schimbat");

    }
    restart()

});



creareArr();



let contor = 0;
let contorCorect = 0;

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

        document.querySelector('.restart').innerHTML = "";
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

        document.querySelector('.restart').innerHTML = `
            <button class="raspuns mt-2 w-[300px] h-[50px]" id="restart-btn">
                <img class="w-[300px] h-[50px] object-cover rounded-[20px]"
                    src="../../../assets/img/true-false-game/image 11.png" alt="Restart">
            </button>
        `;

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

function initializare() {
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

    console.log("Jocul a fost resetat la întrebările implicite.");
}
initializare();