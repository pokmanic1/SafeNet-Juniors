console.log("badge-notificare.js încărcat");

let contor_vechi = JSON.parse(localStorage.getItem('contor_general')) || 0;

setTimeout(function() {

    let contor_nou = JSON.parse(localStorage.getItem('contor_general')) || 0;
    let badge_noi = contor_nou - contor_vechi;
    console.log("Contor vechi:", contor_vechi);
    console.log("Contor nou:", contor_nou);
    console.log("Badge noi:", badge_noi);
    if (badge_noi > 0) {
        arataNodificare(badge_noi);
    }

}, 2000);


function arataNodificare(numar) {

    let mesaj = numar === 1 ? 'un badge nou' : numar + ' badge-uri noi';

    document.body.insertAdjacentHTML('beforeend', `
        <div id="badge-notificare" class="fixed z-[100] top-6 right-6 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-yellow-400 dark:border-yellow-600 shadow-2xl max-w-xs">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-xl">🏅</div>
            <div class="flex-1 min-w-0">
                <p class="text-[11px] font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-widest mb-0.5">Badge nou!</p>
                <p class="text-[13px] font-medium text-slate-700 dark:text-slate-200 leading-snug">Ai obținut ${mesaj}!</p>
            </div>
            <button onclick="document.getElementById('badge-notificare').remove()" class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-150 ml-1">✕</button>
        </div>
    `);

    setTimeout(function() {
        let notificare = document.getElementById('badge-notificare');
        if (notificare) notificare.remove();
    }, 5000);
}