//----------------------------------------------------------------------------------------------------------------------
//Pagina questuri
//----------------------------------------------------------------------------------------------------------------------
 

//----------------------------------------------------------------------------------------------------------------------
//Timpul dupa care se reseteaza questurile
//----------------------------------------------------------------------------------------------------------------------
const QUEST_RESET_MS = 50000;




//----------------------------------------------------------------------------------------------------------------------
//Arr cu cerinte
//---------------------------------------------------------------------------------------------------------------------

const arrSetsDeQuesturi = [
    {
        questuri: [
            { id: 'quest_truefalse_7', nr: 1, text: 'Câștigă Adevărat sau Fals cu cel puțin 7 răspunsuri corecte' },
            { id: 'quest_variante_8', nr: 2, text: 'Câștigă Răspunde Corect cu cel puțin 8 puncte' },
            { id: 'quest_shuffle_90', nr: 3, text: 'Completează Potrivește Perechile în sub 90 de secunde' },
            { id: 'quest_password_60', nr: 4, text: 'Completează Creează Parola în sub 60 de secunde' },
        ]
    },
    {
        questuri: [
            { id: 'quest_truefalse_7', nr: 1, text: 'Răspunde corect la 7 întrebări în jocul Adevărat sau Fals' },
            { id: 'quest_variante_8', nr: 2, text: 'Obține 8 puncte la jocul cu variante de răspuns' },
            { id: 'quest_shuffle_90', nr: 3, text: 'Găsește toate perechile în mai puțin de 1 minut și 30 secunde' },
            { id: 'quest_password_60', nr: 4, text: 'Creează o parolă corectă în mai puțin de un minut' },
        ]
    },
    {
        questuri: [
            { id: 'quest_truefalse_7', nr: 1, text: 'Fii atent! Câștigă True/False cu 7 sau mai multe corecte' },
            { id: 'quest_variante_8', nr: 2, text: 'Demonstrează că știi! 8 puncte la jocul Variante' },
            { id: 'quest_shuffle_90', nr: 3, text: 'Memorie rapidă — termină Shuffle în sub 90 secunde' },
            { id: 'quest_password_60', nr: 4, text: 'Viteză și precizie — parola corectă în sub 60 secunde' },
        ]
    }
];


//----------------------------------------------------------------------------------------------------------------------
//Arr cu cele 4 sferturi de cerc
//---------------------------------------------------------------------------------------------------------------------
const sfert_config = [
    { sfert: 'sfert-1', pozitie: 'top-0 left-0 rounded-tl-full', culoare: 'bg-[#1156ea]' },
    { sfert: 'sfert-2', pozitie: 'top-0 right-0 rounded-tr-full', culoare: 'bg-[#1156ea]' },
    { sfert: 'sfert-3', pozitie: 'bottom-0 left-0 rounded-bl-full', culoare: 'bg-[#1156ea]' },
    { sfert: 'sfert-4', pozitie: 'bottom-0 right-0 rounded-br-full', culoare: 'bg-[#1156ea]' },
];


//----------------------------------------------------------------------------------------------------------------------
//Arr cu imaginile ce pot aparea dupa ce completez questurile
//---------------------------------------------------------------------------------------------------------------------
const arrImagini = [
    '/public/assets/img/backgrounds/password-game-bg1.png',
    '/public/assets/img/backgrounds/variante-game-bg8.png',
    '/public/assets/img/backgrounds/adevarat-fals-game-bg1.png',
    '/public/assets/img/backgrounds/shufle-game-bg1.png',
];

if (!localStorage.getItem('quest_reset_at')) {
    localStorage.setItem('quest_reset_at', Date.now().toString());
    localStorage.setItem('quest_set_idx', Math.floor(Math.random() * arrSetsDeQuesturi.length).toString());
    localStorage.setItem('quest_img_idx', Math.floor(Math.random() * arrImagini.length).toString());
}

let setActiv = arrSetsDeQuesturi[parseInt(localStorage.getItem('quest_set_idx'))].questuri;
let IMAGINE = arrImagini[parseInt(localStorage.getItem('quest_img_idx'))];
let interval = null;



