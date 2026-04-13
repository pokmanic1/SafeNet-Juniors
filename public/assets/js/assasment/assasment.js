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
            <div class="container flex flex-col items-center justify-center mt-[10px] sm:mt-[20px] md:mt-[30px] lg:mt-[40px] px-4 sm:px-6">
                <div class="card-total overflow-hidden relative w-full max-w-[800px] flex items-center justify-center transition-all duration-300 hover:scale-[1.01]" style="height:80px">
                        
                        
                    <!-- --------- -->
                    <div
                        class="card-sus border-[1px] border-gray-400 w-full max-w-[1000px] h-[58px] sm:h-[66px] md:h-[74px] lg:h-[80px] bg-[#DADADA] rounded-[10px] sm:rounded-[25px] lg:rounded-[30px] absolute top-0 left-0 z-10 flex items-center justify-between px-3 sm:px-5 lg:px-6 transition-all duration-300 hover:bg-[#cfcfcf] hover:shadow-lg cursor-pointer">
                        
                        <div class="icon h-[60%] flex items-center w-[36px] sm:w-[44px] lg:w-[50px] flex-shrink-0 transition-transform duration-300 hover:scale-110">
                            <img src="../assets/img/img-assasment/Calendar_fara_iconita.png" alt="" class="w-full h-auto">
                        </div>
                        
                        <div class="text text-black flex items-center text-[17px] sm:text-[17px] md:text-[18px] lg:text-[19px] flex-1 mx-2 sm:mx-3 lg:mx-4 h-[60%] truncate transition-all duration-300">
                            ${item.nume}
                        </div>
                        
                        <button class="sageata h-[60%] mt-[6px] w-[20px] sm:w-[20px] md:w-[30px] flex-shrink-0 transition-transform duration-300 hover:rotate-[-90deg]">
                            <img src=${sageata_stanga} alt="" class="w-full h-auto">
                        </button>
                    </div>
                    <!-- -------- -->
                        
                    <div
                        class="card-jos border-[1px] border-gray-500 flex hidden bg-[#EEEEEE] w-full max-w-[800px] h-[250px] sm:h-[260px] md:h-[280px] lg:h-[300px] absolute top-0 left-0 z-0 rounded-[15px] sm:rounded-[25px] lg:rounded-[30px] p-[15px] sm:p-[20px] lg:p-[30px] transition-all duration-500 ease-in-out">
                        
                        <div class="w-[80%]">
                            <h2 class="mt-[70px] text-black w-full sm:w-[380px] lg:w-[550px] h-[50px] text-[15px] sm:text-[16px] lg:text-[17px] leading-snug transition-all duration-300 hover:text-slate-700">
                                ${item.descriere}
                            </h2>
                        </div>
                        
                        <div class="flex justify-end w-[80px] sm:w-[90px] px-1 lg:w-[110px] h-[40px] sm:h-[45px] lg:h-[50px] mt-[180px] md:mt-[200px] bg-black ml-[20px] sm:ml-[50px] lg:ml-[95px] 
                        rounded-[15px] sm:rounded-[20px] lg:rounded-[30px] transition-all duration-300 hover:scale-105 active:scale-95">
                            <a class="flex items-center justify-center w-full h-full text-white text-[13px] sm:text-[15px] lg:text-[16px] transition-all duration-300">
                                Invata
                            </a>
                        </div>
                    </div>
                </div>
            </div>`
        }
        else {
            AssasmentHTML += `
            <div class="container flex flex-col items-center justify-center mt-[10px] sm:mt-[20px] md:mt-[30px] lg:mt-[40px] px-4 sm:px-6">
                <div class="card-total overflow-hidden relative w-full max-w-[800px] flex items-center justify-center transition-all duration-300 hover:scale-[1.01]" style="height:80px">
                    
                    <!-- --------- -->
                    <div
                        class="card-sus border-[1px] border-gray-400 w-full max-w-[1200px] h-[58px] sm:h-[66px] md:h-[74px] lg:h-[80px] bg-[#DADADA] rounded-[10px] sm:rounded-[25px] lg:rounded-[30px]
                         absolute top-0 left-0 z-10 flex items-center justify-between px-3 sm:px-5 lg:px-6 transition-all duration-300 hover:bg-[#cfcfcf] hover:shadow-lg cursor-pointer">
                        
                        <div class="icon h-[60%] flex items-center w-[36px] sm:w-[44px] lg:w-[50px] flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                            <img src="../assets/img/img-assasment/Calendar_Check.png" alt="" class="w-full h-auto">
                        </div>
                    
                        <div class="text text-black flex items-center text-[17px] sm:text-[18px] md:text-[19px] lg:text-[20px] flex-1 mx-2 sm:mx-3 lg:mx-4 h-[60%] truncate transition-all duration-300">
                            ${item.nume}
                        </div>
                    
                        <button class="sageata h-[60%] mt-[6px] w-[20px] sm:w-[20px] md:w-[30px] flex-shrink-0 transition-transform duration-300 hover:rotate-[-90deg]">
                            <img src=${sageata_stanga} alt="" class="w-full h-auto">
                        </button>
                    </div>
                    <!-- -------- -->
                    
                    <div
                        class="card-jos border-[1px] border-gray-400 flex hidden bg-[#EEEEEE] w-full max-w-[800px] h-[250px] sm:h-[260px] md:h-[280px] lg:h-[300px] 
                        absolute top-0 left-0 z-0 rounded-[15px] sm:rounded-[25px] lg:rounded-[30px] p-[15px] sm:p-[20px] lg:p-[30px] transition-all duration-500 ease-in-out ">
                        
                        <div class="w-[80%]">
                            <h2 class="mt-[70px] text-black w-full sm:w-[380px] lg:w-[550px] h-[50px] text-[15px] sm:text-[16px] lg:text-[17px] leading-snug transition-all duration-300 hover:text-slate-700">
                                ${item.descriere}
                            </h2>
                    
                            <h3 class="mt-[60px] md:mt-[80px] lg:mt-[85px] text-black w-[200px] h-[30px] text-[15px] sm:text-[16px] lg:text-[17px] transition-all duration-300 hover:text-slate-700">
                                Reușită: ${item.media} %
                            </h3>
                    
                            <h3 class="text-black w-[200px] h-[30px] text-[15px] sm:text-[16px] lg:text-[17px] transition-all duration-300 hover:text-slate-700">
                                Încercări: ${item.incercari}
                            </h3>
                        </div>
                    
                        <div class="flex justify-end w-[80px] sm:w-[90px] px-1 lg:w-[110px] h-[40px] sm:h-[45px] lg:h-[50px] mt-[180px] md:mt-[200px] bg-black ml-[20px] sm:ml-[50px] lg:ml-[95px] rounded-[15px] 
                        sm:rounded-[20px] lg:rounded-[30px] transition-all duration-300  hover:scale-105 active:scale-95">
                            <a class="flex items-center justify-center w-full h-full text-white text-[13px] sm:text-[15px] lg:text-[16px] transition-all duration-300">
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


