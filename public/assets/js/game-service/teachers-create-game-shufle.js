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
        <div class="flex flex-col md:flex-row bg-[#30302E] border-2 border-gray-600 rounded-xl overflow-hidden w-full max-w-6xl min-h-[200px] shadow-2xl mb-6">

            <div class="md:w-1/4 w-full h-48 md:h-auto">
                <img src="../../assets/img/backgrounds/shuffle-game-bg.png" 
                    class="w-full h-full object-cover">
            </div>

            <div class="flex-1 p-6 flex flex-col justify-center gap-4">

                <div class="flex items-center justify-between border-b border-gray-700 pb-3">
                    <h2 class="text-2xl font-bold text-yellow-400 uppercase tracking-wider">
                        ${joc.nume || 'Fără nume'} — ${(joc.date || []).length / 2} perechi
                    </h2>

                    <div class="flex gap-2">
                        <button data-id="${joc.id}"
                            class="btn-joaca bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-700">
                            Joacă acum
                        </button>

                        <button data-id="${joc.id}"
                            class="btn-sterge bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-700">
                            Șterge joc
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${perechi.slice(0, 8).map(p => `
                        <div class="bg-[#3a3a38] p-4 rounded-lg border-l-4 border-yellow-500 flex items-center gap-4 hover:bg-[#454542] transition">

                            <img src="${p.image}" class="w-16 h-16 object-contain rounded-lg bg-white p-1">

                            <p class="text-white font-medium text-lg">
                                ${p.text}
                            </p>

                        </div>
                    `).join('')}
                </div>

            </div>
        </div>
    `;
}).join('');


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

// LOAD
onAuthStateChanged(auth, async (user) => {
    if (!user) return;

    listaJocuriGlobal = await getToateJocurileShufle();
    genereazaHTML(listaJocuriGlobal);
});