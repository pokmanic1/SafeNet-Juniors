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

export const salveazaJocTrueFalse = async (joc) => {
    const user = auth.currentUser;
    if (!user) {
        console.error("Userul nu e autentificat!");
        return;
    }

    try {
        const jocuriRef = collection(db, "users", user.uid, "jocuri_true_false");
        await addDoc(jocuriRef, {
            ...joc,
            creatLa: serverTimestamp()
        });
        console.log("Jocul a fost salvat în Firestore!");
    } catch (error) {
        console.error("Eroare la salvare:", error);
    }
};

export const getToateJocurileTrueFalse = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    try {
        const jocuriRef = collection(db, "users", user.uid, "jocuri_true_false");
        const snapshot = await getDocs(jocuriRef);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Eroare la citire:", error);
        return [];
    }
};
export const stergeJocTrueFalse = async (jocId) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
        await deleteDoc(doc(db, "users", user.uid, "jocuri_true_false", jocId));
        console.log("Jocul a fost șters!");
    } catch (error) { console.error("Eroare la ștergere:", error); }
};

const container = document.getElementById("containerJocuri");

function genereazaHTML(jocuri) {
    if (jocuri.length === 0) {
        container.innerHTML = `<p class="text-white text-center">Niciun joc salvat.</p>`;
        return;
    }

    container.innerHTML = jocuri.map(joc => `
        <div class="flex flex-col md:flex-row bg-[#30302E] border-2 border-gray-600 rounded-xl overflow-hidden w-full max-w-6xl min-h-[200px] shadow-2xl mb-6">

            <div class="md:w-1/4 w-full h-48 md:h-auto">
                <img src="../../assets/img/backgrounds/adevarat-fals-game-bg1.png" 
                    alt="Game Background" class="w-full h-full object-cover">
            </div>

            <div class="flex-1 p-6 flex flex-col justify-center gap-4">

                <div class="flex items-center justify-between border-b border-gray-700 pb-3">
                    <h2 class="text-2xl font-bold text-yellow-500 uppercase tracking-wider">
                        ${joc.nume || 'Fără nume'} — ${(joc.intrebari || []).length} întrebări
                    </h2>
                    <button 
                        class="btn-sterge bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition"
                        data-id="${joc.id}">
                        Șterge joc
                    </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${(joc.intrebari || []).map((q, index) => `
                        <div class="bg-[#3a3a38] p-3 rounded-lg border-l-4 border-yellow-500 hover:bg-[#454542] transition-colors">
                            <span class="text-xs text-gray-400 uppercase font-bold">Întrebarea ${index + 1}</span>
                            <p class="text-white font-medium mt-1">${q.text}</p>
                            <span class="text-xs font-bold ${q.raspuns ? 'text-green-400' : 'text-red-400'}">
                                ${q.raspuns ? 'Adevărat' : 'Fals'}
                            </span>
                        </div>
                    `).join('')}
                </div>

            </div>
        </div>
    `).join('');

    container.addEventListener('click', async (e) => {
        const btn = e.target.closest('.btn-sterge');
        if (!btn) return;

        const jocId = btn.dataset.id;
       

        await stergeJocTrueFalse(jocId);

        btn.closest('.mb-6').remove();
    });
}

onAuthStateChanged(auth, async (user) => {
    if (!user) return;
    const jocuri = await getToateJocurileTrueFalse();
    genereazaHTML(jocuri);
});






