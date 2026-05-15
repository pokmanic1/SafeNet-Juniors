import { db, auth } from "../fierbase/firebase-init.js";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "../../../index.html";
    }
});

export const salveazaJocVariante = async (joc) => {
    const user = auth.currentUser;
    if (!user) {
        console.error("Userul nu e autentificat!");
        return;
    }
    try {
        const jocuriRef = collection(db, "users", user.uid, "jocuri_variante");
        await addDoc(jocuriRef, {
            ...joc,
            creatLa: serverTimestamp()
        });
        console.log("Jocul a fost salvat în Firestore!");
    } catch (error) {
        console.error("Eroare la salvare:", error);
    }
};

export const getToateJocurileVariante = async () => {
    const user = auth.currentUser;
    if (!user) return [];
    try {
        const jocuriRef = collection(db, "users", user.uid, "jocuri_variante");
        const snapshot = await getDocs(jocuriRef);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Eroare la citire:", error);
        return [];
    }
};

export const stergeJocVariante = async (jocId) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
        await deleteDoc(doc(db, "users", user.uid, "jocuri_variante", jocId));
        console.log("Jocul a fost șters!");
    } catch (error) {
        console.error("Eroare la ștergere:", error);
    }
};

const container = document.getElementById("containerJocuriVariante");

if (!container) {
    console.warn("containerJocuriVariante nu există pe această pagină");

}


let listaJocuriGlobal = [];

function genereazaHTML(jocuri) {
    if (jocuri.length === 0) {
        container.innerHTML = `
            <div class="bg-[#1a1a18] dark:bg-[#1e2035] border border-white/10 rounded-[24px] p-8 gap-[20px] flex flex-col items-center gap-5 w-full max-w-[400px] text-center relative overflow-hidden">
                <div class="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>
                <p class="text-gray-400 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] text-sm uppercase tracking-widest font-semibold">Niciun joc salvat</p>
                <h3 class="text-white   text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-extrabold text-xl leading-snug">Nu ai creat niciun<br>joc de tip Variante</h3>
                <a
                    href="/public/pages/game-page/variante-game-page/teachers-variante-game.html"
                    class="w-full py-2 md:py-3   text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm tracking-wide transition active:scale-[0.98] shadow-lg shadow-blue-900/30">
                    Creeaza un joc
                </a>
            </div>
        `;
        return;
    }
   container.innerHTML = jocuri.map(joc => `
    <div class="flex flex-col md:flex-row bg-[#30302E] border-2 border-gray-600 rounded-xl overflow-hidden w-full max-w-[70%] min-h-[70px] shadow-2xl mb-6">

        <div class="imaginea hidden md:w-1/4 w-full h-24 md:h-auto">
            <img src="../../assets/img/backgrounds/variante-game-bg1.png" 
                alt="Game Background" class="w-full h-full object-cover">
        </div>

        <div class="flex-1 pt-[8px] pb-[5px] px-[6px] flex flex-col justify-center gap-4">

            <div class="ptborderb flex items-center justify-between gap-2 pb-[2px]">

                <img class="sageata sageata_stanga cursor-pointer transition-transform duration-300 block w-[22px] h-[22px] md:w-[30px] md:h-[30px] my-auto flex-shrink-0" 
                    src="../../assets/img/img-assasment/Sageata_stanga.png" alt="toggle">

                <h2 class="flex-1 min-w-0 text-[12px] sm:text-[15px] lg:text-[18px] font-bold text-yellow-500 uppercase tracking-wider truncate">
                    ${joc.nume || 'Fără nume'} — ${(joc.intrebari || []).length} întrebări
                </h2>

                <div class="flex flex-col sm:flex-row gap-1 sm:gap-2 flex-shrink-0">
                    <button data-id="${joc.id}"
                        class="btn-joaca hidden bg-blue-600 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg font-bold text-[10px] sm:text-sm hover:bg-blue-700 transition-all whitespace-nowrap">
                        Joacă
                    </button>
                    <button class="btn-sterge hidden bg-red-600 hover:bg-red-700 text-white text-[10px] sm:text-sm font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg transition whitespace-nowrap"
                        data-id="${joc.id}">
                        Șterge
                    </button>
                </div>
            </div>

            <div class="gridul-intrebari hidden grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                ${(joc.intrebari || []).map((q, index) => {
                    const raspunsCorect = (q.variante || []).find(v => v.raspuns === true);
                    return `
                    <div class="bg-[#3a3a38] p-2 sm:p-3 rounded-lg border-l-4 border-yellow-500 hover:bg-[#454542] transition-colors">
                        <span class="text-[9px] sm:text-xs text-gray-400 uppercase font-bold">Întrebarea ${index + 1}</span>
                        <p class="text-white font-medium mt-1 text-[11px] sm:text-[13px] leading-snug">${q.intrebare}</p>
                        <span class="text-[10px] sm:text-xs font-bold text-green-400">
                            ${raspunsCorect ? raspunsCorect.varianta : 'N/A'}
                        </span>
                    </div>`;
                }).join('')}
            </div>

        </div>
    </div>
`).join('');

    container.addEventListener('click', (e) => {

        const sageata = e.target.closest('.sageata');
        if (sageata) {
            const card = sageata.closest('.mb-6');
            const grid = card.querySelector('.gridul-intrebari');
            const btnJoaca = card.querySelector('.btn-joaca');
            const btnSterge = card.querySelector('.btn-sterge');
            const imaginea = card.querySelector('.imaginea');
            const ptborderb = card.querySelector('.ptborderb');

            const esteInchis = grid.classList.contains('hidden');

            ptborderb.classList.toggle('border-b', esteInchis);
            ptborderb.classList.toggle('border-gray-700', esteInchis);
            grid.classList.toggle('hidden', !esteInchis);
            btnJoaca.classList.toggle('hidden', !esteInchis);
            btnSterge.classList.toggle('hidden', !esteInchis);
            imaginea.classList.toggle('hidden', !esteInchis);

            sageata.style.transform = esteInchis ? 'rotate(-90deg)' : 'rotate(0deg)';
            return;
        }

        const btnSterge = e.target.closest('.btn-sterge');
        if (btnSterge) {
            const jocId = btnSterge.dataset.id;
            stergeJocVariante(jocId);
            btnSterge.closest('.mb-6').remove();
            return;
        }

        const btnJoaca = e.target.closest('.btn-joaca');
        if (btnJoaca) {
            const jocId = btnJoaca.dataset.id;
            const joc = listaJocuriGlobal.find(j => j.id === jocId);
            if (joc) {
                localStorage.setItem('jocVarianteCustom', JSON.stringify(joc.intrebari));
                window.location.href = "../../pages/game-page/variante-game-page/variante-game.html";
            }
            return;
        }
    });
}
onAuthStateChanged(auth, async (user) => {
    if (!user) return;
    listaJocuriGlobal = await getToateJocurileVariante();
    genereazaHTML(listaJocuriGlobal);
});