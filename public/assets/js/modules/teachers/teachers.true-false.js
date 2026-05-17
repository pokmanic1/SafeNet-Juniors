import { salveazaJocTrueFalse } from "/public/assets/js/game-service/teachers-create-game-tuefalse.js";

    let arrIntrebariProfesor = [];
    let numarTotal = 0;
    let toateIntrebarile = JSON.parse(localStorage.getItem("toate_jocTrueFalse")) || [];
    const nume_joc = document.getElementById("nume_joc");
    const inputNr = document.getElementById("nr_intrebari");
    const btnIncepe = document.getElementById("btn_incepe");
    const pasul1 = document.getElementById("pasul1");
    const pasul2 = document.getElementById("pasul2");

    const inputText = document.getElementById("text_intrebare");
    const inputRaspuns = document.getElementById("raspuns_corect");
    const btnAdauga = document.getElementById("btn_adauga");
    const btnRestart = document.getElementById("btn_restart");

    const titluPas = document.getElementById("titlu_pas");
    const progresText = document.getElementById("progres");

    function afiseazaMesajTF(text, culoare, timp = 2000) {

      const mesaj = document.getElementById("mesajEroareTF");

      mesaj.innerText = text;
      mesaj.classList.remove("hidden");
      mesaj.classList.add(culoare);

      setTimeout(() => {
        mesaj.classList.add("hidden");
        mesaj.innerText = "";
      }, timp);

    }

    btnIncepe.addEventListener("click", () => {
      numarTotal = parseInt(inputNr.value);

      if (numarTotal > 0 && numarTotal <= 10) {
        pasul1.classList.add("hidden");
        pasul2.classList.remove("hidden");
        actualizeazaInterfata();
      } else {
        afiseazaMesajTF("Te rugăm să introduci un număr între 1 și 10.", 'text-red-500');
      }
    });

    btnAdauga.addEventListener("click", async () => {
      const textValue = inputText.value.trim();
      const raspunsValue = inputRaspuns.value;

      if (!textValue) {
        afiseazaMesajTF("Te rugăm să scrii textul întrebării!", 'text-red-500');

        return;
      }
      if (!raspunsValue) {
        afiseazaMesajTF("Te rugăm să alegi dacă este Adevărat sau Fals!", 'text-red-500');

        return;
      }

      const obiectIntrebare = {
        text: textValue,
        raspuns: raspunsValue === "true"
      };

      const duplicat = arrIntrebariProfesor.some(q => q.text.toLowerCase() === textValue.toLowerCase());
      if (duplicat) {

        afiseazaMesajTF("Această întrebare a fost deja adăugată!", 'text-red-500');

        return;
      }
      arrIntrebariProfesor.push(obiectIntrebare);





      inputText.value = "";
      inputRaspuns.selectedIndex = 0;

      if (arrIntrebariProfesor.length < numarTotal) {
        actualizeazaInterfata();
      } else {

        afiseazaMesajTF("Felicitări! Ai configurat toate întrebările. Acum poți merge la joc.", 'text-green-500');
        document.querySelector(".btnMergiLaJoc").classList.remove("hidden");
        console.log('-------------------------------------------------');
        console.log('-------------------------------------------------');
        console.log('-----------sssssssssssssssssssss-----------------');
        console.log("Întrebări adăugate:", arrIntrebariProfesor);
        document.querySelector('#btn_mergilajoc').addEventListener('click', () => {
          localStorage.setItem("intrebariTrueFalse", JSON.stringify(arrIntrebariProfesor));
        })



        btnAdauga.disabled = true;
        btnAdauga.classList.add("opacity-50", "cursor-not-allowed");

        const joc = {
          nume: nume_joc.value,
          tip: "true-false",
          intrebari: [...arrIntrebariProfesor]
        };
        await salveazaJocTrueFalse(joc);
        console.log("Joc salvat:", joc);

      }
    });

    btnRestart.addEventListener("click", () => {
      arrIntrebariProfesor = [];
      localStorage.removeItem("intrebariTrueFalse");
      location.reload();
    });

    function actualizeazaInterfata() {
      titluPas.textContent = `Configurează întrebarea ${arrIntrebariProfesor.length + 1}`;
      progresText.textContent = `Întrebări adăugate: ${arrIntrebariProfesor.length} / ${numarTotal}`;
    }