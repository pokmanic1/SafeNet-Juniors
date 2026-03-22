// -------------------------------
let contor_assasment_corecte_shuffle = JSON.parse(localStorage.getItem('contor_assasment_shuffle_corecte')) || 0;
let contor_assasment_incercari_shuffle = JSON.parse(localStorage.getItem('contor_assasment_shuffle_incercari')) || 0;
//--------------------------------------------------
let contor_assasment_corecte_truefalse = JSON.parse(localStorage.getItem('contor_assasment_true-false_corecte')) || 0;
let contor_assasment_incercari_truefalse = JSON.parse(localStorage.getItem('contor_assasment_true-false_incercari')) || 0;
// -------------------------------
let contor_assasment_corecte_password = JSON.parse(localStorage.getItem('contor_assasment_password_corecte')) || 0;
let contor_assasment_incercari_password = JSON.parse(localStorage.getItem('contor_assasment_password_incercari')) || 0;
// -------------------------------
let contor_assasment_corecte_variante = JSON.parse(localStorage.getItem('contor_assasment_password_corecte')) || 0;
let contor_assasment_incercari_variante = JSON.parse(localStorage.getItem('contor_assasment_password_incercari')) || 0;


let ArrJocuri = [
    {
        id: 1,
        nume: 'Documentatia Shuffle game',
        descriere: 'Înainte de a începe, citește documentația pentru a învăța termenii. Apoi potrivește fiecare imagine cu perechea sa!',
        incercari: -1,
        media: 0,
        ancora: './game-page/shuffle-game-page/documentatie-shuffle-game.html',
        statut: 1
    },
    {
        id: 1,
        nume: 'Shuffle game',
        descriere: 'Găsește perechile! Întoarce cartonașele și potrivește fiecare imagine cu termenul corect!',
        incercari: contor_assasment_incercari_shuffle || 0,
        media: contor_assasment_incercari_shuffle === 0
            ? 0
            : Math.round((contor_assasment_corecte_shuffle / contor_assasment_incercari_shuffle) * 100), ancora: './game-page/shuffle-game-page/shuffle-game.html',
        statut: 0
    },

    // --------------------------
    {
        id: 2,
        nume: 'Documentatia True-False game',
        descriere: 'Parcurge mai întâi documentația, apoi testează ce ai învățat! Tu decizi care afirmații sunt adevărate și care sunt false.',
        incercari: -1,
        media: 0,
        statut: 1
    },
    {
        id: 2,
        nume: 'True-False game',
        descriere: 'Ești suficient de atent? Citește fiecare afirmație despre securitatea online și decide dacă este adevărată sau falsă!',
        incercari: contor_assasment_incercari_truefalse,
        media: contor_assasment_incercari_shuffle === 0
            ? 0
            : Math.round((contor_assasment_corecte_shuffle / contor_assasment_incercari_shuffle) * 100), ancora: './game-page/true-false-game-page/documentatie-true-false-game.html',
        ancora: './game-page/true-false-game-page/true-false-game.html',
        statut: 0
    },

    // ---------------------------------
    {
        id: 3,
        nume: 'Documentatia Password game',
        descriere: 'Știi ce face o parolă sigură? Citește mai întâi documentația, apoi pune în practică ce ai învățat!',
        incercari: -1,
        media: 0,
        ancora: './game-page/password-game-page/documentatie-password-game.html',
        statut: 1
    },
    {
        id: 3,
        nume: 'Password game',
        descriere: 'Construiește o parolă cât mai puternică! Respectă regulile afișate și creează o combinație care să reziste oricărui atac!',
        incercari: contor_assasment_incercari_password || 0,
        media: contor_assasment_incercari_shuffle === 0
            ? 0
            : Math.round((contor_assasment_corecte_shuffle / contor_assasment_incercari_shuffle) * 100), ancora: './game-page/password-game-page/password-game.html',
        statut: 0
    },

    // ---------------------------------
    {
        id: 4,
        nume: 'Documentatia Variante game',
        descriere: 'Pregătește-te bine! Citește documentația înainte de a intra în quiz. Cel mai bine pregătit câștigă!',
        incercari: -1,
        media: 0,
        ancora: './game-page/variante-game-page/documentatie-variante-game.html',
        statut: 1
    },
    {
        id: 4,
        nume: 'Variante Game',
        descriere: 'Câte știi despre securitatea online? Răspunde rapid la întrebări și acumulează puncte. Fiecare secundă contează!',
        incercari: contor_assasment_incercari_variante || 0,
        media: Math.round((contor_assasment_corecte_variante / contor_assasment_incercari_variante) * 100),
        media: contor_assasment_incercari_shuffle === 0
            ? 0
            : Math.round((contor_assasment_corecte_shuffle / contor_assasment_incercari_shuffle) * 100), statut: 0
    },

]

function schimbarea_statut(i) {
    ArrJocuri.forEach((item) => {
        if (i == item.id) {
            if (item.statut === 1) { item.statut = 0; }
            else { item.statut = 1; }
        }
    })
}

