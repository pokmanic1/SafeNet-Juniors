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
        if (localStorage.getItem('vizitat_truefalse_game') !== '1') {
            // window.location.href = "../../../pages/assessment.html";
            const DacaNuAVizitatDocu = document.getElementById("dacaNuACititDocum");
            DacaNuAVizitatDocu.classList.remove("hidden");
        }
    }
});




let contor_assasment_corecte = JSON.parse(localStorage.getItem('contor_assasment_true-false_corecte')) || 0;
let contor_assasment_incercari = JSON.parse(localStorage.getItem('contor_assasment_true-false_incercari')) || 0;


// let arr1 = [

//     {
//         propozitii: [
//             { text: 'Parola trebuie păstrată secretă.', raspuns: true },
//             { text: 'Putem spune parola oricui.', raspuns: false },
//             { text: 'O parolă bună conține litere și cifre.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Numele și adresa sunt date personale.', raspuns: true },
//             { text: 'Putem trimite date personale necunoscuților.', raspuns: false },
//             { text: 'Datele personale trebuie protejate.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Dacă vedem ceva ciudat online, spunem unui adult.', raspuns: true },
//             { text: 'Trebuie să păstrăm totul secret față de adulți.', raspuns: false },
//             { text: 'Este bine să cerem ajutor când avem o problemă.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'O persoană online poate să nu fie cine spune că este.', raspuns: true },
//             { text: 'Toate persoanele de pe internet sunt de încredere.', raspuns: false },
//             { text: 'Trebuie să fim atenți cu necunoscuții online.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Trebuie să cerem voie înainte de a instala jocuri.', raspuns: true },
//             { text: 'Putem instala orice aplicație fără permisiune.', raspuns: false },
//             { text: 'Unele aplicații pot fi periculoase.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Parolele simple sunt ușor de ghicit.', raspuns: true },
//             { text: '„1234” este o parolă foarte sigură.', raspuns: false },
//             { text: 'Parolele lungi sunt mai sigure.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Calculatorul trebuie folosit responsabil.', raspuns: true },
//             { text: 'Putem sta pe internet fără limite.', raspuns: false },
//             { text: 'Este bine să respectăm regulile stabilite de adulți.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Mesajele ciudate trebuie raportate.', raspuns: true },
//             { text: 'Trebuie să răspundem la orice mesaj primit.', raspuns: false },
//             { text: 'Putem ignora mesajele suspecte și anunța un adult.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Fotografiile personale trebuie protejate.', raspuns: true },
//             { text: 'Putem trimite poze necunoscuților.', raspuns: false },
//             { text: 'Pozele pot conține informații personale.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Internetul poate avea și riscuri.', raspuns: true },
//             { text: 'Internetul este mereu sigur.', raspuns: false },
//             { text: 'Trebuie să fim atenți când folosim internetul.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Trebuie să vorbim respectuos online.', raspuns: true },
//             { text: 'Putem trimite mesaje jignitoare.', raspuns: false },
//             { text: 'Comunicarea online trebuie să fie responsabilă.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Siguranța digitală este importantă.', raspuns: true },
//             { text: 'Nu este nevoie să ne protejăm conturile.', raspuns: false },
//             { text: 'Parolele și datele trebuie păstrate în siguranță.', raspuns: true }
//         ]
//     }

// ];
// let arr2 = [

//     {
//         propozitii: [
//             { text: 'Este bine să folosim parole diferite pentru conturi diferite.', raspuns: true },
//             { text: 'Putem folosi aceeași parolă pentru toate conturile.', raspuns: false },
//             { text: 'Parolele diferite cresc securitatea conturilor.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Conturile online pot fi protejate cu parole puternice.', raspuns: true },
//             { text: 'Nu este important să protejăm conturile online.', raspuns: false },
//             { text: 'Codurile de verificare pot crește securitatea.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Datele personale trebuie oferite doar site-urilor de încredere.', raspuns: true },
//             { text: 'Putem trimite date personale oricui pe internet.', raspuns: false },
//             { text: 'Protejarea datelor personale ne ajută să fim în siguranță.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Unele mesaje online pot fi false.', raspuns: true },
//             { text: 'Toate mesajele de pe internet sunt sigure.', raspuns: false },
//             { text: 'Mesajele suspecte trebuie verificate.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Nu toate fișierele de pe internet sunt sigure.', raspuns: true },
//             { text: 'Putem descărca orice fișier fără risc.', raspuns: false },
//             { text: 'Unele fișiere pot conține programe periculoase.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Programele antivirus ajută la protejarea dispozitivelor.', raspuns: true },
//             { text: 'Calculatorul nu are nevoie de protecție.', raspuns: false },
//             { text: 'Actualizările ajută la securitatea dispozitivelor.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Este bine să existe limite pentru timpul petrecut online.', raspuns: true },
//             { text: 'Putem sta pe internet fără limite.', raspuns: false },
//             { text: 'Activitățile offline sunt la fel de importante.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Mesajele de la necunoscuți trebuie tratate cu atenție.', raspuns: true },
//             { text: 'Trebuie să răspundem imediat tuturor mesajelor.', raspuns: false },
//             { text: 'Este bine să verificăm cine ne trimite mesajul.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Fotografiile publicate online pot fi văzute de multe persoane.', raspuns: true },
//             { text: 'Pozele online dispar imediat.', raspuns: false },
//             { text: 'Trebuie să fim atenți ce imagini publicăm.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Nu toate informațiile de pe internet sunt corecte.', raspuns: true },
//             { text: 'Tot ce citim online este adevărat.', raspuns: false },
//             { text: 'Trebuie să verificăm sursele informațiilor.', raspuns: true }
//         ]
//     }

