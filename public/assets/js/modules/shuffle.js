import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../conecteazate.html";
    }
});


if(JSON.parse(localStorage.getItem("shuffleGameData"))){
console.log('estele')
}else{
    console.log("nu")
}
let dateSalvate=JSON.parse(localStorage.getItem("shuffleGameData")) || [];
console.log("-----------------------------------------");
console.log(dateSalvate);
console.log("-----------------------------------------");

let arrText = [
    'frauda',
    'mesaj',
    'parola',
    'phishing',
    'protectie',
    'riscuri',
    'securitate',
    'sigur',
    'siguranta',
    'spam',
    'sterge',
    'virus',
];

let arrImaginea = [
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

let primaIncercareId = null;
let aDouaIncercareId = null;
let contor = 0;
const DELAY = 1000;
const jocul = document.querySelector('.joc');

let newArr = [];

function genereazaPerechi() {
    if(dateSalvate.lenght===0){
    let indexuri = [];

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
            id: i,              // 🔥 ID adăugat
            type: "image",
            value: arrText[i],
            imaginea: arrImaginea[i]
        });

    });}
    else{
        newArr=[...dateSalvate];
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

jocul.addEventListener('click', Click);
initializare();



