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
    '../../assets/img/img-shufle-game/frauda.png',
    '../../assets/img/img-shufle-game/mesaj.png',
    '../../assets/img/img-shufle-game/parola.png',
    '../../assets/img/img-shufle-game/phishing.png',
    '../../assets/img/img-shufle-game/protectie.png',
    '../../assets/img/img-shufle-game/riscuri.png',
    '../../assets/img/img-shufle-game/securitate.png',
    '../../assets/img/img-shufle-game/sigur.png',
    '../../assets/img/img-shufle-game/siguranta.png',
    '../../assets/img/img-shufle-game/spam.png',
    '../../assets/img/img-shufle-game/sterge.png',
    '../../assets/img/img-shufle-game/virus.png',
];

let primaIncercare = '';
let aDouaIncercare = '';
let contor = 0;
const DELAY = 1000;
const jocul = document.querySelector('.joc');

let newArr = [];


function genereazaPerechi() {
    let indexuri = [];

    while (indexuri.length < 8) {
        let rand = Math.floor(Math.random() * arrText.length);
        if (!indexuri.includes(rand)) {
            indexuri.push(rand);
        }
    }
    
    indexuri.forEach(i => {

        newArr.push({
            type: "text",
            value: arrText[i]
        });

        newArr.push({
            type: "image",
            value: arrText[i],
            imaginea: arrImaginea[i]
        });

    });
}


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.value;

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
            primaIncercare = clicked.dataset.name;
        } else {
            aDouaIncercare = clicked.dataset.name;

            if (primaIncercare === aDouaIncercare) {
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
    primaIncercare = '';
    aDouaIncercare = '';
    contor = 0;

    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected', 'flipped');
    });
}

jocul.addEventListener('click', Click);
initializare();







































// let arr1 = [
//     { text: '1', imaginea: 'N1' },
//     { text: '2', imaginea: 'N2' },
//     { text: '3', imaginea: 'N3' },
//     { text: '4', imaginea: 'N4' },
//     { text: '5', imaginea: 'N5' },
//     { text: '6', imaginea: 'N6' },
//     { text: '7', imaginea: 'N7' },
//     { text: '8', imaginea: 'N8' },
//     { text: '9', imaginea: 'N9' },
//     { text: '10', imaginea: 'N10' },
//     { text: '11', imaginea: 'N11' },
//     { text: '12', imaginea: 'N12' },
//     { text: '13', imaginea: 'N13' },
//     { text: '14', imaginea: 'N14' },
//     { text: '15', imaginea: 'N15' },
//     { text: '16', imaginea: 'N16' },
//     { text: '17', imaginea: 'N17' },
//     { text: '18', imaginea: 'N18' },
//     { text: '19', imaginea: 'N19' },
//     { text: '20', imaginea: 'N20' },
//     { text: '21', imaginea: 'N21' },
//     { text: '22', imaginea: 'N22' },
//     { text: '23', imaginea: 'N23' }
// ];

// let arr = [
//     { name: 'apple', imaginea: '..//../img/image-removebg-preview (3).png' },
//     { name: 'banana', imaginea: '..//../img/image-removebg-preview (3).png' },
//     { name: 'grape', imaginea: '..//../img/image-removebg-preview (3).png' },
//     { name: 'orange', imaginea: '..//../img/image-removebg-preview (3).png' },
//     { name: 'pear', imaginea: '..//../img/image-removebg-preview (3).png' },
//     { name: 'pineapple', imaginea: '..//../img/image-removebg-preview (3).png' },
//     { name: 'strawberry', imaginea: '..//../img/image-removebg-preview (3).png' },
//     { name: 'watermelon', imaginea: '..//../img/image-removebg-preview (3).png' },
// ]
// let primaIncercare = '';
// let aDouaIncercare = '';
// let celDinainte = '';
// let contor = 0;
// const DELAY = 1000;
// const jocul = document.querySelector('.joc');
// const joculGrid = shuffleArray(arr.concat(arr));


// function shuffleArray(array) {
//     return array.sort(() => Math.random() - 0.5);
// }


// function createCard(item) {
//     const card = document.createElement('div');
//     card.classList.add('card');
//     card.dataset.name = item.name;
//     card.dataset.imaginea = item.imaginea;

//     const front = document.createElement('div');
//     front.classList.add('front');

//     const back = document.createElement('div');
//     back.style.backgroundImage = `url(${item.imaginea})`;
//     back.style.backgroundSize = "cover";
//     back.style.backgroundPosition = "center";


//     card.appendChild(front);
//     card.appendChild(back);
//     console.log('------------------------------');
//     console.log(card);
//     return card;
// }

// function initializare() {
//     joculGrid.forEach(item => {
//         const card = createCard(item);
//         jocul.appendChild(card);
//     });

// }

// function Click(event) {
//     const clicked = event.target;
//     if (clicked.nodeName === 'SECTION'
//         || clicked === celDinainte
//         || clicked.parentNode.classList.contains('matched')
//         || clicked.parentNode.classList.contains('selected')) { return; }

//     if (contor < 2) {
//         contor++;
//         clicked.parentNode.classList.add('selected', 'flipped');

//         if (contor === 1) {
//             primaIncercare = clicked.parentNode.dataset.name;
//         }
//         else {
//             aDouaIncercare = clicked.parentNode.dataset.name;
//             if (primaIncercare && aDouaIncercare) {
//                 if (primaIncercare === aDouaIncercare) {
//                     setTimeout(match, DELAY);
//                 }
//                 setTimeout(reset, DELAY);
//             }
//         }
//         celDinainte = clicked;
//     }
// }

// function match() {
//     const selected = document.querySelectorAll('.selected');
//     selected.forEach(card => {
//         card.classList.add('matched');
//     });
// }

// function reset() {

//     primaIncercare = '';
//     aDouaIncercare = '';
//     contor = 0;
//     celDinainte = null
//     const selected = document.querySelectorAll('.selected');
//     selected.forEach(card => {
//         card.classList.remove('selected', 'flipped');
//     });
// }


// jocul.addEventListener('click', Click);
// initializare();