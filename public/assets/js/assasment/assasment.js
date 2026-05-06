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
let contor_assasment_corecte_variante = JSON.parse(localStorage.getItem('contor_assasment_variante_corecte')) || 0;
let contor_assasment_incercari_variante = JSON.parse(localStorage.getItem('contor_assasment_variante_incercari')) || 0;


let ArrJocuri = [
    {
        id: 1,
        nume: 'Potrivește Perechile Documentatia',
        descriere: 'Înainte de a începe, citește documentația pentru a învăța termenii. Apoi potrivește fiecare imagine cu perechea sa!',
        incercari: -1,
        media: 0,
        ancora: './game-page/shuffle-game-page/documentatie-shuffle-game.html',
        statut: 1
    },
    {
        id: 1,
        nume: 'Potrivește Perechile',
        descriere: 'Găsește perechile! Întoarce cartonașele și potrivește fiecare imagine cu termenul corect!',
        incercari: contor_assasment_incercari_shuffle || 0,
        media: contor_assasment_incercari_shuffle === 0
            ? 0
            : Math.round((contor_assasment_corecte_shuffle / contor_assasment_incercari_shuffle) * 100), ancora: './game-page/shuffle-game-page/shuffle-game.html',
        ancora: './game-page/shuffle-game-page/shuffle-game.html',
        statut: 0
    },

    // --------------------------
    {
        id: 2,
        nume: 'Adevărat sau Fals Documentatia',
        descriere: 'Parcurge mai întâi documentația, apoi testează ce ai învățat! Tu decizi care afirmații sunt adevărate și care sunt false.',
        incercari: -1,
        media: 0,
        ancora: './game-page/true-false-game-page/documentatie-true-false-game.html',
        statut: 1
    },
    {
        id: 2,
        nume: 'Adevărat sau Fals',
        descriere: 'Ești suficient de atent? Citește fiecare afirmație despre securitatea online și decide dacă este adevărată sau falsă!',
        incercari: contor_assasment_incercari_truefalse,
        media: contor_assasment_incercari_shuffle === 0
            ? 0
            : Math.round((contor_assasment_corecte_truefalse / contor_assasment_incercari_truefalse) * 100), ancora: './game-page/true-false-game-page/documentatie-true-false-game.html',
        ancora: './game-page/true-false-game-page/true-false-game.html',
        statut: 0
    },

    // ---------------------------------
    {
        id: 3,
        nume: 'Creează Parola Documentatia',
        descriere: 'Știi ce face o parolă sigură? Citește mai întâi documentația, apoi pune în practică ce ai învățat!',
        incercari: -1,
        media: 0,
        ancora: './game-page/password-game-page/documentatie-password-game.html',
        statut: 1
    },
    {
        id: 3,
        nume: 'Creează Parola',
        descriere: 'Construiește o parolă cât mai puternică! Respectă regulile afișate și creează o combinație care să reziste oricărui atac!',
        incercari: contor_assasment_incercari_password || 0,
        media: contor_assasment_incercari_password === 0
            ? 0
            : Math.round((contor_assasment_corecte_password / contor_assasment_incercari_password) * 100), ancora: './game-page/password-game-page/password-game.html',
        ancora: './game-page/password-game-page/password-game.html',
        statut: 0
    },

    // ---------------------------------
    {
        id: 4,
        nume: 'Răspunde Corect Documentatia',
        descriere: 'Pregătește-te bine! Citește documentația înainte de a intra în quiz. Cel mai bine pregătit câștigă!',
        incercari: -1,
        media: 0,
        ancora: './game-page/variante-game-page/documentatie-variante-game.html',
        statut: 1
    },
    {
        id: 4,
        nume: 'Răspunde Corect',
        descriere: 'Câte știi despre securitatea online? Răspunde rapid la întrebări și acumulează puncte. Fiecare secundă contează!',
        incercari: contor_assasment_incercari_variante || 0,
        media: contor_assasment_incercari_variante === 0
            ? 0
            : Math.round((contor_assasment_corecte_variante / contor_assasment_incercari_variante) * 100), statut: 0,
        
            ancora: './game-page/variante-game-page/variante-game.html',
        statut: 0
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

            AssasmentHTML += `
            <div class="container1 flex flex-col items-center justify-center mt-[8px] sm:mt-[15px] md:mt-[20px] lg:mt-[30px] px-5 ">
                <div class="card-total overflow-hidden relative w-full max-w-[800px] flex items-center justify-center transition-all duration-300 hover:scale-[1.01]" style="height:70px">
                        
                    <div class="card-sus border-[1px] border-gray-400 dark:border-[#EBF6FF]/20 w-full max-w-[1000px] h-[52px] sm:h-[60px] md:h-[66px] lg:h-[70px] bg-[#DADADA] dark:bg-[#3d4060] rounded-[10px] sm:rounded-[20px] lg:rounded-[25px] absolute top-0 left-0 z-10 flex items-center justify-between px-2 sm:px-4 lg:px-5 transition-all duration-300 hover:bg-[#cfcfcf] dark:hover:bg-[#454870] hover:shadow-lg cursor-pointer">
                        
                        <div class="icon h-[55%] flex items-center w-[28px] sm:w-[36px] lg:w-[42px] flex-shrink-0">
                            <img src="../assets/img/img-assasment/Calendar_fara_iconita.png" alt="" class="Calendar_fara_iconita w-full h-auto dark:opacity-80">
                        </div>
                        
                        <div class="text text-black dark:text-[#EBF6FF] flex items-center text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] flex-1 mx-2 sm:mx-3 h-[60%] truncate">
                            ${item.nume}
                        </div>
                        
                        <button class="sageata h-[55%] mt-[4px] w-[16px] sm:w-[18px] md:w-[22px] flex-shrink-0 transition-transform duration-300 hover:rotate-[-90deg]">
                            <img src=${sageata_stanga} alt="" class="sageata_stanga w-full h-auto dark:opacity-80">
                        </button>
                    </div>
                        
                    <div class="card-jos border-[1px] border-gray-500 dark:border-[#EBF6FF]/20 flex hidden bg-[#EEEEEE] dark:bg-[#3d4060] w-full max-w-[800px] h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px] absolute top-0 left-0 z-0 rounded-[15px] sm:rounded-[20px] lg:rounded-[25px] p-[12px] sm:p-[18px] lg:p-[24px] transition-all duration-500 ease-in-out">
                        
                        <div class="w-[80%]">
                            <h2 class="mt-[60px] sm:mt-[65px] text-black dark:text-[#EBF6FF] w-full sm:w-[340px] lg:w-[500px] h-[50px] text-[11px] sm:text-[12px] lg:text-[14px] leading-snug">
                                ${item.descriere}
                            </h2>
                        </div>
                        <div class="flex w-full justify-end">
                            <div class="flex justify-end w-[70px] sm:w-[80px] px-1 lg:w-[95px] h-[36px] sm:h-[40px] lg:h-[44px] mt-[160px] sm:mt-[175px] md:mt-[185px] bg-black dark:bg-[#1156ea] ml-[10px] sm:ml-[40px] lg:ml-[80px] rounded-[12px] sm:rounded-[16px] lg:rounded-[22px]">
                                <a href="${item.ancora}" class="flex items-center justify-center w-full h-full text-white text-[11px] sm:text-[12px] lg:text-[14px]">
                                    Invata
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        }
        else {
            AssasmentHTML += `
            <div class="container1 flex flex-col items-center justify-center w-full  sm:mt-[15px] md:mt-[20px] lg:mt-[30px] px-5 ">
                <div class="card-total overflow-hidden relative w-full max-w-[800px] flex items-center justify-center transition-all duration-300 hover:scale-[1.01]" style="height:70px">
                    
                    <div class="card-sus border-[1px] border-gray-400 dark:border-[#EBF6FF]/20 w-full max-w-[1200px] h-[52px] sm:h-[60px] md:h-[66px] lg:h-[70px] bg-[#DADADA] dark:bg-[#3d4060]
                     rounded-[10px] sm:rounded-[20px] lg:rounded-[25px] absolute top-0 left-0 z-10 flex items-center justify-between px-2 sm:px-4 lg:px-5 transition-all duration-300 hover:bg-[#cfcfcf] dark:hover:bg-[#454870] hover:shadow-lg cursor-pointer">
                        
                        <div class="icon h-[55%] flex items-center w-[28px] sm:w-[36px] lg:w-[42px] flex-shrink-0">
                            <img src="../assets/img/img-assasment/Calendar_Check.png" alt="" class="Calendar_Check w-full h-auto dark:opacity-80">
                        </div>
                    
                        <div class="text text-black dark:text-[#EBF6FF] flex items-center text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] flex-1 mx-2 sm:mx-3 h-[60%] truncate">
                            ${item.nume}
                        </div>
                    
                        <button class="sageata h-[55%] mt-[4px] w-[16px] sm:w-[18px] md:w-[22px] flex-shrink-0 transition-transform duration-300 hover:rotate-[-90deg]">
                            <img src=${sageata_stanga} alt="" class="sageata_stanga w-full h-auto dark:opacity-80">
                        </button>
                    </div>
                    
                    <div class="card-jos border-[1px] border-gray-400 dark:border-[#EBF6FF]/20 flex hidden bg-[#EEEEEE] dark:bg-[#3d4060] w-full max-w-[800px] h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px] absolute top-0 left-0 z-0 rounded-[15px] sm:rounded-[20px] lg:rounded-[25px] p-[12px] sm:p-[18px] lg:p-[24px] transition-all duration-500 ease-in-out">
                        
                        <div class="w-[80%]">
                            <h2 class="mt-[60px] sm:mt-[65px] text-black dark:text-[#EBF6FF] w-full sm:w-[340px] lg:w-[500px] h-[50px] text-[11px] sm:text-[12px] lg:text-[14px] leading-snug">
                                ${item.descriere}
                            </h2>
                    
                            <h3 class="mt-[40px] sm:mt-[50px] md:mt-[70px] text-black dark:text-[#EBF6FF] w-[200px] h-[30px] text-[11px] sm:text-[13px] lg:text-[14px]">
                                Reușită: ${item.media} %
                            </h3>
                    
                            <h3 class="text-black dark:text-[#EBF6FF] w-[200px] h-[30px]  text-[11px] sm:text-[13px] lg:text-[14px]">
                                Încercări: ${item.incercari}
                            </h3>
                        </div>
                         <div class="flex w-full justify-end">
                            <div class="flex justify-end w-[70px] sm:w-[80px] px-1 lg:w-[95px] h-[36px] sm:h-[40px] lg:h-[44px] mt-[160px] sm:mt-[175px] md:mt-[185px] bg-black dark:bg-[#1156ea] ml-[10px] sm:ml-[40px] lg:ml-[80px] rounded-[12px] sm:rounded-[16px] lg:rounded-[22px]">
                                <a href="${item.ancora}" class="flex items-center justify-center w-full h-full text-white text-[11px] sm:text-[12px] lg:text-[13px]">
                                    Joaca-te
                                </a>
                            </div>
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
            buton.classList.add('rotate-[-90deg]');
            buton.classList.remove('hover:rotate-[-90deg]');
            buton.classList.add('hover:rotate-[0deg]');

            cardJos.style.display = 'flex';
            card.style.height = '300px';
            esteInchis = false;

        } else {
            buton.classList.remove('rotate-[-90deg]');
            buton.classList.add('hover:rotate-[-90deg]');
            buton.classList.remove('hover:rotate-[0deg]');
            cardJos.style.display = 'none';
            card.style.height = '80px';
            esteInchis = true;
        }
    });
});


localStorage.removeItem("");



ArrJocuri.forEach((item) => {

});


