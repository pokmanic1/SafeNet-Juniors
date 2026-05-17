import { salveazaJocPassword } from '/public/assets/js/game-service/teachers-create-game-password.js'
let arrProfesori = [];
let toateIntrebarile = JSON.parse(localStorage.getItem("toate_jocPassword")) || [];
const nume_joc = document.getElementById("nume_joc");
let nr_conditii = document.getElementById("nr_conditii");
let btn_incepe = document.getElementById("btn_incepe");
let adev = true;
let conditie = document.getElementById("conditie");
let valoareExtra = document.getElementById("valoareExtra");
let button = document.getElementById("btn");
let mesajEroare = document.getElementById("mesajEroare");
const titluPas = document.getElementById("titlu_pas");
function afiseazaEroare(text, culoare, timp = 2000) {
    mesajEroare.innerText = text;
    mesajEroare.classList.remove("hidden");
    mesajEroare.classList.add(culoare);

    setTimeout(() => {
        mesajEroare.classList.add("hidden");
        mesajEroare.innerText = "";
    }, timp);
}

conditie.classList.add("hidden");
btn.classList.add("hidden");
document.getElementById("btn_restart").classList.add("hidden");

function alegereaNumarului() {

    const numar = Number(nr_conditii.value);

    if (numar > 0 && numar <= 10) {

        conditie.classList.remove("hidden");
        button.classList.remove("hidden");
        titluPas.classList.remove('hidden');
        document.getElementById("btn_restart").classList.remove("hidden");

        nr_conditii.classList.add("hidden");
        btn_incepe.classList.add("hidden");
        nume_joc.classList.add("hidden");

        console.log("Joc început cu", numar, "condiții");

    } else {
        afiseazaEroare("Introdu un număr de condiții dintre 1 și 10", 'text-red-500');
    }

}

btn_incepe.addEventListener("click", () => {
    alegereaNumarului();
});




conditie.addEventListener("change", () => {

    if (conditie.value === "1") {
        valoareExtra.classList.remove("hidden");
    } else {
        valoareExtra.classList.add("hidden");
        valoareExtra.value = "";
    }

});


button.addEventListener("click", async () => {


    if (conditie.value === "") {
        afiseazaEroare("Alege o condiție!", 'text-red-500');


        return;
    }

    const textConditie = conditie.options[conditie.selectedIndex].text;
    const valoareNoua = valoareExtra.value.trim();

    const conflictGasit = arrProfesori.some(element => {
        if (element.conditie === textConditie) {
            if (conditie.value === "1") {
                if (element.valoare === valoareNoua) {

                    afiseazaEroare("Această condiție cu această valoare există deja!", 'text-red-500');
                    return true;
                }
            } else {
                afiseazaEroare("Această condiție a fost deja adăugată!", 'text-red-500');
                return true;
            }
        }

        if (textConditie === "Sa aiba lungime para" && element.conditie === "Sa aiba lungime impara") {

            afiseazaEroare("Conflict: Ai deja lungime IMPARĂ setată!", 'text-red-500');

            return true;
        }
        if (textConditie === "Sa aiba lungime impara" && element.conditie === "Sa aiba lungime para") {

            afiseazaEroare("Conflict: Ai deja lungime PARĂ setată!", 'text-red-500');

            return true;
        }

        return false;
    });

    if (conflictGasit) return;

    let obiect = {
        tip: conditie.value,
        conditie: textConditie
    };

    if (conditie.value === "1") {
        if (!valoareNoua) {
            afiseazaEroare("Trebuie să introduci o valoare!", 'text-red-500');
            return;
        }
        obiect.valoare = valoareNoua;
    }

    arrProfesori.push(obiect);
    titluPas.textContent = `Configurează regula ${arrProfesori.length + 1}`;
    document.querySelector('#btn_mergilajoc').addEventListener('click', () => {
        localStorage.setItem("conditiiProfesori", JSON.stringify(arrProfesori));
    })
    let joc = {
        nume: nume_joc.value,
        tip: "password",
        reguli: [...arrProfesori]
    };
    toateIntrebarile.push(joc);
    await salveazaJocPassword(joc);
    console.log("Joc salvat:", joc);


    valoareExtra.value = "";
    console.log("Adăugat cu succes:", obiect); mesajEroare.classList.add("hidden");
    // button.classList.add("scale-110", "bg-green-500", "shadow-green-200");
    // button.innerText = "Adăugat! ";

    // setTimeout(() => {
    //     button.classList.remove("scale-110", "bg-green-500", "shadow-green-200");
    //     button.innerText = "Adaugă Regula";
    //     button.disabl
    // }, 1000);
    if (arrProfesori.length === Number(nr_conditii.value)) {

        afiseazaEroare(`Felicitări! Ai configurat toate întrebările. Acum poți merge la joc.`, 'text-green-500');
        button.disabled = true;
        button.classList.add("cursor-not-allowed", "opacity-50");
        document.querySelector(".btnMergiLaJoc").classList.remove("hidden");
        return;
    }
});


document.getElementById("btn_restart").addEventListener('click', () => {
    arrProfesori = [];
    nr_conditii.value = "";
    conditie.classList.add("hidden");
    btn.classList.add("hidden");
    document.getElementById("btn_restart").classList.add("hidden");
    valoareExtra.classList.add("hidden");
    document.querySelector(".btnMergiLaJoc").classList.add("hidden");
    titluPas.classList.add('hidden')
    nr_conditii.classList.remove("hidden");
    btn_incepe.classList.remove("hidden");
    nume_joc.classList.remove("hidden");
    alegereaNumarului();
});



localStorage.setItem("conditii", JSON.stringify(arrProfesori));
