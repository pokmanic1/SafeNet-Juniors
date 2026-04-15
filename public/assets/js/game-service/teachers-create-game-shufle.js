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

export const salveazaJocShufle = async (joc) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
        const jocuriRef = collection(db, "users", user.uid, "jocuri_shufle");
        await addDoc(jocuriRef, {
            ...joc,
            creatLa: serverTimestamp()
        });
    } catch (error) {
        console.error(error);
    }
};

export const getToateJocurileShufle = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    try {
        const jocuriRef = collection(db, "users", user.uid, "jocuri_shufle");
        const snapshot = await getDocs(jocuriRef);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const stergeJocShufle = async (jocId) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
        await deleteDoc(doc(db, "users", user.uid, "jocuri_shufle", jocId));
    } catch (error) {
        console.error(error);
    }
};
function grupeazaPerechi(date) {
    const map = {};

    date.forEach(item => {
        if (!map[item.id]) {
            map[item.id] = {};
        }

        if (item.type === "text") {
            map[item.id].text = item.value;
        } else {
            map[item.id].image = item.imaginea;
        }
    });

    return Object.values(map);
}
const container = document.getElementById("containerJocuri");
let listaJocuriGlobal = [];

function genereazaHTML(jocuri) {
    if (!container) return;

    if (jocuri.length === 0) {
        container.innerHTML = `<p class="text-white text-center">Niciun joc salvat.</p>`;
        return;
    }


    container.innerHTML = jocuri.map(joc => {

        const perechi = grupeazaPerechi(joc.date);

        return `
       <div class="flex flex-col md:flex-row bg-[#30302E] border-2 border-gray-600 rounded-xl overflow-hidden w-full max-w-[98%] min-h-[100px] shadow-2xl mb-6">

        <div class="imaginea hidden md:w-1/4 w-full h-48 md:h-auto">
            <img src="../../assets/img/backgrounds/shufle-game-bg2.png" 
                alt="Shuffle Game" class="w-full h-full object-cover">
        </div>

        <div class="flex-1 pt-8 pb-5 px-6 flex flex-col justify-center gap-4">
            
            <div class="ptborderb flex items-center justify-between pb-2">
                
                <img class="sageata cursor-pointer transition-transform duration-300 block w-[50px] h-[50px] mr-4" 
                    src="../../assets/img/img-assasment/Sageata_stanga.png" alt="toggle">

                <h2 class="text-2xl font-bold text-yellow-500 uppercase tracking-wider">
                    ${joc.nume || 'Fără nume'} — ${perechi.length} perechi
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
                ${perechi.map((p, index) => `
                    <div class="bg-[#3a3a38] p-3 rounded-lg border-l-4 border-yellow-500 hover:bg-[#454542] transition-colors flex items-center gap-3">
                        <div class="flex-shrink-0 w-12 h-12 bg-white rounded-md overflow-hidden p-1">
                             <img src="${p.image}" class="w-full h-full object-contain">
                        </div>
                        <div>
                            <span class="text-[10px] text-gray-400 uppercase font-bold">Perechea ${index + 1}</span>
                            <p class="text-white font-medium text-sm leading-tight">${p.text}</p>
                        </div>
                    </div>
                `).join('')}
            </div>

        </div>
    </div>
    `;
    }).join('');

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
        await stergeJocShufle(jocId);
        btn.closest('.mb-6').remove();


    });


    container.addEventListener('click', (e) => {



        const btn = e.target.closest('.btn-joaca');
        if (!btn) return;

        const jocId = btn.dataset.id;
        const joc = listaJocuriGlobal.find(j => j.id === jocId);

        if (joc) {
            localStorage.setItem("shuffleGameData", JSON.stringify(joc.date));
            window.location.href = "../../pages/game-page/shuffle-game-page/shuffle-game.html";
        }
    });
}
















onAuthStateChanged(auth, async (user) => {
    if (!user) return;

    listaJocuriGlobal = await getToateJocurileShufle();
    genereazaHTML(listaJocuriGlobal);
});