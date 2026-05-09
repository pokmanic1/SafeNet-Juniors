import { auth } from "../fierbase/firebase-init.js";
import { incarcaDateFirebase, vizite } from "./vizitare_documentatie.js";
import { incarcaContoareFirebase, contoare_jocuri } from "./contoarele_pentru_jocuri.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ── Caile catre imaginile badge ──────────────────────────────
let Bronze  = '/public/assets/img/img-assasment/badge/bronze 1.svg';
let Silver  = '/public/assets/img/img-assasment/badge/silver 1.svg';
let Gold    = '/public/assets/img/img-assasment/badge/gold 1.svg';
let Diamond = '/public/assets/img/img-assasment/badge/diamond 1.svg';
let Legend  = '/public/assets/img/img-assasment/badge/legend 1.svg';

// ── Array cu badge-urile — exact ca al tau, array de array-uri ──
let arrBadge = [
    // 0 — SHUFFLE COMPLETAT
    [
        { tip: 'Joc Shuffle', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Completează jocul Shuffle de 5 ori',     descriere: 'Ai completat jocul Shuffle de 5 ori',     prag: 5  },
        { tip: 'Joc Shuffle', rank: 'Silver',  rankImg: Silver,  cerinta: 'Completează jocul Shuffle de 10 ori',    descriere: 'Ai completat jocul Shuffle de 10 ori',    prag: 10 },
        { tip: 'Joc Shuffle', rank: 'Gold',    rankImg: Gold,    cerinta: 'Completează jocul Shuffle de 20 de ori', descriere: 'Ai completat jocul Shuffle de 20 de ori', prag: 20 },
        { tip: 'Joc Shuffle', rank: 'Diamond', rankImg: Diamond, cerinta: 'Completează jocul Shuffle de 30 de ori', descriere: 'Ai completat jocul Shuffle de 30 de ori', prag: 30 },
        { tip: 'Joc Shuffle', rank: 'Legend',  rankImg: Legend,  cerinta: 'Completează jocul Shuffle de 50 de ori', descriere: 'Ai completat jocul Shuffle de 50 de ori', prag: 50 },
    ],
    // 1 — SHUFFLE CASTIGAT
    [
        { tip: 'Joc Shuffle', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Câștigă jocul Shuffle o dată',       descriere: 'Ai câștigat jocul Shuffle o dată',       prag: 1  },
        { tip: 'Joc Shuffle', rank: 'Silver',  rankImg: Silver,  cerinta: 'Câștigă jocul Shuffle de 3 ori',     descriere: 'Ai câștigat jocul Shuffle de 3 ori',     prag: 3  },
        { tip: 'Joc Shuffle', rank: 'Gold',    rankImg: Gold,    cerinta: 'Câștigă jocul Shuffle de 7 ori',     descriere: 'Ai câștigat jocul Shuffle de 7 ori',     prag: 7  },
        { tip: 'Joc Shuffle', rank: 'Diamond', rankImg: Diamond, cerinta: 'Câștigă jocul Shuffle de 14 ori',    descriere: 'Ai câștigat jocul Shuffle de 14 ori',    prag: 14 },
        { tip: 'Joc Shuffle', rank: 'Legend',  rankImg: Legend,  cerinta: 'Câștigă jocul Shuffle de 20 de ori', descriere: 'Ai câștigat jocul Shuffle de 20 de ori', prag: 20 },
    ],
    // 2 — TRUE/FALSE COMPLETAT
    [
        { tip: 'True sau False', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Completează jocul True sau False de 5 ori',     descriere: 'Ai completat jocul True sau False de 5 ori',     prag: 5  },
        { tip: 'True sau False', rank: 'Silver',  rankImg: Silver,  cerinta: 'Completează jocul True sau False de 10 ori',    descriere: 'Ai completat jocul True sau False de 10 ori',    prag: 10 },
        { tip: 'True sau False', rank: 'Gold',    rankImg: Gold,    cerinta: 'Completează jocul True sau False de 20 de ori', descriere: 'Ai completat jocul True sau False de 20 de ori', prag: 20 },
        { tip: 'True sau False', rank: 'Diamond', rankImg: Diamond, cerinta: 'Completează jocul True sau False de 30 de ori', descriere: 'Ai completat jocul True sau False de 30 de ori', prag: 30 },
        { tip: 'True sau False', rank: 'Legend',  rankImg: Legend,  cerinta: 'Completează jocul True sau False de 50 de ori', descriere: 'Ai completat jocul True sau False de 50 de ori', prag: 50 },
    ],
    // 3 — TRUE/FALSE CASTIGAT
    [
        { tip: 'True sau False', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Câștigă jocul True sau False o dată',       descriere: 'Ai câștigat jocul True sau False o dată',       prag: 1  },
        { tip: 'True sau False', rank: 'Silver',  rankImg: Silver,  cerinta: 'Câștigă jocul True sau False de 3 ori',     descriere: 'Ai câștigat jocul True sau False de 3 ori',     prag: 3  },
        { tip: 'True sau False', rank: 'Gold',    rankImg: Gold,    cerinta: 'Câștigă jocul True sau False de 7 ori',     descriere: 'Ai câștigat jocul True sau False de 7 ori',     prag: 7  },
        { tip: 'True sau False', rank: 'Diamond', rankImg: Diamond, cerinta: 'Câștigă jocul True sau False de 14 ori',    descriere: 'Ai câștigat jocul True sau False de 14 ori',    prag: 14 },
        { tip: 'True sau False', rank: 'Legend',  rankImg: Legend,  cerinta: 'Câștigă jocul True sau False de 20 de ori', descriere: 'Ai câștigat jocul True sau False de 20 de ori', prag: 20 },
    ],
    // 4 — PASSWORD COMPLETAT
    [
        { tip: 'Password', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Completează jocul Password de 5 ori',     descriere: 'Ai completat jocul Password de 5 ori',     prag: 5  },
        { tip: 'Password', rank: 'Silver',  rankImg: Silver,  cerinta: 'Completează jocul Password de 10 ori',    descriere: 'Ai completat jocul Password de 10 ori',    prag: 10 },
        { tip: 'Password', rank: 'Gold',    rankImg: Gold,    cerinta: 'Completează jocul Password de 20 de ori', descriere: 'Ai completat jocul Password de 20 de ori', prag: 20 },
        { tip: 'Password', rank: 'Diamond', rankImg: Diamond, cerinta: 'Completează jocul Password de 30 de ori', descriere: 'Ai completat jocul Password de 30 de ori', prag: 30 },
        { tip: 'Password', rank: 'Legend',  rankImg: Legend,  cerinta: 'Completează jocul Password de 50 de ori', descriere: 'Ai completat jocul Password de 50 de ori', prag: 50 },
    ],
    // 5 — PASSWORD CASTIGAT
    [
        { tip: 'Password', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Câștigă jocul Password o dată',       descriere: 'Ai câștigat jocul Password o dată',       prag: 1  },
        { tip: 'Password', rank: 'Silver',  rankImg: Silver,  cerinta: 'Câștigă jocul Password de 3 ori',     descriere: 'Ai câștigat jocul Password de 3 ori',     prag: 3  },
        { tip: 'Password', rank: 'Gold',    rankImg: Gold,    cerinta: 'Câștigă jocul Password de 7 ori',     descriere: 'Ai câștigat jocul Password de 7 ori',     prag: 7  },
        { tip: 'Password', rank: 'Diamond', rankImg: Diamond, cerinta: 'Câștigă jocul Password de 14 ori',    descriere: 'Ai câștigat jocul Password de 14 ori',    prag: 14 },
        { tip: 'Password', rank: 'Legend',  rankImg: Legend,  cerinta: 'Câștigă jocul Password de 20 de ori', descriere: 'Ai câștigat jocul Password de 20 de ori', prag: 20 },
    ],
    // 6 — VARIANTE COMPLETAT
    [
        { tip: 'Variante', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Completează jocul Variante de 5 ori',     descriere: 'Ai completat jocul Variante de 5 ori',     prag: 5  },
        { tip: 'Variante', rank: 'Silver',  rankImg: Silver,  cerinta: 'Completează jocul Variante de 10 ori',    descriere: 'Ai completat jocul Variante de 10 ori',    prag: 10 },
        { tip: 'Variante', rank: 'Gold',    rankImg: Gold,    cerinta: 'Completează jocul Variante de 20 de ori', descriere: 'Ai completat jocul Variante de 20 de ori', prag: 20 },
        { tip: 'Variante', rank: 'Diamond', rankImg: Diamond, cerinta: 'Completează jocul Variante de 30 de ori', descriere: 'Ai completat jocul Variante de 30 de ori', prag: 30 },
        { tip: 'Variante', rank: 'Legend',  rankImg: Legend,  cerinta: 'Completează jocul Variante de 50 de ori', descriere: 'Ai completat jocul Variante de 50 de ori', prag: 50 },
    ],
    // 7 — VARIANTE CASTIGAT
    [
        { tip: 'Variante', rank: 'Bronze',  rankImg: Bronze,  cerinta: 'Câștigă jocul Variante o dată',       descriere: 'Ai câștigat jocul Variante o dată',       prag: 1  },
        { tip: 'Variante', rank: 'Silver',  rankImg: Silver,  cerinta: 'Câștigă jocul Variante de 3 ori',     descriere: 'Ai câștigat jocul Variante de 3 ori',     prag: 3  },
        { tip: 'Variante', rank: 'Gold',    rankImg: Gold,    cerinta: 'Câștigă jocul Variante de 7 ori',     descriere: 'Ai câștigat jocul Variante de 7 ori',     prag: 7  },
        { tip: 'Variante', rank: 'Diamond', rankImg: Diamond, cerinta: 'Câștigă jocul Variante de 14 ori',    descriere: 'Ai câștigat jocul Variante de 14 ori',    prag: 14 },
        { tip: 'Variante', rank: 'Legend',  rankImg: Legend,  cerinta: 'Câștigă jocul Variante de 20 de ori', descriere: 'Ai câștigat jocul Variante de 20 de ori', prag: 20 },
    ],
];

// ── Titlurile sectiunilor — ordinea corespunde cu indexul din arrBadge ──
let arrTitluri = [
    'Joc Shuffle — Jocuri completate',
    'Joc Shuffle — Jocuri câștigate',
    'True sau False — Jocuri completate',
    'True sau False — Jocuri câștigate',
    'Password — Jocuri completate',
    'Password — Jocuri câștigate',
    'Variante — Jocuri completate',
    'Variante — Jocuri câștigate',
];

// ── Contorul corespunzator fiecarei sectiuni ──────────────────
// index 0 → shuffle incercari, index 1 → shuffle corecte, etc.
function getContorPentruSectiune(indexSectiune) {
    if (indexSectiune === 0) return contoare_jocuri.contor_assasment_incercari_shuffle;
    if (indexSectiune === 1) return contoare_jocuri.contor_assasment_corecte_shuffle;
    if (indexSectiune === 2) return contoare_jocuri.contor_assasment_incercari_truefalse;
    if (indexSectiune === 3) return contoare_jocuri.contor_assasment_corecte_truefalse;
    if (indexSectiune === 4) return contoare_jocuri.contor_assasment_incercari_password;
    if (indexSectiune === 5) return contoare_jocuri.contor_assasment_corecte_password;
    if (indexSectiune === 6) return contoare_jocuri.contor_assasment_incercari_variante;
    if (indexSectiune === 7) return contoare_jocuri.contor_assasment_corecte_variante;
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

            let stilImg = '';
            if (contorCurent < badge.prag) {
                stilImg = 'filter: grayscale(100%) brightness(0.35); opacity: 0.5;';
            }

            badgeItemsHTML += `
                <div class="flex flex-col items-center gap-1 mx-auto" title="${badge.cerinta}">
                    <img
                        src="${badge.rankImg}"
                        alt="${badge.rank}"
                        class="w-[60px] sm:w-[70px] md:w-[80px] lg:w-[90px] h-auto object-contain transition-all duration-300"
                        style="${stilImg}"
                    >
                    
                </div>
            `;
        });

        badguriHTML += `
            <div class="w-[90%] h-auto mt-6 mx-auto flex flex-col items-start">
                <h2 class="text-[15px] font-semibold text-black dark:text-white mb-1">${titlu}</h2>
                <div class="w-full h-[1px] bg-black/10 dark:bg-white/10 mb-3"></div>
                <div class="w-full grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-4 py-2">
                    ${badgeItemsHTML}
                </div>
            </div>
        `;
    });

    container.innerHTML = badguriHTML;
}


onAuthStateChanged(auth, async function(user) {
    if (!user) return;

    await incarcaDateFirebase(user);
    await incarcaContoareFirebase(user);

    genereazaBadgeHTML();
});