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
            : Math.round((contor_assasment_corecte_shuffle / contor_assasment_incercari_shuffle) * 100),
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
        media: contor_assasment_incercari_truefalse === 0
            ? 0
            : Math.round((contor_assasment_corecte_truefalse / contor_assasment_incercari_truefalse) * 100),
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
            : Math.round((contor_assasment_corecte_password / contor_assasment_incercari_password) * 100),
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
            : Math.round((contor_assasment_corecte_variante / contor_assasment_incercari_variante) * 100),
        ancora: './game-page/variante-game-page/variante-game.html',
        statut: 0
    },
];


function schimbarea_statut(i) {
    ArrJocuri.forEach((item) => {
        if (i == item.id) {
            if (item.statut === 1) { item.statut = 0; }
            else { item.statut = 1; }
        }
    });
}

function vizitare_paginilor() {
    if (localStorage.getItem('vizitat_shuffle_game') === '1') { schimbarea_statut(1); }
    if (localStorage.getItem('vizitat_truefalse_game') === '1') { schimbarea_statut(2); }
    if (localStorage.getItem('vizitat_password_game') === '1') { schimbarea_statut(3); }
    if (localStorage.getItem('vizitat_variante_game') === '1') { schimbarea_statut(4); }
    console.log(ArrJocuri);
}

vizitare_paginilor();


let totalJocuri = 0;
for (let i = 0; i < ArrJocuri.length; i++) {
    if (ArrJocuri[i].incercari !== -1) {
        totalJocuri = totalJocuri + 1;
    }
}

let completate = 0;
for (let i = 0; i < ArrJocuri.length; i++) {
    if (ArrJocuri[i].statut === 1 && ArrJocuri[i].incercari > 0) {
        completate = completate + 1;
    }
}

let totalIncercari = 0;
for (let i = 0; i < ArrJocuri.length; i++) {
    if (ArrJocuri[i].statut === 1 && ArrJocuri[i].incercari > 0) {
        totalIncercari = totalIncercari + ArrJocuri[i].incercari;
    }
}

let sumaScoruri = 0;
let numarJocuriCuScor = 0;
for (let i = 0; i < ArrJocuri.length; i++) {
    if (ArrJocuri[i].statut === 1 && ArrJocuri[i].incercari > 0) {
        sumaScoruri = sumaScoruri + ArrJocuri[i].media;
        numarJocuriCuScor = numarJocuriCuScor + 1;
    }
}
let scorMediu = 0;
if (numarJocuriCuScor > 0) {
    scorMediu = Math.round(sumaScoruri / numarJocuriCuScor);
}

function culoareBara(procent) {
    if (procent >= 75) {
        return '#639922'; // verde
    }
    if (procent >= 45) {
        return '#BA7517'; // portocaliu
    }
    return '#E24B4A'; // rosu
}

function culoareText(procent) {
    if (procent >= 75) {
        return 'text-green-700 dark:text-green-400';
    }
    if (procent >= 45) {
        return 'text-amber-700 dark:text-amber-400';
    }
    return 'text-red-600 dark:text-red-400';
}


const statisticiHTML = `
<div class="w-full max-w-[800px] mx-auto px-5 mb-6">
    <div class="grid grid-cols-3 gap-2 sm:gap-3">
        <div class="bg-black/5 dark:bg-white/5 rounded-xl px-3 py-3">
            <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-1">Jocuri completate</p>
            <p class="text-xl font-medium text-black dark:text-white">${completate} / ${totalJocuri}</p>
        </div>
        <div class="bg-black/5 dark:bg-white/5 rounded-xl px-3 py-3">
            <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-1">Scor mediu</p>
            <p class="text-xl font-medium text-black dark:text-white">${scorMediu}%</p>
        </div>
        <div class="bg-black/5 dark:bg-white/5 rounded-xl px-3 py-3">
            <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-1">Total încercări</p>
            <p class="text-xl font-medium text-black dark:text-white">${totalIncercari}</p>
        </div>
    </div>
</div>`;


let sageata_stanga = "../assets/img/img-assasment/Sageata_stanga.png";

let AssasmentHTML = statisticiHTML;

