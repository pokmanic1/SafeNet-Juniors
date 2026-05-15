const QUEST_RESET_MS = 300000;

// -----------------------------------------------

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

// -----------------------------------------------

const sfert_config = [
    { sfert: 'sfert-1', pozitie: 'top-0 left-0 rounded-tl-full', culoare: 'bg-red-400' },
    { sfert: 'sfert-2', pozitie: 'top-0 right-0 rounded-tr-full', culoare: 'bg-blue-400' },
    { sfert: 'sfert-3', pozitie: 'bottom-0 left-0 rounded-bl-full', culoare: 'bg-green-400' },
    { sfert: 'sfert-4', pozitie: 'bottom-0 right-0 rounded-br-full', culoare: 'bg-yellow-400' },
];

const arrImagini = [
    '/public/assets/img/backgrounds/password-game-bg1.png',
    '/public/assets/img/backgrounds/variante-game-bg8.png',
    '/public/assets/img/backgrounds/adevarat-fals-game-bg1.png',
    '/public/assets/img/backgrounds/shufle-game-bg1.png',
];

// -----------------------------------------------
function initializare() {
    let nrRandomSet = Math.floor(Math.random() * arrSetsDeQuesturi.length);
    let nrRandomImg = Math.floor(Math.random() * arrImagini.length);

    const setActiv = arrSetsDeQuesturi[nrRandomSet].questuri;
    const IMAGINE = arrImagini[nrRandomImg];

    // -----------------------------------------------

    function esteCompletat(id) {
        return localStorage.getItem(id) === 'true';
    }

    // -----------------------------------------------

    function construiesteQuesturi() {
        let html = '';
        setActiv.forEach(function (q, i) {
            const completat = esteCompletat(q.id);
            const cfg = sfert_config[i];
            html += `
            <div class="quest-item w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                        ${completat ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                    : 'bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10'}">
                <div class="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold
                            ${completat ? cfg.culoare.replace('bg-', 'bg-') + ' text-white'
                    : 'bg-gray-300 dark:bg-white/20 text-gray-600 dark:text-gray-300'}">
                    ${completat ? '✓' : q.nr}
                </div>
                <p class="text-sm leading-snug ${completat ? 'text-green-700 dark:text-green-300 opacity-70' : 'text-black dark:text-white'}">
                    ${q.text}
                </p>
            </div>
        `;
        });
        return html;
    }

    // -----------------------------------------------

    function construiesteImaginea() {
        let sferturiHTML = '';
        setActiv.forEach(function (q, i) {
            const completat = esteCompletat(q.id);
            const cfg = sfert_config[i];
            sferturiHTML += `
            <div id="${cfg.sfert}"
                 class="absolute w-[50%] h-[50%] ${cfg.culoare} ${cfg.pozitie} transition-all duration-700
                        ${completat ? 'opacity-0 pointer-events-none' : 'opacity-100'}">
            </div>
        `;
        });

        return `
        <img src="${IMAGINE}" alt="Quest" class="absolute inset-0 w-full h-full object-cover rounded-full" onerror="this.style.opacity='0'">
        ${sferturiHTML}
    `;
    }

    // -----------------------------------------------

    function randeaza() {
        const questuriSide = document.querySelector('.questuri-side');
        if (questuriSide) questuriSide.innerHTML = construiesteQuesturi();

        const puzzleSide = document.querySelector('.pazzle-side');
        if (puzzleSide) puzzleSide.innerHTML = construiesteImaginea();
    }

    // -----------------------------------------------

    function reseteaza() {
        setActiv.forEach(function (q) { localStorage.removeItem(q.id); });
        nrRandomSet = Math.floor(Math.random() * arrSetsDeQuesturi.length);
        nrRandomImg = Math.floor(Math.random() * arrImagini.length);
        console.log('[Quest] Reset.');
        randeaza();
    }

    // -----------------------------------------------

    function pornesteCronometru() {
        setInterval(reseteaza, QUEST_RESET_MS);

        let secunde = QUEST_RESET_MS / 1000;
        let timerEl = document.getElementById('quest-timer');

        setInterval(function () {
            secunde--;
            if (secunde < 0) secunde = QUEST_RESET_MS / 1000;
            if (timerEl) {
                let min = Math.floor(secunde / 60);
                let sec = secunde % 60;
                timerEl.textContent = 'Reset in: ' + String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
            }
        }, 1000);
    }


    let interval;

    function pornesteCeas() {
        let minute = 4;
        let secunde = 59;
        const timerEl = document.getElementById('quest-timer');

        interval = setInterval(() => {

            timerEl.textContent = `${String(minute).padStart(2, '0')}:${String(secunde).padStart(2, '0')}`;

            secunde--;
            if (secunde < 0) {
                secunde = 59;
                minute--;
            }

            if (minute === 0 && secunde === 0) {
                clearInterval(interval);
                reseteaza();
                pornesteCeas();
                localStorage.setItem('nrPentruResetare', JSON.stringify(1));
            }

        }, 1000);
    }

    // -----------------------------------------------



    randeaza();
    pornesteCeas();

}
let nrPentruResetare = JSON.parse(localStorage.getItem('nrPentruResetare')) || 1;


if (nrPentruResetare == 1) {
    initializare()
    localStorage.setItem('nrPentruResetare', JSON.stringify(2));
}