function vizitare_paginilor() {

    if (localStorage.getItem('vizitat_shuffle_game') === '1') {
        console.log('a vizitat shuffle');
        schimbarea_statut(1);
    }
    else {
        console.log('NU a vizitat shuffle');
    }
    // ---------------------
    if (localStorage.getItem('vizitat_truefalse_game') === '1') {
        console.log('a vizitat true false');
        schimbarea_statut(2);
    } else { console.log('NU a vizitat true false') }
    // --------------------
    if (localStorage.getItem('vizitat_password_game') === '1') {
        console.log('a vizitat password');
        schimbarea_statut(3);
    }
    else {
        console.log('NU a vizitat password');
    }
    // ---------------------
    if (localStorage.getItem('vizitat_variante_game') === '1') {
        console.log('a vizitat variante');
        schimbarea_statut(4);
    } else { console.log('NU a vizitat variante') }
    console.log(ArrJocuri);
}
//localStorage.removeItem("vizitat_variante_game");
// localStorage.removeItem("vizitat_truefalse_game");
// localStorage.removeItem("vizitat_shuffle_game");
// localStorage.removeItem("vizitat_password_game");
vizitare_paginilor();


let sageata_jos = "../assets/img/img-assasment/Sageata_jos.png";
let sageata_stanga = "../assets/img/img-assasment/Sageata_stanga.png";

let incercariGeneral = 5;
let AssasmentHTML = ``;
ArrJocuri.forEach((item) => {
    if (item.statut === 1) {
        if (item.incercari === -1) {

            AssasmentHTML += `<div class="container flex flex-col items-center justify-center mt-[40px]">
            <div class="card-total overflow-hidden relative w-[800px] flex items-center justify-center" style="height:80px">


                <!-- --------- -->
                <div
                    class="card-sus w-[800px] h-[80px] bg-[#DADADA] rounded-[30px] absolute top-0 left-0 z-10 flex items-center justify-between px-6" >
                    <div class="icon h-[60%] mt-[11px] w-[50px]"> <img
                            src="../assets/img/img-assasment/Calendar_Check.png" alt=""></div>
                    <div class="text text-black  mt-[23px]  text-xl w-[400px] h-[60%]">${item.nume}</div>
                    <button class="sageata h-[60%] mt-[6px] w-[50px] ml-[210px]"><img
                            src=${sageata_stanga} alt=""></div>
                </button>
                <!-- -------- -->
                <div
                    class="card-jos flex overflow-hidden bg-[#EEEEEE] w-[800px] h-[300px] absolute top-0 left-0 z-0 rounded-[30px] p-[30px]" style="display:none">
                    <div class="w-70%">
                        <h2 class="mt-[70px] text-black w-[550px] h-[50px] ">${item.descriere}</h2>
                    </div>
                    <div class="w-[100px] h-[50px] mt-[200px] bg-black ml-[95px] rounded-[30px]">
                        <a class="flex items-center justify-center w-full h-full text-white" href=${item.ancora}>
                            Invata
                        </a>
                    </div>
                </div>
            </div>
        </div>`
        }
        else {
            AssasmentHTML += `<div class="container flex flex-col items-center justify-center mt-[40px]">
            <div class="card-total overflow-hidden relative w-[800px] flex items-center justify-center" style="height:80px">

                <!-- --------- -->
                <div
                    class="card-sus w-[800px] h-[80px] bg-[#DADADA] rounded-[30px] absolute top-0 left-0 z-10 flex items-center justify-between px-6">
                    <div class="icon h-[60%] mt-[11px] w-[50px]"> <img
                            src="../assets/img/img-assasment/Calendar_Check.png" alt=""></div>
                    <div class="text text-black  mt-[23px] text-xl w-[400px] h-[60%]">${item.nume}</div>
                    <button class="sageata h-[60%] mt-[6px] w-[50px] ml-[210px]"><img
                            src=${sageata_stanga} alt=""></div>
                </button>
                <!-- -------- -->
                <div
                    class="card-jos flex overflow-hidden bg-[#EEEEEE] w-[800px] h-[300px] absolute top-0 left-0 z-0 rounded-[30px] p-[30px]" style="display:none">
                    <div class="w-70%">
                        <h2 class="mt-[70px] text-black w-[550px] h-[50px] ">${item.descriere}</h2>
                        <h3 class="mt-[85px] text-black w-[200px] h-[30px] ">Reușită: ${item.media} %</h3>
                        <h3 class=" text-black w-[200px] h-[30px] ">Încercări: ${item.incercari}</h3>
                    </div>
                    <div class="w-[100px] h-[50px] mt-[200px] bg-black ml-[95px] rounded-[30px]">
                        <a class="flex items-center justify-center w-full h-full text-white" href=${item.ancora}>
                            Joaca-te
                        </a>
                    </div>
                </div>
            </div>
        </div>`
        }
    }

})

document.querySelector('.tabele_assasment').innerHTML = AssasmentHTML;


const carduri = document.querySelectorAll('.card-total');
const carduri_jos = document.querySelectorAll('.card-jos')
carduri.forEach((card) => {
    const buton = card.querySelector('.sageata');
    const imagineSageata = buton.querySelector('img');
    const cardJos = card.querySelector('.card-jos');
    let esteInchis = true;

    buton.addEventListener('click', () => {
        if (esteInchis) {
            imagineSageata.setAttribute('src', sageata_jos);
            cardJos.style.display = 'flex';
            card.style.height = '300px';
            esteInchis = false;
        } else {
            imagineSageata.setAttribute('src', sageata_stanga);
            cardJos.style.display = 'none';
            card.style.height = '80px';
            esteInchis = true;
        }
    });
});


localStorage.removeItem("");



ArrJocuri.forEach((item) => {

});