// ];
// let arr3 = [

//     {
//         propozitii: [
//             { text: 'Autentificarea în doi pași crește securitatea conturilor.', raspuns: true },
//             { text: 'Autentificarea în doi pași nu este utilă.', raspuns: false },
//             { text: 'Uneori trebuie introdus un cod suplimentar pentru autentificare.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Phishingul încearcă să fure date personale.', raspuns: true },
//             { text: 'Phishingul este un joc online.', raspuns: false },
//             { text: 'Unele site-uri false imită platforme reale.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Rețelele Wi-Fi publice pot fi nesigure.', raspuns: true },
//             { text: 'Toate rețelele Wi-Fi sunt complet sigure.', raspuns: false },
//             { text: 'Datele pot fi interceptate pe rețele nesigure.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Actualizările software pot corecta probleme de securitate.', raspuns: true },
//             { text: 'Nu este necesar să actualizăm programele.', raspuns: false },
//             { text: 'Actualizările ajută la protejarea dispozitivelor.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Malware-ul este un program periculos.', raspuns: true },
//             { text: 'Malware-ul îmbunătățește calculatorul.', raspuns: false },
//             { text: 'Malware-ul poate deteriora sistemele.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Platformele online pot colecta date despre utilizatori.', raspuns: true },
//             { text: 'Internetul nu colectează niciodată date.', raspuns: false },
//             { text: 'Trebuie să înțelegem cum sunt folosite datele noastre.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Managerii de parole pot ajuta la stocarea sigură a parolelor.', raspuns: true },
//             { text: 'Nu este nevoie să protejăm parolele.', raspuns: false },
//             { text: 'Managerii de parole pot genera parole complexe.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Atașamentele din email pot conține viruși.', raspuns: true },
//             { text: 'Toate atașamentele sunt sigure.', raspuns: false },
//             { text: 'Trebuie să deschidem doar fișiere din surse de încredere.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Setările de confidențialitate controlează cine vede informațiile.', raspuns: true },
//             { text: 'Setările de confidențialitate nu sunt importante.', raspuns: false },
//             { text: 'Trebuie să verificăm cine poate vedea profilul nostru.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Activitatea online lasă urme digitale.', raspuns: true },
//             { text: 'Activitatea online nu poate fi urmărită.', raspuns: false },
//             { text: 'Urmele digitale pot rămâne pe internet mult timp.', raspuns: true }
//         ]
//     }

// ];
// let arr4 = [

//     {
//         propozitii: [
//             { text: 'Criptarea transformă datele într-un cod securizat.', raspuns: true },
//             { text: 'Criptarea face datele publice.', raspuns: false },
//             { text: 'Doar persoanele autorizate pot citi date criptate.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Un VPN poate proteja conexiunea la internet.', raspuns: true },
//             { text: 'VPN-ul face internetul mai lent fără niciun beneficiu.', raspuns: false },
//             { text: 'VPN-ul creează o conexiune securizată.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Firewall-ul monitorizează traficul de rețea.', raspuns: true },
//             { text: 'Firewall-ul distruge calculatorul.', raspuns: false },
//             { text: 'Firewall-ul poate bloca accesul neautorizat.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Atacurile cibernetice încearcă să acceseze sisteme informatice.', raspuns: true },
//             { text: 'Atacurile cibernetice ajută la securitate.', raspuns: false },
//             { text: 'Unele atacuri încearcă să distrugă date.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Ingineria socială manipulează oamenii pentru a obține informații.', raspuns: true },
//             { text: 'Ingineria socială este un program antivirus.', raspuns: false },
//             { text: 'Atacatorii folosesc uneori manipularea psihologică.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Monitorizarea securității detectează activități suspecte.', raspuns: true },
//             { text: 'Nu este nevoie să monitorizăm rețelele.', raspuns: false },
//             { text: 'Sistemele de securitate pot identifica atacuri.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Backup-ul permite recuperarea datelor pierdute.', raspuns: true },
//             { text: 'Backup-ul șterge datele.', raspuns: false },
//             { text: 'Copiile de siguranță sunt importante.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Ransomware-ul blochează accesul la date.', raspuns: true },
//             { text: 'Ransomware-ul este un program de protecție.', raspuns: false },
//             { text: 'Uneori atacatorii cer bani pentru deblocarea datelor.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Politicile de securitate stabilesc reguli pentru protecția datelor.', raspuns: true },
//             { text: 'Politicile de securitate nu sunt necesare.', raspuns: false },
//             { text: 'Organizațiile folosesc reguli pentru a proteja informațiile.', raspuns: true }
//         ]
//     },

//     {
//         propozitii: [
//             { text: 'Educația în securitate ajută la recunoașterea pericolelor online.', raspuns: true },
//             { text: 'Nu este important să învățăm despre securitate.', raspuns: false },
//             { text: 'Cunoștințele despre securitate cresc siguranța online.', raspuns: true }
//         ]
//     }

// ];








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
        }
        else {
            contor_assasment_incercari++;
        }


        localStorage.setItem('contor_assasment_true-false_corecte', JSON.stringify(contor_assasment_corecte));
        localStorage.setItem('contor_assasment_true-false_incercari', JSON.stringify(contor_assasment_incercari));


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