//----------------------------------------------------------------------------------------------------------------------
//Generarea HTML
//---------------------------------------------------------------------------------------------------------------------
function randeaza() {
    let htmlQuesturi = '';
    setActiv.forEach(function (q, i) {
        const completat = localStorage.getItem(q.id) === 'true';
        const cfg = sfert_config[i];
        htmlQuesturi += `
            <div class="quest-item w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                        ${completat ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                                    : 'bg-gray-100 dark:bg-white/5 border-3 border-blue-600 '}">
                <div class="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold
                            ${completat ? cfg.culoare + ' text-white'
                                        : 'bg-gray-300 dark:bg-white/20 text-gray-600 dark:text-gray-300'}">
                            ${completat ? '✓' : q.nr}
                </div>
                <p class="text-sm leading-snug ${completat ? 'text-green-700 dark:text-green-300 opacity-70'
                                                            : 'text-black dark:text-white'}">
                    ${q.text}
                </p>
            </div>
        `;
    });

    let sferturiHTML = '';
    setActiv.forEach(function (q, i) {
        const completat = localStorage.getItem(q.id) === 'true';
        const cfg = sfert_config[i];
        sferturiHTML += `
            <div id="${cfg.sfert}"
                 class="absolute w-[50%] h-[50%] ${cfg.culoare} ${cfg.pozitie} transition-all duration-700
                        ${completat ? 'opacity-0 pointer-events-none' : 'opacity-100'}">
            </div>
        `;
    });

    document.querySelector('.questuri-side').innerHTML = htmlQuesturi;
    document.querySelector('.pazzle-side').innerHTML = `
        <img src="${IMAGINE}" alt="Quest"
             class="absolute inset-0 w-full h-full object-cover rounded-full"
             onerror="this.style.opacity='0'">
        ${sferturiHTML}
    `;
}



//----------------------------------------------------------------------------------------------------------------------
//Cronometrul
//---------------------------------------------------------------------------------------------------------------------
function pornesteCeas() {
    if (interval) clearInterval(interval);

    const timerEl = document.getElementById('quest-timer');

    interval = setInterval(function () {
        const ramas = QUEST_RESET_MS - (Date.now() - parseInt(localStorage.getItem('quest_reset_at')));
        const minute = Math.floor(ramas / 60000);
        const secunde = Math.floor((ramas % 60000) / 1000);

        timerEl.textContent = 'Reset in: ' + String(minute).padStart(2, '0') + ':' + String(secunde).padStart(2, '0');

        if (ramas <= 0) {
            clearInterval(interval);

            setActiv.forEach(function (q) { localStorage.removeItem(q.id); });
            localStorage.removeItem('quest_reset_at');
            localStorage.removeItem('quest_set_idx');
            localStorage.removeItem('quest_img_idx');
            localStorage.setItem('quest_reset_at', Date.now().toString());
            localStorage.setItem('quest_set_idx', Math.floor(Math.random() * arrSetsDeQuesturi.length).toString());
            localStorage.setItem('quest_img_idx', Math.floor(Math.random() * arrImagini.length).toString());

            setActiv = arrSetsDeQuesturi[parseInt(localStorage.getItem('quest_set_idx'))].questuri;
            IMAGINE = arrImagini[parseInt(localStorage.getItem('quest_img_idx'))];

            randeaza();
            pornesteCeas();
        }
    }, 1000);
}


//----------------------------------------------------------------------------------------------------------------------
//verifica daca timpul sa terminat
//---------------------------------------------------------------------------------------------------------------------
if (QUEST_RESET_MS - (Date.now() - parseInt(localStorage.getItem('quest_reset_at'))) <= 0) {
    setActiv.forEach(function (q) { localStorage.removeItem(q.id); });

    localStorage.setItem('quest_reset_at', Date.now().toString());
    localStorage.setItem('quest_set_idx', Math.floor(Math.random() * arrSetsDeQuesturi.length).toString());
    localStorage.setItem('quest_img_idx', Math.floor(Math.random() * arrImagini.length).toString());

    setActiv = arrSetsDeQuesturi[parseInt(localStorage.getItem('quest_set_idx'))].questuri;
    IMAGINE = arrImagini[parseInt(localStorage.getItem('quest_img_idx'))];
}

randeaza();
pornesteCeas();