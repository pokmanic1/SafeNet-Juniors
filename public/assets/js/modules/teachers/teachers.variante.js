//----------------------------------------------------------------------------------------------------------------------
//Pagina de crearea a jocului variante
//----------------------------------------------------------------------------------------------------------------------




//----------------------------------------------------------------------------------------------------------------------
//Importul din class service care salveaza jocul in baza de date
//----------------------------------------------------------------------------------------------------------------------
import { salveazaJocVariante } from "/assets/js/game-service/teachers-create-game-variante.js";








//----------------------------------------------------------------------------------------------------------------------
//Elementele HTML din pagina
//----------------------------------------------------------------------------------------------------------------------
let arrIntrebariVariante = [];
let numarTotal = 0;
let toateIntrebarile = JSON.parse(localStorage.getItem("toate_jocVariante")) || [];
const nume_joc = document.getElementById("nume_joc");
const inputNr = document.getElementById("nr_intrebari");
const btnIncepe = document.getElementById("btn_incepe");
const pasul1 = document.getElementById("pasul1");
const pasul2 = document.getElementById("pasul2");

const inputText = document.getElementById("text_intrebare");
const btnAdauga = document.getElementById("btn_adauga");
const btnRestart = document.getElementById("btn_restart");
const titluPas = document.getElementById("titlu_pas");
const progresText = document.getElementById("progres");





//----------------------------------------------------------------------------------------------------------------------
//Functia care afiseaza vreo erroare daca exista
//----------------------------------------------------------------------------------------------------------------------
function afiseazaEroare(text, culoare, timp = 2000) {
    const mesajEroare = document.getElementById("mesajEroare");
    if (!mesajEroare) return;
    mesajEroare.innerText = text;
    mesajEroare.classList.remove("hidden");
    mesajEroare.classList.add(culoare);
    setTimeout(() => {
        mesajEroare.classList.add("hidden");
        mesajEroare.innerText = "";
    }, timp);
}




//----------------------------------------------------------------------------------------------------------------------
//Inceperea dupa ce a fost adaugat numarul deconditii necesare
//----------------------------------------------------------------------------------------------------------------------
btnIncepe.addEventListener("click", () => {
    numarTotal = parseInt(inputNr.value);
    if (numarTotal > 0) {
        pasul1.classList.add("hidden");
        pasul2.classList.remove("hidden");
        actualizeazaInterfata();
    } else {
        afiseazaEroare("Introdu un număr valid de întrebări!", "text-red-500");
    }
});



//----------------------------------------------------------------------------------------------------------------------
//Apasarea butonul de adaugare a conditiei
//----------------------------------------------------------------------------------------------------------------------
btnAdauga.addEventListener("click", async () => {
    const textIntrebare = inputText.value.trim();
    const radioCorect = document.querySelector('input[name="raspuns_corect"]:checked');



    //----------------------------------------------------------------------------------------------------------------------
    //textul din variantee fara spatii adaugatoare
    //----------------------------------------------------------------------------------------------------------------------
    const v0 = document.getElementById("v0").value.trim();
    const v1 = document.getElementById("v1").value.trim();
    const v2 = document.getElementById("v2").value.trim();
    const v3 = document.getElementById("v3").value.trim();



    if (!textIntrebare || !v0 || !v1 || !v2 || !v3) {
        afiseazaEroare("Te rugăm să completezi toate câmpurile!", "text-red-500");
        return;
    }



    if (!radioCorect) {
        afiseazaEroare("Te rugăm să bifezi varianta corectă!", "text-red-500");
        return;
    }


    //----------------------------------------------------------------------------------------------------------------------
    //Varificare care varianta a ales utiilizatorul sa fie corecta
    //----------------------------------------------------------------------------------------------------------------------
    const indexCorect = parseInt(radioCorect.value);

    const obiectIntrebare = {
        intrebare: textIntrebare,
        variante: [
            { varianta: v0, raspuns: indexCorect === 0 },
            { varianta: v1, raspuns: indexCorect === 1 },
            { varianta: v2, raspuns: indexCorect === 2 },
            { varianta: v3, raspuns: indexCorect === 3 }
        ]
    };

    arrIntrebariVariante.push(obiectIntrebare);



    //----------------------------------------------------------------------------------------------------------------------
    //Se salveaza in local storage conditii care daca apesi pe butonul Mergi la joc
    //----------------------------------------------------------------------------------------------------------------------
    document.querySelector('#btn_mergilajoc').addEventListener('click', () => {
        localStorage.setItem("jocVarianteCustom", JSON.stringify(arrIntrebariVariante));
    })



    //----------------------------------------------------------------------------------------------------------------------
    //resetul inputurilor
    //----------------------------------------------------------------------------------------------------------------------
    inputText.value = "";
    document.getElementById("v0").value = "";
    document.getElementById("v1").value = "";
    document.getElementById("v2").value = "";
    document.getElementById("v3").value = "";
    radioCorect.checked = false;



    //----------------------------------------------------------------------------------------------------------------------
    //Verificam daca a a adaugat toate conditiile
    //----------------------------------------------------------------------------------------------------------------------
    if (arrIntrebariVariante.length < numarTotal) {
        actualizeazaInterfata();
    } else {
        //----------------------------------------------------------------------------------------------------------------------
        //Salvarea jocului in baza de date
        //----------------------------------------------------------------------------------------------------------------------
        let joc = {
            nume: nume_joc.value,
            tip: 'variante',
            intrebari: [...arrIntrebariVariante]
        }
        await salveazaJocVariante(joc);
        console.log("Joc salvat:", joc);

        afiseazaEroare("Toate întrebările au fost salvate cu succes!", "text-green-500");
        document.querySelector(".btnMergiLaJoc").classList.remove("hidden");

        btnAdauga.disabled = true;
        btnAdauga.classList.add("opacity-50", "cursor-not-allowed");
    }
});



//----------------------------------------------------------------------------------------------------------------------
//Butonul de restart
//----------------------------------------------------------------------------------------------------------------------
btnRestart.addEventListener("click", () => {
    localStorage.removeItem("jocVarianteCustom");
    location.reload();

});





function actualizeazaInterfata() {
    titluPas.textContent = `Configurează Întrebarea ${arrIntrebariVariante.length + 1}`;
    progresText.textContent = `Întrebări salvate: ${arrIntrebariVariante.length} / ${numarTotal}`;
}