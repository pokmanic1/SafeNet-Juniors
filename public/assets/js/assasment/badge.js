import { auth } from "../fierbase/firebase-init.js";
import { incarcaDateFirebase, vizite } from "./vizitare_documentatie.js";
import { incarcaContoareFirebase, contoare_jocuri } from "./contoarele_pentru_jocuri.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

let Bronze  = '/public/assets/img/img-assasment/badge/bronze 1.svg';
let Silver  = '/public/assets/img/img-assasment/badge/silver 1.svg';
let Gold    = '/public/assets/img/img-assasment/badge/gold 1.svg';
let Diamond = '/public/assets/img/img-assasment/badge/diamond 1.svg';
let Legend  = '/public/assets/img/img-assasment/badge/legend 1.svg';
let Super   = '/public/assets/img/img-assasment/badge/super 1.svg';

let arrBadge = [
    // 0 — Documentatie vizitata
    [
        { tip: 'Joc Shuffle Documentatia',     rank: 'Super', rankImg: Super, cerinta: 'Citeste documentatia jocului Shuffle',      descriere: 'Ai citit documentatia jocului Shuffle',      prag: 0 },
        { tip: 'Joc Adevarat-Fals Documentatia',rank: 'Super', rankImg: Super, cerinta: 'Citeste documentatia jocului Adevarat-Fals', descriere: 'Ai citit documentatia jocului Adevarat-Fals', prag: 0 },
        { tip: 'Joc Password  Documentatia',   rank: 'Super', rankImg: Super, cerinta: 'Citeste documentatia jocului Password',      descriere: 'Ai citit documentatia jocului Password',      prag: 0 },
        { tip: 'Joc Variante Documentatia',    rank: 'Super', rankImg: Super, cerinta: 'Citeste documentatia jocului Variante',      descriere: 'Ai citit documentatia jocului Variante',      prag: 0 },
    ],
    // 1 — SHUFFLE COMPLETAT
    [
        { tip: 'Joc Shuffle', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Completează jocul Shuffle de 5 ori',     descriere: 'Ai completat jocul Shuffle de 5 ori',     prag: 5  },
        { tip: 'Joc Shuffle', rank: 'Silver',  rankImg: Silver,  cerinta: 'Completează jocul Shuffle de 10 ori',    descriere: 'Ai completat jocul Shuffle de 10 ori',    prag: 10 },
        { tip: 'Joc Shuffle', rank: 'Gold',    rankImg: Gold,    cerinta: 'Completează jocul Shuffle de 20 de ori', descriere: 'Ai completat jocul Shuffle de 20 de ori', prag: 20 },
        { tip: 'Joc Shuffle', rank: 'Diamond', rankImg: Diamond, cerinta: 'Completează jocul Shuffle de 30 de ori', descriere: 'Ai completat jocul Shuffle de 30 de ori', prag: 30 },
        { tip: 'Joc Shuffle', rank: 'Legend',  rankImg: Legend,  cerinta: 'Completează jocul Shuffle de 50 de ori', descriere: 'Ai completat jocul Shuffle de 50 de ori', prag: 50 },
    ],
    // 2 — SHUFFLE CASTIGAT
    [
        { tip: 'Joc Shuffle', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Câștigă jocul Shuffle o dată',       descriere: 'Ai câștigat jocul Shuffle o dată',       prag: 1  },
        { tip: 'Joc Shuffle', rank: 'Silver',  rankImg: Silver,  cerinta: 'Câștigă jocul Shuffle de 3 ori',     descriere: 'Ai câștigat jocul Shuffle de 3 ori',     prag: 3  },
        { tip: 'Joc Shuffle', rank: 'Gold',    rankImg: Gold,    cerinta: 'Câștigă jocul Shuffle de 7 ori',     descriere: 'Ai câștigat jocul Shuffle de 7 ori',     prag: 7  },
        { tip: 'Joc Shuffle', rank: 'Diamond', rankImg: Diamond, cerinta: 'Câștigă jocul Shuffle de 14 ori',    descriere: 'Ai câștigat jocul Shuffle de 14 ori',    prag: 14 },
        { tip: 'Joc Shuffle', rank: 'Legend',  rankImg: Legend,  cerinta: 'Câștigă jocul Shuffle de 20 de ori', descriere: 'Ai câștigat jocul Shuffle de 20 de ori', prag: 20 },
    ],
    // 3 — TRUE/FALSE COMPLETAT
    [
        { tip: 'True sau False', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Completează jocul True sau False de 5 ori',     descriere: 'Ai completat jocul True sau False de 5 ori',     prag: 5  },
        { tip: 'True sau False', rank: 'Silver',  rankImg: Silver,  cerinta: 'Completează jocul True sau False de 10 ori',    descriere: 'Ai completat jocul True sau False de 10 ori',    prag: 10 },
        { tip: 'True sau False', rank: 'Gold',    rankImg: Gold,    cerinta: 'Completează jocul True sau False de 20 de ori', descriere: 'Ai completat jocul True sau False de 20 de ori', prag: 20 },
        { tip: 'True sau False', rank: 'Diamond', rankImg: Diamond, cerinta: 'Completează jocul True sau False de 30 de ori', descriere: 'Ai completat jocul True sau False de 30 de ori', prag: 30 },
        { tip: 'True sau False', rank: 'Legend',  rankImg: Legend,  cerinta: 'Completează jocul True sau False de 50 de ori', descriere: 'Ai completat jocul True sau False de 50 de ori', prag: 50 },
    ],
    // 4 — TRUE/FALSE CASTIGAT
    [
        { tip: 'True sau False', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Câștigă jocul True sau False o dată',       descriere: 'Ai câștigat jocul True sau False o dată',       prag: 1  },
        { tip: 'True sau False', rank: 'Silver',  rankImg: Silver,  cerinta: 'Câștigă jocul True sau False de 3 ori',     descriere: 'Ai câștigat jocul True sau False de 3 ori',     prag: 3  },
        { tip: 'True sau False', rank: 'Gold',    rankImg: Gold,    cerinta: 'Câștigă jocul True sau False de 7 ori',     descriere: 'Ai câștigat jocul True sau False de 7 ori',     prag: 7  },
        { tip: 'True sau False', rank: 'Diamond', rankImg: Diamond, cerinta: 'Câștigă jocul True sau False de 14 ori',    descriere: 'Ai câștigat jocul True sau False de 14 ori',    prag: 14 },
        { tip: 'True sau False', rank: 'Legend',  rankImg: Legend,  cerinta: 'Câștigă jocul True sau False de 20 de ori', descriere: 'Ai câștigat jocul True sau False de 20 de ori', prag: 20 },
    ],
    // 5 — PASSWORD COMPLETAT
    [
        { tip: 'Password', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Completează jocul Password de 5 ori',     descriere: 'Ai completat jocul Password de 5 ori',     prag: 5  },
        { tip: 'Password', rank: 'Silver',  rankImg: Silver,  cerinta: 'Completează jocul Password de 10 ori',    descriere: 'Ai completat jocul Password de 10 ori',    prag: 10 },
        { tip: 'Password', rank: 'Gold',    rankImg: Gold,    cerinta: 'Completează jocul Password de 20 de ori', descriere: 'Ai completat jocul Password de 20 de ori', prag: 20 },
        { tip: 'Password', rank: 'Diamond', rankImg: Diamond, cerinta: 'Completează jocul Password de 30 de ori', descriere: 'Ai completat jocul Password de 30 de ori', prag: 30 },
        { tip: 'Password', rank: 'Legend',  rankImg: Legend,  cerinta: 'Completează jocul Password de 50 de ori', descriere: 'Ai completat jocul Password de 50 de ori', prag: 50 },
    ],
    // 6 — PASSWORD CASTIGAT
    [
        { tip: 'Password', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Câștigă jocul Password o dată',       descriere: 'Ai câștigat jocul Password o dată',       prag: 1  },
        { tip: 'Password', rank: 'Silver',  rankImg: Silver,  cerinta: 'Câștigă jocul Password de 3 ori',     descriere: 'Ai câștigat jocul Password de 3 ori',     prag: 3  },
        { tip: 'Password', rank: 'Gold',    rankImg: Gold,    cerinta: 'Câștigă jocul Password de 7 ori',     descriere: 'Ai câștigat jocul Password de 7 ori',     prag: 7  },
        { tip: 'Password', rank: 'Diamond', rankImg: Diamond, cerinta: 'Câștigă jocul Password de 14 ori',    descriere: 'Ai câștigat jocul Password de 14 ori',    prag: 14 },
        { tip: 'Password', rank: 'Legend',  rankImg: Legend,  cerinta: 'Câștigă jocul Password de 20 de ori', descriere: 'Ai câștigat jocul Password de 20 de ori', prag: 20 },
    ],
    // 7 — VARIANTE COMPLETAT
    [
        { tip: 'Variante', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Completează jocul Variante de 5 ori',     descriere: 'Ai completat jocul Variante de 5 ori',     prag: 5  },
        { tip: 'Variante', rank: 'Silver',  rankImg: Silver,  cerinta: 'Completează jocul Variante de 10 ori',    descriere: 'Ai completat jocul Variante de 10 ori',    prag: 10 },
        { tip: 'Variante', rank: 'Gold',    rankImg: Gold,    cerinta: 'Completează jocul Variante de 20 de ori', descriere: 'Ai completat jocul Variante de 20 de ori', prag: 20 },
        { tip: 'Variante', rank: 'Diamond', rankImg: Diamond, cerinta: 'Completează jocul Variante de 30 de ori', descriere: 'Ai completat jocul Variante de 30 de ori', prag: 30 },
        { tip: 'Variante', rank: 'Legend',  rankImg: Legend,  cerinta: 'Completează jocul Variante de 50 de ori', descriere: 'Ai completat jocul Variante de 50 de ori', prag: 50 },
    ],
    // 8 — VARIANTE CASTIGAT
    [
        { tip: 'Variante', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Câștigă jocul Variante o dată',       descriere: 'Ai câștigat jocul Variante o dată',       prag: 1  },
        { tip: 'Variante', rank: 'Silver',  rankImg: Silver,  cerinta: 'Câștigă jocul Variante de 3 ori',     descriere: 'Ai câștigat jocul Variante de 3 ori',     prag: 3  },
        { tip: 'Variante', rank: 'Gold',    rankImg: Gold,    cerinta: 'Câștigă jocul Variante de 7 ori',     descriere: 'Ai câștigat jocul Variante de 7 ori',     prag: 7  },
        { tip: 'Variante', rank: 'Diamond', rankImg: Diamond, cerinta: 'Câștigă jocul Variante de 14 ori',    descriere: 'Ai câștigat jocul Variante de 14 ori',    prag: 14 },
        { tip: 'Variante', rank: 'Legend',  rankImg: Legend,  cerinta: 'Câștigă jocul Variante de 20 de ori', descriere: 'Ai câștigat jocul Variante de 20 de ori', prag: 20 },
    ],
];

let arrTitluri = [
    'Documentație',
    'Joc Shuffle — Jocuri completate',
    'Joc Shuffle — Jocuri câștigate',
    'True sau False — Jocuri completate',
    'True sau False — Jocuri câștigate',
    'Password — Jocuri completate',
    'Password — Jocuri câștigate',
    'Variante — Jocuri completate',
    'Variante — Jocuri câștigate',
];

function getContorPentruSectiune(indexSectiune) {
    if (indexSectiune === 1) return contoare_jocuri.contor_assasment_incercari_shuffle;
    if (indexSectiune === 2) return contoare_jocuri.contor_assasment_corecte_shuffle;
    if (indexSectiune === 3) return contoare_jocuri.contor_assasment_incercari_truefalse;
    if (indexSectiune === 4) return contoare_jocuri.contor_assasment_corecte_truefalse;
    if (indexSectiune === 5) return contoare_jocuri.contor_assasment_incercari_password;
    if (indexSectiune === 6) return contoare_jocuri.contor_assasment_corecte_password;
    if (indexSectiune === 7) return contoare_jocuri.contor_assasment_incercari_variante;
    if (indexSectiune === 8) return contoare_jocuri.contor_assasment_corecte_variante;
    return 0;
}


function genereazaBadgeHTML() {

    const container = document.getElementById('badge-section');
    if (!container) return;

    let badguriHTML = '';

    arrTitluri.forEach(function(titlu, i) {

        let contorCurent = getContorPentruSectiune(i);
        let badgeItemsHTML = '';

        arrBadge[i].forEach(function(badge) {

            let blocat = false;

            if (badge.prag === 0) {
                if (badge.tip.includes('Shuffle')   && !vizite.shuffle)   blocat = true;
                if (badge.tip.includes('Adevarat')  && !vizite.truefalse) blocat = true;
                if (badge.tip.includes('Password')  && !vizite.password)  blocat = true;
                if (badge.tip.includes('Variante')  && !vizite.variante)  blocat = true;
            } else {
                
                if (contorCurent < badge.prag) blocat = true;
            }

            let stilImg = '';
            if (blocat) {
                stilImg = 'filter: grayscale(100%) brightness(0.35); opacity: 0.5;';
            }

            let dataBlocat = blocat ? '1' : '0';

            badgeItemsHTML += `
                <div class="flex flex-col items-center gap-1 mx-auto">
                    <img
                        src="${badge.rankImg}"
                        alt="${badge.rank}"
                        data-cerinta="${badge.cerinta}"
                        data-descriere="${badge.descriere}"
                        data-blocat="${dataBlocat}"
                        class="badge w-[40px] sm:w-[60px] md:w-[65px] lg:w-[70px] h-auto object-contain transition-all duration-300 cursor-pointer"
                        style="${stilImg}"
                    >
                </div>
            `;
        });

        badguriHTML += `
            <div class="w-[90%] h-auto mt-6 mx-auto flex flex-col items-start">
                <h2 class="text-[15px] font-semibold text-black dark:text-white mb-1">${titlu}</h2>
                <div class="w-full h-[1px] bg-black/10 dark:bg-white/10 mb-3"></div>
                <div class="w-full grid grid-cols-5 gap-4 py-2">
                    ${badgeItemsHTML}
                </div>
            </div>
        `;
    });

    container.innerHTML = badguriHTML;
}


let cardTooltip = document.createElement('div');
cardTooltip.id = 'badge-card';
cardTooltip.className = 'hidden fixed z-50 bottom-6 left-1/2 -translate-x-1/2 w-[280px] sm:w-[320px] p-4 rounded-2xl shadow-xl border backdrop-blur-md';
document.body.appendChild(cardTooltip);

function arataChard(badge) {
    let esteBlocat = badge.dataset.blocat === '1';

    if (esteBlocat) {
        cardTooltip.className = 'fixed z-50 bottom-6 left-1/2 -translate-x-1/2 w-[280px] sm:w-[320px] p-4 rounded-2xl shadow-xl border backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-red-300 dark:border-red-800';
        cardTooltip.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-9 h-9 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                    <svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                </div>
                <div>
                    <p class="text-[11px] font-semibold text-red-500 uppercase tracking-wider mb-0.5">Nerealizat</p>
                    <p class="text-[13px] text-slate-700 dark:text-slate-200 leading-snug">${badge.dataset.cerinta}</p>
                </div>
            </div>
        `;
    } else {
        cardTooltip.className = 'fixed z-50 bottom-6 left-1/2 -translate-x-1/2 w-[280px] sm:w-[320px] p-4 rounded-2xl shadow-xl border backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-green-300 dark:border-green-800';
        cardTooltip.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </div>
                <div>
                    <p class="text-[11px] font-semibold text-green-500 uppercase tracking-wider mb-0.5">Realizat</p>
                    <p class="text-[13px] text-slate-700 dark:text-slate-200 leading-snug">${badge.dataset.descriere}</p>
                </div>
            </div>
        `;
    }
}

function ascundeCard() {
    cardTooltip.className = 'hidden';
}


let container_badge = document.getElementById('badge-section');

container_badge.addEventListener('click', function(e) {
    let el = e.target;

    if (!el.classList.contains('badge')) {
        ascundeCard();
        return;
    }

    if (el.dataset.deschis === '1') {
        el.dataset.deschis = '0';
        ascundeCard();
        return;
    }
    document.querySelectorAll('.badge').forEach(function(b) {
        b.dataset.deschis = '0';
    });

    el.dataset.deschis = '1';
    arataChard(el);
});

document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('badge') && e.target.id !== 'badge-card') {
        ascundeCard();
        document.querySelectorAll('.badge').forEach(function(b) {
            b.dataset.deschis = '0';
        });
    }
});


onAuthStateChanged(auth, async function(user) {
    if (!user) return;

    await incarcaDateFirebase(user);
    await incarcaContoareFirebase(user);

    genereazaBadgeHTML();
});