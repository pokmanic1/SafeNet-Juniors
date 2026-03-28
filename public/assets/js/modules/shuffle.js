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



let arrText1 = ['Parolă', 'Mesaj', 'Cont', 'Cod PIN', 'Spam', 'Virus', 'Eroare', 'Coș de Gunoiv', 'WWW', 'Internet'];
let arrImaginea1 = [
    '../../../assets/img/img-shufle-game/parolaLvl1.png',
    '../../../assets/img/img-shufle-game/mesajLvl1.png',
    '../../../assets/img/img-shufle-game/contLvl1.png',
    '../../../assets/img/img-shufle-game/codPinLvl1.png',
    '../../../assets/img/img-shufle-game/spamLvl1.png',
    '../../../assets/img/img-shufle-game/virusLvl1.png',
    '../../../assets/img/img-shufle-game/eroareLvl.1.png',
    '../../../assets/img/img-shufle-game/cosGunoiLvl1.png',
    '../../../assets/img/img-shufle-game/wwwLvl1.png',
    '../../../assets/img/img-shufle-game/intrenetLvl1.png',
];

let arrText2 = ['Phishing', 'Identitate', 'Hacker', 'Confidențialitate', 'Securitate', 'Scanare', 'Alertă de Securitate', 'Siguranță', 'Furt de date', 'Monitorizare'];
let arrImaginea2 = [
    '../../../assets/img/img-shufle-game/phishingLvl2.png',
    '../../../assets/img/img-shufle-game/identitateLvl2.png',
    '../../../assets/img/img-shufle-game/hackerLvl2.png',
    '../../../assets/img/img-shufle-game/confidentialitateLvl2.png',
    '../../../assets/img/img-shufle-game/securitateLvl2.png',
    '../../../assets/img/img-shufle-game/scanareLvl2.png',
    '../../../assets/img/img-shufle-game/alertaSecLvl2.png',
    '../../../assets/img/img-shufle-game/sigurantaLvl2.png',
    '../../../assets/img/img-shufle-game/furtDateLvl2.png',
    '../../../assets/img/img-shufle-game/monitorizareLvl2.png',
];

let arrText3 = ['Cache', 'Cookies', 'Riscuri', 'Fraudă', 'Atac cibernetic', 'VPN', 'HTTPS', 'Windows Defender', 'Cloud', 'IP Address'];
let arrImaginea3 = [
    '../../../assets/img/img-shufle-game/cacheLvl3.png',
    '../../../assets/img/img-shufle-game/cookiesLvl3.png',
    '../../../assets/img/img-shufle-game/riscuriLvl3.png',
    '../../../assets/img/img-shufle-game/FraudaLvl3.png',
    '../../../assets/img/img-shufle-game/atacCiberneticLvl3.png',
    '../../../assets/img/img-shufle-game/vpnLvl3.png',
    '../../../assets/img/img-shufle-game/httpsLvl3.png',
    '../../../assets/img/img-shufle-game/windowsDefenderLvl3.png',
    '../../../assets/img/img-shufle-game/cloudLvl3.png',
    '../../../assets/img/img-shufle-game/ipLvl3.png',
];

let arrText4 = ['Dnsmasq', 'Proxy Server', 'Date', 're CAPTCHA', 'Criptare', 'Politică de Securitate', 'Tor Project', 'Duck DuckGo', 'macOS', 'Firewall'];
let arrImaginea4 = [
    '../../../assets/img/img-shufle-game/dnsLvl4.png',
    '../../../assets/img/img-shufle-game/proxyLvl4.png',
    '../../../assets/img/img-shufle-game/dateLvl4.png',
    '../../../assets/img/img-shufle-game/captchaLvl4.png',
    '../../../assets/img/img-shufle-game/criptareLvl4.png',
    '../../../assets/img/img-shufle-game/politicaSecuritateLvl4.png',
    '../../../assets/img/img-shufle-game/torLvl4.png',
    '../../../assets/img/img-shufle-game/duckLvl4.png',
    '../../../assets/img/img-shufle-game/osLvl4.png',
    '../../../assets/img/img-shufle-game/firewallLvl4.png',
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
        back.style.fontSize = "16px";
        back.style.fontWeight = "bold";
        back.style.textAlign="center"
        
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



