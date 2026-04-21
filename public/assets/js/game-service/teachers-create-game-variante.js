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
        container.innerHTML = `<p class="text-white text-center">Niciun joc salvat.</p>`;
        return;
    }

    container.innerHTML = jocuri.map(joc => `
        <div class="flex flex-col md:flex-row bg-[#30302E] border-2 border-gray-600 rounded-xl overflow-hidden w-full max-w-[70%] min-h-[70px] shadow-2xl mb-6">

            <div class="imaginea hidden md:w-1/4 w-full h-48 md:h-auto">
                <img src="../../assets/img/backgrounds/variante-game-bg1.png" 
                    alt="Game Background" class="w-full h-full object-cover">
            </div>

            <div class="flex-1  pt-[8px] pb-[5px] px-[6px] flex flex-col justify-center gap-4">

                <div class="ptborderb flex items-center justify-between pb-[2px]">

                    <img class="sageata cursor-pointer transition-transform duration-300 block  w-[30px] h-[30px] mr-[20px] my-auto" 
                        src="../../assets/img/img-assasment/Sageata_stanga.png" alt="toggle">

                    <h2 class="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]  font-bold text-yellow-500 uppercase tracking-wider">
                        ${joc.nume || 'Fără nume'} — ${(joc.intrebari || []).length} întrebări
                    </h2>

                    <div class="flex gap-2">
                        <button data-id="${joc.id}"
                            class="btn-joaca hidden bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all">
                            Joacă acum
                        </button>
                        <button class="btn-sterge hidden bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition"
                            data-id="${joc.id}">
                            Șterge joc
                        </button>
                    </div>
                </div>

                <div class="gridul-intrebari hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${(joc.intrebari || []).map((q, index) => {
                        const raspunsCorect = (q.variante || []).find(v => v.raspuns === true);
                        return `
                        <div class="bg-[#3a3a38] p-3 rounded-lg border-l-4 border-yellow-500 hover:bg-[#454542] transition-colors">
                            <span class="text-xs text-gray-400 uppercase font-bold">Întrebarea ${index + 1}</span>
                            <p class="text-white font-medium mt-1">${q.intrebare}</p>
                            <span class="text-xs font-bold text-green-400">
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