
//----------------------------------------------------------------------------------------------------------------------
// Pagina Badge
//----------------------------------------------------------------------------------------------------------------------import { auth } from "../fierbase/firebase-init.js";
import { incarcaDateFirebase, vizite } from "/assets/js/assasment/vizitare_documentatie";
import { incarcaContoareFirebase, contoare_jocuri } from "/assets/js/assasment/contoarele_pentru_jocuri";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "/assets/js/fierbase/firebase-init";



let arrBadge = [
];

let contor_general = JSON.parse(localStorage.getItem('contor_general')) || 0;
//----------------------------------------------------------------------------------------------------------------------
// Arr cu date titluri 
//----------------------------------------------------------------------------------------------------------------------
let arrTitluri = [
];

fetch('/assets/js/assasment/date-assasment/badge.json')
    .then(response => response.json())
    .then(data => {
        arrBadge = data.arrBadge;
        arrTitluri = data.arrTitluri;
        
        initializare()
        })
    .catch(err => console.log(err));




function initializare() {
    //----------------------------------------------------------------------------------------------------------------------
    // functia care ia contoarele din pagina contoare_pentru_jocuri.js 
    //----------------------------------------------------------------------------------------------------------------------
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

    //----------------------------------------------------------------------------------------------------------------------
    // functia care genereaza HTML 
    //----------------------------------------------------------------------------------------------------------------------
    function genereazaBadgeHTML() {

        const container = document.getElementById('badge-section');
        if (!container) return;

        let badguriHTML = '';



        arrTitluri.forEach(function (titlu, i) {
            //----------------------------------------------------------------------------------------------------------------------
            // Se ia contorul pentru fiecare sectiunea aparte
            //----------------------------------------------------------------------------------------------------------------------

            let contorCurent = getContorPentruSectiune(i);
            let badgeItemsHTML = '';

            arrBadge[i].forEach(function (badge) {

                let blocat = false;


                //----------------------------------------------------------------------------------------------------------------------
                //Acest if e pentru documentatii si badgurile violet
                //----------------------------------------------------------------------------------------------------------------------
                if (badge.prag === 0) {
                    if (badge.tip.includes('Shuffle') && !vizite.shuffle) blocat = true;
                    if (badge.tip.includes('Adevarat') && !vizite.truefalse) blocat = true;
                    if (badge.tip.includes('Password') && !vizite.password) blocat = true;
                    if (badge.tip.includes('Variante') && !vizite.variante) blocat = true;
                } else {
                    //----------------------------------------------------------------------------------------------------------------------
                    // daca contorul luat din fierbase e mai mici de cat pragul din arr atunci la blocatii dam true 
                    // care va micsora opacitatea badgurile dand un efect de blocat
                    //----------------------------------------------------------------------------------------------------------------------

                    if (contorCurent < badge.prag) blocat = true;
                }

                let stilImg = '';
                if (blocat) {
                    stilImg = 'filter: grayscale(100%) brightness(0.35); opacity: 0.5;';
                }
                if (!blocat) {
                    contor_general++;
                    localStorage.setItem('contor_general', JSON.stringify(contor_general));

                }
                let dataBlocat = blocat ? '1' : '0';
                //----------------------------------------------------------------------------------------------------------------------
                // generam html pentru 1 badge aparte
                //----------------------------------------------------------------------------------------------------------------------

                badgeItemsHTML += `
                <div class="flex flex-col items-center  mx-auto">
                    <img
                        src="${badge.rankImg}"
                        alt="${badge.rank}"
                        data-cerinta="${badge.cerinta}"
                        data-descriere="${badge.descriere}"
                        data-blocat="${dataBlocat}"
                        class="badge w-full h-auto object-contain transition-all duration-300 cursor-pointer"
                        style="${stilImg}"
                    >
                </div>
            `;
            });
            //----------------------------------------------------------------------------------------------------------------------
            //generare htmlului a badgurilor pe rand
            //----------------------------------------------------------------------------------------------------------------------

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




    //----------------------------------------------------------------------------------------------------------------------
    //atunci cand apesi pe un badge apare element nou div 
    // care arata descrierea sau cerinta depinde daca pragul a fost atins
    //daca il apesi odata apare si daca il apesi din nou dispare
    //----------------------------------------------------------------------------------------------------------------------

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

    container_badge.addEventListener('click', function (e) {
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
        document.querySelectorAll('.badge').forEach(function (b) {
            b.dataset.deschis = '0';
        });

        el.dataset.deschis = '1';
        arataChard(el);
    });

    document.addEventListener('click', function (e) {
        if (!e.target.classList.contains('badge') && e.target.id !== 'badge-card') {
            ascundeCard();
            document.querySelectorAll('.badge').forEach(function (b) {
                b.dataset.deschis = '0';
            });
        }
    });


    onAuthStateChanged(auth, async function (user) {
        if (!user) return;

        await incarcaDateFirebase(user);
        await incarcaContoareFirebase(user);

        genereazaBadgeHTML();
    });
}