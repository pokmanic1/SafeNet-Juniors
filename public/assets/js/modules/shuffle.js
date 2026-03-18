import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        // window.location.href = "../../../pages/conecteazate.html";
        const DacaNuSaConectat = document.getElementById("dacaNuSaConectat");
        DacaNuSaConectat.classList.remove("hidden");
    }
});
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (localStorage.getItem('vizitat_shuffle_game') !== '1') {
            // window.location.href = "../../../pages/assessment.html";
            const DacaNuAVizitatDocu = document.getElementById("dacaNuACititDocum");
            DacaNuAVizitatDocu.classList.remove("hidden");
        }
    }
});




let contor_assasment_corecte = JSON.parse(localStorage.getItem('contor_assasment_shuffle_corecte')) || 0;
let contor_assasment_incercari = JSON.parse(localStorage.getItem('contor_assasment_shuffle_incercari')) || 0;




let dateSalvate = JSON.parse(localStorage.getItem("shuffleGameData")) || [];
console.log("Datele salvate de profesor -----------------------------------------");
console.log(dateSalvate);




let arrText1 = ['frauda', 'mesaj', 'parola', 'phishing', 'protectie', 'riscuri', 'securitate', 'sigur', 'siguranta', 'spam', 'sterge', 'virus'];
let arrImaginea1 = [
    '../../../assets/img/img-shufle-game/frauda.png',
    '../../../assets/img/img-shufle-game/mesaj.png',
    '../../../assets/img/img-shufle-game/parola.png',
    '../../../assets/img/img-shufle-game/phishing.png',
    '../../../assets/img/img-shufle-game/protectie.png',
    '../../../assets/img/img-shufle-game/riscuri.png',
    '../../../assets/img/img-shufle-game/securitate.png',
    '../../../assets/img/img-shufle-game/sigur.png',
    '../../../assets/img/img-shufle-game/siguranta.png',
    '../../../assets/img/img-shufle-game/spam.png',
    '../../../assets/img/img-shufle-game/sterge.png',
    '../../../assets/img/img-shufle-game/virus.png',
];

let arrText2 = ['frauda2', 'mesaj2', 'parola2', 'phishing2', 'protectie2', 'riscuri2', 'securitate2', 'sigur2', 'siguranta2', 'spam2', 'sterge2', 'virus2'];
let arrImaginea2 = [
    '../../../assets/img/img-shufle-game/frauda.png',
    '../../../assets/img/img-shufle-game/mesaj.png',
    '../../../assets/img/img-shufle-game/parola.png',
    '../../../assets/img/img-shufle-game/phishing.png',
    '../../../assets/img/img-shufle-game/protectie.png',
    '../../../assets/img/img-shufle-game/riscuri.png',
    '../../../assets/img/img-shufle-game/securitate.png',
    '../../../assets/img/img-shufle-game/sigur.png',
    '../../../assets/img/img-shufle-game/siguranta.png',
    '../../../assets/img/img-shufle-game/spam.png',
    '../../../assets/img/img-shufle-game/sterge.png',
    '../../../assets/img/img-shufle-game/virus.png',
];

let arrText3 = ['frauda3', 'mesaj3', 'parola3', 'phishing3', 'protectie3', 'riscuri3', 'securitate3', 'sigur3', 'siguranta3', 'spam3', 'sterge3', 'virus3'];
let arrImaginea3 = [
    '../../../assets/img/img-shufle-game/frauda.png',
    '../../../assets/img/img-shufle-game/mesaj.png',
    '../../../assets/img/img-shufle-game/parola.png',
    '../../../assets/img/img-shufle-game/phishing.png',
    '../../../assets/img/img-shufle-game/protectie.png',
    '../../../assets/img/img-shufle-game/riscuri.png',
    '../../../assets/img/img-shufle-game/securitate.png',
    '../../../assets/img/img-shufle-game/sigur.png',
    '../../../assets/img/img-shufle-game/siguranta.png',
    '../../../assets/img/img-shufle-game/spam.png',
    '../../../assets/img/img-shufle-game/sterge.png',
    '../../../assets/img/img-shufle-game/virus.png',
];

let arrText4 = ['frauda4', 'mesaj4', 'parola4', 'phishing4', 'protectie4', 'riscuri4', 'securitate4', 'sigur4', 'siguranta4', 'spam4', 'sterge4', 'virus4'];
let arrImaginea4 = [
    '../../../assets/img/img-shufle-game/frauda.png',
    '../../../assets/img/img-shufle-game/mesaj.png',
    '../../../assets/img/img-shufle-game/parola.png',
    '../../../assets/img/img-shufle-game/phishing.png',
    '../../../assets/img/img-shufle-game/protectie.png',
    '../../../assets/img/img-shufle-game/riscuri.png',
    '../../../assets/img/img-shufle-game/securitate.png',
    '../../../assets/img/img-shufle-game/sigur.png',
    '../../../assets/img/img-shufle-game/siguranta.png',
    '../../../assets/img/img-shufle-game/spam.png',
    '../../../assets/img/img-shufle-game/sterge.png',
    '../../../assets/img/img-shufle-game/virus.png',
];


let arrText = [...arrText1];
let arrImaginea = [...arrImaginea1];
let nivelul = 1;
let totalSecondsElapsed = 0;

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

console.log(newArr)
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

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
        back.style.fontSize = "20px";
        back.style.fontWeight = "bold";
    }

    card.appendChild(front);
    card.appendChild(back);

    return card;
}

function initializare() {
    genereazaPerechi();
    shuffle(newArr);
    pornesteCeas(0, 0);
    newArr.forEach(item => {
        const card = createCard(item);
        jocul.appendChild(card);
    });

}

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
        } else {
            contor_assasment_incercari++;
        }




        localStorage.setItem('contor_assasment_shuffle_corecte', JSON.stringify(contor_assasment_corecte));
        localStorage.setItem('contor_assasment_shuffle_incercari', JSON.stringify(contor_assasment_incercari));


        const modal = document.getElementById("finalModal");
        modal.classList.remove("hidden");
        document.getElementById("scorFinal").innerText = `${contorPerechi} / 8`; document.getElementById("nivelFinal").innerText = nivelul;
        document.getElementById("timpFinal").innerText = document.querySelector(".time").innerText;
    }


}

function reset() {

    primaIncercareId = null;
    aDouaIncercareId = null;
    contor = 0;

    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected', 'flipped');
    });
}

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


document.querySelector(".restart").addEventListener('click', () => {
    rst();
});

document.querySelector('.restart1').addEventListener('click', function () {
    rst();
    const modal = document.getElementById("finalModal");
    modal.classList.add("hidden");

});


let contorPerechi = 0;

jocul.addEventListener('click', Click);
initializare();



//problema la contor perechi