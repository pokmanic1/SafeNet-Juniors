import { salveazaJocVariante } from "/public/assets/js/game-service/teachers-create-game-variante.js";
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

btnAdauga.addEventListener("click", async () => {
    const textIntrebare = inputText.value.trim();
    const radioCorect = document.querySelector('input[name="raspuns_corect"]:checked');

    const v0 = document.getElementById("v0").value.trim();
    const v1 = document.getElementById("v1").value.trim();
    const v2 = document.getElementById("v2").value.trim();
    const v3 = document.getElementById("v3").value.trim();
    let mesajEroare = document.getElementById("mesajEroare");

    function afiseazaEroare(text, culoare, timp = 2000) {
        mesajEroare.innerText = text;
        mesajEroare.classList.remove("hidden");
        mesajEroare.classList.add(culoare);

        setTimeout(() => {
            mesajEroare.classList.add("hidden");
            mesajEroare.innerText = "";
        }, timp);
    }

    if (!textIntrebare || !v0 || !v1 || !v2 || !v3) {
        afiseazaEroare("Te rugăm să completezi toate câmpurile!", "text-red-500");
        return;
    }

    if (!radioCorect) {
        afiseazaEroare("Te rugăm să bifezi varianta corectă!", "text-red-500");
        return;
    }

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

    document.querySelector('#btn_mergilajoc').addEventListener('click', () => {
        localStorage.setItem("jocVarianteCustom", JSON.stringify(arrIntrebariVariante));
    })

    let joc = {
        nume: nume_joc.value,
        tip: 'variante',
        intrebari: [...arrIntrebariVariante]
    }
    await salveazaJocVariante(joc);
    console.log("Joc salvat:", joc);


    inputText.value = "";
    document.getElementById("v0").value = "";
    document.getElementById("v1").value = "";
    document.getElementById("v2").value = "";
    document.getElementById("v3").value = "";
    radioCorect.checked = false;

    if (arrIntrebariVariante.length < numarTotal) {
        actualizeazaInterfata();
    } else {
        afiseazaEroare("Toate întrebările au fost salvate cu succes!", "text-green-500");
        document.querySelector(".btnMergiLaJoc").classList.remove("hidden");

        btnAdauga.disabled = true;
        btnAdauga.classList.add("opacity-50", "cursor-not-allowed");
    }
});

btnRestart.addEventListener("click", () => {
    if (confirm("Ești sigur că vrei să ștergi tot?")) {
        localStorage.removeItem("jocVarianteCustom");
        location.reload();
    }
});

function actualizeazaInterfata() {
    titluPas.textContent = `Configurează Întrebarea ${arrIntrebariVariante.length + 1}`;
    progresText.textContent = `Întrebări salvate: ${arrIntrebariVariante.length} / ${numarTotal}`;
}