import { salveazaJocShufle } from '/public/assets/js/game-service/teachers-create-game-shufle.js'

let toateIntrebarile = JSON.parse(localStorage.getItem("toate_jocShuffle")) || [];

const nume_joc = document.getElementById("nume_joc");
document.getElementById('btn_salveaza_shuffle').addEventListener('click', async () => {

    function afiseazaMesajShuffle(text, culoare, timp = 2000) {

        const mesaj = document.getElementById("mesajEroareShuffle");

        mesaj.innerText = text;
        mesaj.classList.remove("hidden");
        mesaj.classList.add(culoare);

        setTimeout(() => {
            mesaj.classList.add("hidden");
            mesaj.innerText = "";
        }, timp);
    }

    let finalArray = [];

    for (let i = 1; i <= 8; i++) {

        const cuvant = document.getElementById(`cuvant-${i}`).value.trim();
        const fileInput = document.getElementById(`imagine-${i}`).files[0];

        if (!cuvant || !fileInput) {
            afiseazaMesajShuffle(`Te rugăm să completezi perechea ${i}!`, 'text-red-500');
            return;
        }

        const base64Image = await convertBase64(fileInput);

        finalArray.push({
            id: i,
            type: "text",
            value: cuvant
        });

        finalArray.push({
            id: i,
            type: "image",
            value: cuvant,
            imaginea: base64Image
        });
    }

    finalArray.sort(() => Math.random() - 0.5);
    document.querySelector('#btn_mergilajoc').addEventListener('click', () => {
        localStorage.setItem("shuffleGameData", JSON.stringify(finalArray));
    })
    //
    document.getElementById('btn_salveaza_shuffle').disabled = true;
    document.getElementById('btn_salveaza_shuffle').classList.add("opacity-50", "cursor-not-allowed");;
    document.querySelector(".btnMergiLaJoc").classList.remove("hidden");
    console.log(finalArray);

    const joc = {
        nume: nume_joc.value,
        tip: "shuffle",
        date: finalArray
    };

    toateIntrebarile.push(joc);
    await salveazaJocShufle(joc);
    console.log("Joc salvat:", joc);
});

function convertBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (error) => reject(error);
    });
}