ArrJocuri.forEach((item) => {
    if (item.statut !== 1) return;

    const iconImg = item.incercari === -1
        ? `../assets/img/img-assasment/Calendar_fara_iconita.png`
        : `../assets/img/img-assasment/Calendar_Check.png`;

    if (item.incercari === -1) {
        AssasmentHTML += `
        <div class="w-full max-w-[800px] mx-auto px-5 mt-3 sm:mt-4">
            <div class="card-total w-full rounded-2xl overflow-hidden border border-gray-300 dark:border-white/10">

                <button class="card-sus w-full flex items-center gap-3 px-4 py-3 bg-[#DADADA] dark:bg-[#3d4060]
                    hover:bg-[#cfcfcf] dark:hover:bg-[#454870] transition-colors duration-200 cursor-pointer">
                    <div class="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        <img src="${iconImg}" alt="" class="w-full h-auto dark:opacity-80">
                    </div>
                    <span class="flex-1 text-left text-sm sm:text-[15px] font-medium text-black dark:text-[#EBF6FF] truncate">
                        ${item.nume}
                    </span>
                    <img src="${sageata_stanga}" alt="" class="sageata w-4 h-4 flex-shrink-0 dark:opacity-80 transition-transform duration-300">
                </button>

                <div class="card-jos hidden bg-[#EEEEEE] dark:bg-[#3d4060] border-t border-gray-300 dark:border-white/10">
                    <div class="px-4 pt-3 pb-4">
                        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            ${item.descriere}
                        </p>
                        <div class="flex justify-end">
                            <a href="${item.ancora}"
                                class="inline-flex items-center justify-center px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-medium transition-colors duration-200">
                                Învață
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>`;

    } else {
        const culoare = culoareBara(item.media);
        const clsText = culoareText(item.media);

        AssasmentHTML += `
        <div class="w-full max-w-[800px] mx-auto px-5 mt-3 sm:mt-4">
            <div class="card-total w-full rounded-2xl overflow-hidden border border-gray-300 dark:border-white/10">

                <button class="card-sus w-full flex items-center gap-3 px-4 py-3 bg-[#DADADA] dark:bg-[#3d4060]
                    hover:bg-[#cfcfcf] dark:hover:bg-[#454870] transition-colors duration-200 cursor-pointer">
                    <div class="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                        <img src="${iconImg}" alt="" class="w-full h-auto dark:opacity-80">
                    </div>
                    <span class="flex-1 text-left text-sm sm:text-[15px] font-medium text-black dark:text-[#EBF6FF] truncate">
                        ${item.nume}
                    </span>
                    <img src="${sageata_stanga}" alt="" class="sageata w-4 h-4 flex-shrink-0 dark:opacity-80 transition-transform duration-300">
                </button>

                <div class="card-jos hidden bg-[#EEEEEE] dark:bg-[#3d4060] border-t border-gray-300 dark:border-white/10">
                    <div class="px-4 pt-3 pb-4">
                        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                            ${item.descriere}
                        </p>

                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-[11px] text-gray-500 dark:text-gray-400 w-14 flex-shrink-0">Reușită</span>
                            <div class="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                <div class="progress-fill h-full rounded-full w-0 transition-none"
                                    style="background:${culoare};"
                                    data-target="${item.media}">
                                </div>
                            </div>
                            <span class="text-[11px] font-medium w-8 text-right flex-shrink-0 ${clsText}">
                                ${item.media}%
                            </span>
                        </div>

                        <p class="text-[11px] text-gray-400 dark:text-gray-500 mb-3">
                            Încercări: ${item.incercari}
                        </p>

                        <div class="flex justify-end">
                            <a href="${item.ancora}"
                                class="inline-flex items-center justify-center px-5 py-2 rounded-xl bg-black dark:bg-blue-700 hover:bg-gray-800 dark:hover:bg-blue-800 text-white text-xs sm:text-sm font-medium transition-colors duration-200">
                                Joacă-te
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>`;
    }
});

document.querySelector('.tabele_assasment').innerHTML = AssasmentHTML;


document.querySelectorAll('.card-total').forEach((card) => {
    const buton = card.querySelector('.card-sus');
    const cardJos = card.querySelector('.card-jos');
    const sageata = card.querySelector('.sageata');
    let esteInchis = true;

    buton.addEventListener('click', () => {
        if (esteInchis) {
            cardJos.classList.remove('hidden');
            sageata.style.transform = 'rotate(-90deg)';

            const bar = cardJos.querySelector('.progress-fill');
            if (bar) {
                const target = bar.getAttribute('data-target');
                requestAnimationFrame(() => {
                    bar.style.transition = 'width 0.6s ease';
                    bar.style.width = target + '%';
                });
            }

            esteInchis = false;
        } else {
            cardJos.classList.add('hidden');
            sageata.style.transform = 'rotate(0deg)';

            const bar = cardJos.querySelector('.progress-fill');
            if (bar) {
                bar.style.transition = 'none';
                bar.style.width = '0%';
            }

            esteInchis = true;
        }
    });
});


localStorage.removeItem("");