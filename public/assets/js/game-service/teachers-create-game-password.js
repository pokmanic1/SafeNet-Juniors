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

export const salveazaJocPassword = async (joc) => {
    const user = auth.currentUser;
    if (!user) {
        console.error("Userul nu e autentificat!");
        return;
    }
    try {
        const jocuriRef = collection(db, "users", user.uid, "jocuri_password");
        await addDoc(jocuriRef, {
            ...joc,
            creatLa: serverTimestamp()
        });
        console.log("Jocul a fost salvat în Firestore!");
    } catch (error) {
        console.error("Eroare la salvare:", error);
    }
};

export const getToateJocurilePassword = async () => {
    const user = auth.currentUser;
    if (!user) return [];
    try {
        const jocuriRef = collection(db, "users", user.uid, "jocuri_password");
        const snapshot = await getDocs(jocuriRef);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Eroare la citire:", error);
        return [];
    }
};

export const stergeJocPassword = async (jocId) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
        await deleteDoc(doc(db, "users", user.uid, "jocuri_password", jocId));
        console.log("Jocul a fost șters!");
    } catch (error) {
        console.error("Eroare la ștergere:", error);
    }
};

let container = document.querySelector(".containerJocuriPassword");
if (!container) {
    console.error("Containerul pentru jocuri nu a fost găsit!");
}

let listaJocuriGlobal = [];

function genereazaHTML(jocuri) {
    if (!container) {
        console.warn("Anulare generare HTML: .containerJocuriPassword nu a fost găsit în această pagină.");
        return;
    }
    if (jocuri.length === 0) {
        container.innerHTML = `<p class="text-white text-center">Niciun joc salvat.</p>`;
        return;
    }

   container.innerHTML = jocuri.map(joc => `
    <div class="flex flex-col md:flex-row bg-[#30302E] border-2 border-gray-600 rounded-xl overflow-hidden w-full max-w-[70%] min-h-[70px] shadow-2xl mb-6">
        
        <div class="imaginea hidden md:w-1/4 w-full h-48 md:h-auto">
            <img src="../../assets/img/backgrounds/password-game-bg1.png" 
                 alt="Game Background" class="w-full h-full object-cover">
        </div>

        <div class="flex-1 pt-[8px] pb-[5px] px-[6px] flex flex-col justify-center gap-4">
            
            <div class="ptborderb flex items-center justify-between pb-[2px]">
                
                <img class="sageata cursor-pointer transition-transform duration-300 block w-[30px] h-[30px] mr-[20px] my-auto" 
                    src="../../assets/img/img-assasment/Sageata_stanga.png" alt="toggle">

                <h2 class="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px] font-bold text-yellow-500 uppercase tracking-wider">
                    ${joc.nume || 'Fără nume'} — ${(joc.reguli || []).length} reguli
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
                ${(joc.reguli || []).map((r, index) => `
                    <div class="bg-[#3a3a38] p-3 rounded-lg border-l-4 border-yellow-500 hover:bg-[#454542] transition-colors">
                        <span class="text-xs text-gray-400 uppercase font-bold">Regula ${index + 1}</span>
                        <p class="text-white font-medium mt-1">${r.conditie}</p>
                        ${r.valoare ? `<span class="text-xs font-bold text-green-400"> ${r.valoare}</span>` : ''}
                    </div>
                `).join('')}
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
            ptborderb.classList.toggle('border-gray-700', esteInchis);
            ptborderb.classList.toggle('border-b', esteInchis);
            grid.classList.toggle('hidden', !esteInchis);
            btnJoaca.classList.toggle('hidden', !esteInchis);
            btnSterge.classList.toggle('hidden', !esteInchis);
            imaginea.classList.toggle('hidden', !esteInchis);

            sageata.style.transform = esteInchis ? 'rotate(-90deg)' : 'rotate(0deg)';
            return;
        }
    });
    container.addEventListener('click', async (e) => {
        const btn = e.target.closest('.btn-sterge');
        if (!btn) return;
        const jocId = btn.dataset.id;
        await stergeJocPassword(jocId);
        btn.closest('.mb-6').remove();
    });

    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-joaca');
        if (!btn) return;
        const jocId = btn.dataset.id;
        const joc = listaJocuriGlobal.find(j => j.id === jocId);
        if (joc) {
            localStorage.setItem('conditiiProfesori', JSON.stringify(joc.reguli));
            window.location.href = "../../pages/game-page/password-game-page/password-game.html";
        } else {
            console.log('Jocul nu a fost găsit.');
        }
    });

}
onAuthStateChanged(auth, async (user) => {
    if (!user) return;
    listaJocuriGlobal = await getToateJocurilePassword();
    genereazaHTML(listaJocuriGlobal);
});