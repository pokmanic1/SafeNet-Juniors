import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../conecteazate.html";
    }
});

let dateSalvate = JSON.parse(localStorage.getItem('jocVarianteCustom')) || [];

let arr1 = [

    {
        intrebare: "Ce este o parolă?",
        variante: [
            { varianta: "O cheie secretă pentru conturi", raspuns: true },
            { varianta: "Un tip de joc", raspuns: false },
            { varianta: "Un mesaj trimis pe internet", raspuns: false },
            { varianta: "Un tip de aplicație", raspuns: false },
        ]
    },

    {
        intrebare: "Ce trebuie să facem cu parola noastră?",
        variante: [
            { varianta: "Să o spunem prietenilor", raspuns: false },
            { varianta: "Să o păstrăm secretă", raspuns: true },
            { varianta: "Să o scriem pe internet", raspuns: false },
            { varianta: "Să o trimitem prin email", raspuns: false },
        ]
    },

    {
        intrebare: "Care dintre acestea este o parolă slabă?",
        variante: [
            { varianta: "Soare7!", raspuns: false },
            { varianta: "Copac9#", raspuns: false },
            { varianta: "1234", raspuns: true },
            { varianta: "Robot5$", raspuns: false },
        ]
    },

    {
        intrebare: "Ce sunt datele personale?",
        variante: [
            { varianta: "Informații despre o persoană", raspuns: true },
            { varianta: "Tipuri de jocuri", raspuns: false },
            { varianta: "Programe de calculator", raspuns: false },
            { varianta: "Setări de internet", raspuns: false },
        ]
    },

    {
        intrebare: "Ce trebuie să facem dacă vedem ceva ciudat pe internet?",
        variante: [
            { varianta: "Ignorăm complet", raspuns: false },
            { varianta: "Spunem unui adult", raspuns: true },
            { varianta: "Trimitem prietenilor", raspuns: false },
            { varianta: "Închidem internetul pentru totdeauna", raspuns: false },
        ]
    },

    {
        intrebare: "Internetul este:",
        variante: [
            { varianta: "Un joc", raspuns: false },
            { varianta: "O rețea de calculatoare", raspuns: true },
            { varianta: "Un tip de virus", raspuns: false },
            { varianta: "Un program antivirus", raspuns: false },
        ]
    },

    {
        intrebare: "Cu cine este mai sigur să vorbim online?",
        variante: [
            { varianta: "Cu persoane necunoscute", raspuns: false },
            { varianta: "Cu persoane cunoscute", raspuns: true },
            { varianta: "Cu oricine", raspuns: false },
            { varianta: "Cu roboți", raspuns: false },
        ]
    },

    {
        intrebare: "Ce trebuie să facem după ce folosim un calculator public?",
        variante: [
            { varianta: "Lăsăm contul deschis", raspuns: false },
            { varianta: "Ne deconectăm din cont", raspuns: true },
            { varianta: "Închidem doar pagina", raspuns: false },
            { varianta: "Schimbăm monitorul", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este un virus informatic?",
        variante: [
            { varianta: "Un joc", raspuns: false },
            { varianta: "Un program care poate afecta calculatorul", raspuns: true },
            { varianta: "O fotografie", raspuns: false },
            { varianta: "Un site", raspuns: false },
        ]
    },

    {
        intrebare: "Ce simbol arată că un site este mai sigur?",
        variante: [
            { varianta: "Un lacăt", raspuns: true },
            { varianta: "O stea", raspuns: false },
            { varianta: "Un cerc", raspuns: false },
            { varianta: "Un triunghi", raspuns: false },
        ]
    }

];

let arr2 = [

    {
        intrebare: "Câte caractere minime ar trebui să aibă o parolă sigură?",
        variante: [
            { varianta: "4", raspuns: false },
            { varianta: "6", raspuns: false },
            { varianta: "8", raspuns: true },
            { varianta: "3", raspuns: false },
        ]
    },

    {
        intrebare: "Ce trebuie să conțină o parolă bună?",
        variante: [
            { varianta: "Doar cifre", raspuns: false },
            { varianta: "Doar litere", raspuns: false },
            { varianta: "Litere și cifre", raspuns: true },
            { varianta: "Doar simboluri", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este spamul?",
        variante: [
            { varianta: "Mesaje nedorite", raspuns: true },
            { varianta: "Jocuri online", raspuns: false },
            { varianta: "Fotografii", raspuns: false },
            { varianta: "Setări internet", raspuns: false },
        ]
    },

    {
        intrebare: "Ce face un antivirus?",
        variante: [
            { varianta: "Creează parole", raspuns: false },
            { varianta: "Protejează calculatorul de viruși", raspuns: true },
            { varianta: "Conectează internetul", raspuns: false },
            { varianta: "Trimite mesaje", raspuns: false },
        ]
    },

    {
        intrebare: "Ce trebuie să facem înainte de a descărca o aplicație?",
        variante: [
            { varianta: "Să verificăm cu un adult", raspuns: true },
            { varianta: "Să o instalăm imediat", raspuns: false },
            { varianta: "Să o trimitem prietenilor", raspuns: false },
            { varianta: "Să închidem calculatorul", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este un cont online?",
        variante: [
            { varianta: "Un profil pe un site", raspuns: true },
            { varianta: "Un virus", raspuns: false },
            { varianta: "Un joc", raspuns: false },
            { varianta: "Un cablu", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este phishing-ul?",
        variante: [
            { varianta: "O metodă de pescuit", raspuns: false },
            { varianta: "Un tip de fraudă online", raspuns: true },
            { varianta: "Un antivirus", raspuns: false },
            { varianta: "Un browser", raspuns: false },
        ]
    },

    {
        intrebare: "Ce trebuie să facem dacă primim un mesaj suspect?",
        variante: [
            { varianta: "Îl deschidem imediat", raspuns: false },
            { varianta: "Îl ignorăm și anunțăm un adult", raspuns: true },
            { varianta: "Îl trimitem prietenilor", raspuns: false },
            { varianta: "Îl publicăm online", raspuns: false },
        ]
    },

    {
        intrebare: "Ce înseamnă să folosești internetul responsabil?",
        variante: [
            { varianta: "Să respectăm regulile de siguranță", raspuns: true },
            { varianta: "Să stăm mereu online", raspuns: false },
            { varianta: "Să descărcăm orice", raspuns: false },
            { varianta: "Să postăm orice", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este o alertă de securitate?",
        variante: [
            { varianta: "Un mesaj de avertizare", raspuns: true },
            { varianta: "Un joc nou", raspuns: false },
            { varianta: "Un email normal", raspuns: false },
            { varianta: "Un virus", raspuns: false },
        ]
    }

];
let arr3 = [

    {
        intrebare: "Ce este cyberbullying-ul?",
        variante: [
            { varianta: "Hărțuire pe internet", raspuns: true },
            { varianta: "Un virus", raspuns: false },
            { varianta: "Un joc", raspuns: false },
            { varianta: "Un tip de browser", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este criptarea?",
        variante: [
            { varianta: "Ascunderea informațiilor într-un cod", raspuns: true },
            { varianta: "Ștergerea datelor", raspuns: false },
            { varianta: "Instalarea programelor", raspuns: false },
            { varianta: "Conectarea la internet", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este un firewall?",
        variante: [
            { varianta: "Un program care blochează accesul periculos", raspuns: true },
            { varianta: "Un joc", raspuns: false },
            { varianta: "Un tip de parolă", raspuns: false },
            { varianta: "Un site", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este un hacker?",
        variante: [
            { varianta: "O persoană care încearcă să intre în sisteme fără permisiune", raspuns: true },
            { varianta: "Un profesor", raspuns: false },
            { varianta: "Un antivirus", raspuns: false },
            { varianta: "Un tip de browser", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este o adresă IP?",
        variante: [
            { varianta: "Un număr care identifică un dispozitiv pe internet", raspuns: true },
            { varianta: "O parolă", raspuns: false },
            { varianta: "Un virus", raspuns: false },
            { varianta: "Un mesaj", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este un VPN?",
        variante: [
            { varianta: "O conexiune securizată pe internet", raspuns: true },
            { varianta: "Un joc online", raspuns: false },
            { varianta: "Un tip de virus", raspuns: false },
            { varianta: "Un cablu", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este cloud-ul?",
        variante: [
            { varianta: "Stocarea datelor pe internet", raspuns: true },
            { varianta: "Un virus", raspuns: false },
            { varianta: "Un calculator", raspuns: false },
            { varianta: "Un joc", raspuns: false },
        ]
    },

    {
        intrebare: "Ce trebuie să facem dacă un site cere prea multe date personale?",
        variante: [
            { varianta: "Le oferim imediat", raspuns: false },
            { varianta: "Suntem atenți", raspuns: true },
            { varianta: "Le trimitem tuturor", raspuns: false },
            { varianta: "Ignorăm complet", raspuns: false },
        ]
    },

    {
        intrebare: "Ce înseamnă backup?",
        variante: [
            { varianta: "Copie de siguranță a datelor", raspuns: true },
            { varianta: "Ștergerea datelor", raspuns: false },
            { varianta: "Criptarea datelor", raspuns: false },
            { varianta: "Virus informatic", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este identitatea digitală?",
        variante: [
            { varianta: "Informațiile despre noi pe internet", raspuns: true },
            { varianta: "Un joc", raspuns: false },
            { varianta: "O parolă", raspuns: false },
            { varianta: "Un virus", raspuns: false },
        ]
    }

];
let arr4 = [

    {
        intrebare: "Ce protocol indică o conexiune securizată pe web?",
        variante: [
            { varianta: "HTTP", raspuns: false },
            { varianta: "HTTPS", raspuns: true },
            { varianta: "FTP", raspuns: false },
            { varianta: "TCP", raspuns: false },
        ]
    },

    {
        intrebare: "Ce face un proxy server?",
        variante: [
            { varianta: "Trimite cereri către internet în locul utilizatorului", raspuns: true },
            { varianta: "Creează parole", raspuns: false },
            { varianta: "Șterge fișiere", raspuns: false },
            { varianta: "Instalează jocuri", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este Tor Project?",
        variante: [
            { varianta: "O rețea pentru navigare anonimă", raspuns: true },
            { varianta: "Un antivirus", raspuns: false },
            { varianta: "Un sistem de operare", raspuns: false },
            { varianta: "Un joc", raspuns: false },
        ]
    },

    {
        intrebare: "Ce motor de căutare este cunoscut pentru protejarea confidențialității?",
        variante: [
            { varianta: "Google", raspuns: false },
            { varianta: "Bing", raspuns: false },
            { varianta: "DuckDuckGo", raspuns: true },
            { varianta: "Yahoo", raspuns: false },
        ]
    },

    {
        intrebare: "Ce sistem de operare este folosit pe calculatoarele Apple?",
        variante: [
            { varianta: "Windows", raspuns: false },
            { varianta: "Linux", raspuns: false },
            { varianta: "macOS", raspuns: true },
            { varianta: "Android", raspuns: false },
        ]
    },

    {
        intrebare: "Ce înseamnă DNS?",
        variante: [
            { varianta: "Sistem care traduce adresele site-urilor", raspuns: true },
            { varianta: "Antivirus", raspuns: false },
            { varianta: "Joc online", raspuns: false },
            { varianta: "Tip de firewall", raspuns: false },
        ]
    },

    {
        intrebare: "Ce poate ajuta la protejarea rețelei unei organizații?",
        variante: [
            { varianta: "Firewall", raspuns: true },
            { varianta: "Browser", raspuns: false },
            { varianta: "Editor de text", raspuns: false },
            { varianta: "Monitor", raspuns: false },
        ]
    },

    {
        intrebare: "Ce este monitorizarea în securitate cibernetică?",
        variante: [
            { varianta: "Observarea activității sistemelor", raspuns: true },
            { varianta: "Instalarea jocurilor", raspuns: false },
            { varianta: "Crearea parolelor", raspuns: false },
            { varianta: "Trimiterea mesajelor", raspuns: false },
        ]
    },

    {
        intrebare: "Ce tip de atac încearcă să fure parole prin mesaje false?",
        variante: [
            { varianta: "Malware", raspuns: false },
            { varianta: "Phishing", raspuns: true },
            { varianta: "Spam", raspuns: false },
            { varianta: "Cache", raspuns: false },
        ]
    },

    {
        intrebare: "Ce trebuie să facem pentru a proteja conturile online?",
        variante: [
            { varianta: "Să folosim parole puternice", raspuns: true },
            { varianta: "Să folosim parole simple", raspuns: false },
            { varianta: "Să le scriem pe internet", raspuns: false },
            { varianta: "Să le trimitem prietenilor", raspuns: false },
        ]
    }

];


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


let intrebareElement = document.querySelector('.intrebarea1');
let varianta1Element = document.querySelector('.varianta1');
let varianta2Element = document.querySelector('.varianta2');
let varianta3Element = document.querySelector('.varianta3');
let varianta4Element = document.querySelector('.varianta4');

let textIntrebare = document.querySelector('.textIntrebare');
let textScoar = document.querySelector('.textScoar');
let contorScor = 0;
let butonRestart = document.querySelector('.butonRestart');


let arr = [...arr1];
let newArr = [];
let arrCuExercitii = [];
let arrIndex = [];
createArr();

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
        // alert("Testul s-a terminat!");
    }
}
function initializare() { 
    pornesteCeas(0, 0);
    genereazaHTML();
   
}
let butoane = document.querySelectorAll('.butonVariante');
butoane.forEach((buton, index) => {
    buton.addEventListener('click', () => {

        if (contor >= newArr.length) return;

        let intrebareCurenta = newArr[contor];

        if (intrebareCurenta.variante[index].raspuns === true) {

            contorScor++;contor++;
            genereazaHTML();
        } else {

            contor++;
            genereazaHTML();

        }

    });
});
butonRestart.addEventListener('click', () => {
    restart();
})

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

function restart() {
    newArr = [];
    arrCuExercitii = [];
    arrIndex = [];
    contor = 0;
    contorScor = 0;

    createArr();
    genereazaHTML();
    localStorage.removeItem("jocVarianteCustom");
    clearInterval(interval)
    pornesteCeas(0, 0);
    
}
initializare();