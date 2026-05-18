//----------------------------------------------------------------------------------------------------------------------
//Pagina de crearea a jocului true-false
//----------------------------------------------------------------------------------------------------------------------




//----------------------------------------------------------------------------------------------------------------------
//Importul din class service care salveaza jocul in baza de date
//----------------------------------------------------------------------------------------------------------------------
import { salveazaJocTrueFalse } from "/public/assets/js/game-service/teachers-create-game-tuefalse.js";






//----------------------------------------------------------------------------------------------------------------------
//Elementele HTML din pagina
//----------------------------------------------------------------------------------------------------------------------
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




//----------------------------------------------------------------------------------------------------------------------
//Functia care afiseaza vreo erroare daca exista
//----------------------------------------------------------------------------------------------------------------------
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





//----------------------------------------------------------------------------------------------------------------------
//Inceperea dupa ce a fost adaugat numarul deconditii necesare
//----------------------------------------------------------------------------------------------------------------------
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






//----------------------------------------------------------------------------------------------------------------------
//Apasarea butonul de adaugare a conditiei
//----------------------------------------------------------------------------------------------------------------------
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



  //----------------------------------------------------------------------------------------------------------------------
  //Crearea obectului care il vom impine in arr
  //----------------------------------------------------------------------------------------------------------------------
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




    
    //----------------------------------------------------------------------------------------------------------------------
    //Se salveaza in local storage conditii care daca apesi pe butonul Mergi la joc
    //----------------------------------------------------------------------------------------------------------------------
    document.querySelector('#btn_mergilajoc').addEventListener('click', () => {
      localStorage.setItem("intrebariTrueFalse", JSON.stringify(arrIntrebariProfesor));
    })


    btnAdauga.disabled = true;
    btnAdauga.classList.add("opacity-50", "cursor-not-allowed");




    //----------------------------------------------------------------------------------------------------------------------
    //Salvarea jocului in baza de date
    //----------------------------------------------------------------------------------------------------------------------
    const joc = {
      nume: nume_joc.value,
      tip: "true-false",
      intrebari: [...arrIntrebariProfesor]
    };
    await salveazaJocTrueFalse(joc);
    console.log("Joc salvat:", joc);

  }
});

//----------------------------------------------------------------------------------------------------------------------
//Butonul de restart
//----------------------------------------------------------------------------------------------------------------------
btnRestart.addEventListener("click", () => {
  arrIntrebariProfesor = [];
  localStorage.removeItem("intrebariTrueFalse");
  location.reload();
});





function actualizeazaInterfata() {
  titluPas.textContent = `Configurează întrebarea ${arrIntrebariProfesor.length + 1}`;
  progresText.textContent = `Întrebări adăugate: ${arrIntrebariProfesor.length} / ${numarTotal}`;
}