

import { db, auth } from "../fierbase/firebase-init.js";
import {
    collection,
    addDoc,
    setDoc,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

//statistici 
let claseActive = 0;
let eleviInscrisi = 0;
let jocuriPublicate = 0;

function genereazaCod(numeClasa) {
    const prefix = numeClasa.replace(/\s+/g, "").slice(0, 3).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `${prefix}-${rand}`;
}

// ─── CRUD Clase ───────────────────────────────────────────────

export const adaugaClasa = async (numeClasa) => {
    const user = auth.currentUser;
    if (!user) return null;
    try {
        const cod = genereazaCod(numeClasa);
        const claseRef = collection(db, "users", user.uid, "clase");
        const docRef = await addDoc(claseRef, {
            nume: numeClasa, cod,
            elevi: [], jocuri: [],
            creatLa: serverTimestamp()
        });
        await setDoc(doc(db, "clase_globale", docRef.id), {
            cod, nume: numeClasa,
            teacherUid: user.uid,
            clasaId: docRef.id,
            jocuri: []
        });
        return docRef.id;
    } catch (err) {
        console.error("Eroare adaugare clasa:", err);
        return null;
    }
};

export const getToateClasele = async () => {
    const user = auth.currentUser;
    if (!user) return [];
    try {
        const snap = await getDocs(collection(db, "users", user.uid, "clase"));
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
        console.error("Eroare citire clase:", err);
        return [];
    }
    console.log("Clasele au fost citite cu succes.");
};

export const stergeClasa = async (clasaId) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
        await deleteDoc(doc(db, "users", user.uid, "clase", clasaId));
        await deleteDoc(doc(db, "clase_globale", clasaId));
    } catch (err) {
        console.error("Eroare stergere clasa:", err);
    }
};

export const eliminaElevDinClasa = async (clasaId, elevUid) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
        const clasaRef = doc(db, "users", user.uid, "clase", clasaId);
        const snap = await getDoc(clasaRef);
        if (!snap.exists()) return;

        const eleviFiltrati = (snap.data().elevi || []).filter(e => e.uid !== elevUid);
        await updateDoc(clasaRef, { elevi: eleviFiltrati });

        try {
            await deleteDoc(doc(db, "users", elevUid, "clase_elev", clasaId));
        } catch (_) { }

    } catch (err) {
        console.error("Eroare eliminare elev:", err);
    }
};

export const adaugaElevInClasa = async (teacherUid, clasaId, elevData) => {
    try {
        await updateDoc(doc(db, "users", teacherUid, "clase", clasaId), {
            elevi: arrayUnion(elevData)
        });
    } catch (err) {
        console.error("Eroare adaugare elev:", err);
    }
};

const TIP_COLECTIE = {
    "1": "jocuri_shufle", "2": "jocuri_true_false",
    "3": "jocuri_password", "4": "jocuri_variante"
};
const TIP_NUME = {
    "1": "Cartonase", "2": "Adevarat-Fals",
    "3": "Parola", "4": "Variante"
};

const getJocuriDeTip = async (tip) => {
    const user = auth.currentUser;
    if (!user) return [];
    const colectie = TIP_COLECTIE[tip];
    if (!colectie) return [];
    try {
        const snap = await getDocs(collection(db, "users", user.uid, colectie));
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) { return []; }
};

const adaugaJocInClasa = async (clasaId, jocData) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
        await updateDoc(doc(db, "users", user.uid, "clase", clasaId), {
            jocuri: arrayUnion(jocData)
        });
        await updateDoc(doc(db, "clase_globale", clasaId), {
            jocuri: arrayUnion(jocData)
        });
    } catch (err) { console.error("Eroare adaugare joc:", err); }
};

const eliminaJocDinClasa = async (clasaId, jocData) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
        const clasaRef = doc(db, "users", user.uid, "clase", clasaId);
        const snap = await getDoc(clasaRef);
        if (!snap.exists()) return;
        const jocuriFiltrate = (snap.data().jocuri || []).filter(j => j.jocId !== jocData.jocId);
        await updateDoc(clasaRef, { jocuri: jocuriFiltrate });
        await updateDoc(doc(db, "clase_globale", clasaId), { jocuri: jocuriFiltrate });
    } catch (err) { console.error("Eroare eliminare joc:", err); }
};

function deschideModalJocuri(clasaId, tip, onJocAles) {
    document.querySelector("#modal-selectare-joc")?.remove();

    const modal = document.createElement("div");
    modal.id = "modal-selectare-joc";
    modal.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm";
    modal.innerHTML = `
        <div class="bg-[#1e1e1c] border border-gray-600 rounded-2xl w-[90%] max-w-[520px] p-6 flex flex-col gap-4 shadow-2xl">
            <div class="flex justify-between items-center">
                <h2 class="text-white font-bold text-[18px]">Alege jocul — <span class="text-blue-400">${TIP_NUME[tip]}</span></h2>
                <button id="modal-inchide" class="text-gray-400 hover:text-white text-[22px] leading-none transition">✕</button>
            </div>
            <div id="modal-lista-jocuri" class="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1">
                <p class="text-gray-400 text-[13px] text-center py-4">Se incarca jocurile...</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector("#modal-inchide").addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.remove(); });

    getJocuriDeTip(tip).then(jocuri => {
        const lista = modal.querySelector("#modal-lista-jocuri");
        if (!jocuri.length) {
            lista.innerHTML = `<p class="text-gray-400 text-[13px] text-center py-4">Nu ai niciun joc de acest tip.</p>`;
            return;
        }
        lista.innerHTML = jocuri.map(joc => `
            <div class="flex items-center justify-between bg-[#2e2e2c] border border-gray-700 rounded-xl px-4 py-3 hover:border-blue-500 transition">
                <div class="flex flex-col">
                    <span class="text-white font-semibold text-[14px]">${joc.nume || "Joc fara nume"}</span>
                    <span class="text-gray-400 text-[11px] mt-0.5">${TIP_NUME[tip]}</span>
                </div>
                <button class="btn-alege-joc bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold px-4 py-1.5 rounded-full transition active:scale-95"
                    data-joc-id="${joc.id}"
                    data-joc-nume="${joc.nume || "Fara nume"}"
                    data-tip="${tip}">
                    Adaugă
                </button>
            </div>
        `).join("");

        lista.addEventListener("click", async (e) => {
            const btn = e.target.closest(".btn-alege-joc");
            if (!btn) return;
            btn.disabled = true;
            btn.textContent = "Se adaugă...";
            const jocData = {
                jocId: btn.dataset.jocId,
                nume: btn.dataset.jocNume,
                tip: parseInt(btn.dataset.tip),
                tipNume: TIP_NUME[btn.dataset.tip],
                colectie: TIP_COLECTIE[btn.dataset.tip],
                teacherUid: auth.currentUser.uid
            };
            await adaugaJocInClasa(clasaId, jocData);
            onJocAles(jocData);
            modal.remove();
        });
    });
}

let listaClaseGlobal = [];

export function genereazaHTMLClase(clase, container) {
    listaClaseGlobal = clase;
    const cardAdauga = document.querySelector("#card-adauga-clasa");
    container.innerHTML = "";

    clase.forEach(clasa => {
        const jocuri = clasa.jocuri || [];
        const card = document.createElement("div");
        card.dataset.id = clasa.id;
        card.className = "clasa-card border border-black bg-[#30302E] rounded-2xl py-[29px] xl:px-[20px] px-[10px] flex flex-col gap-[8px] cursor-pointer transition-transform hover:scale-[1.02]";
        card.innerHTML = `
            <div class="flex justify-between items-center">
                <h2 class="text-white font-bold text-[18px]">${clasa.nume}</h2>
                <span class="elevi-counter bg-white text-black text-[12px] font-medium px-[12px] py-[4px] rounded-full">
                    ${(clasa.elevi || []).length} elevi
                </span>
            </div>
            <p class="text-[#888] text-[13px]">Codul: <span class="font-mono font-bold text-white">${clasa.cod}</span></p>

            <div class="elevi-lista hidden mt-2 flex flex-col gap-1"></div>

            ${jocuri.length > 0 ? `
            <div class="jocuri-lista mt-1 flex flex-col gap-1">
                ${jocuri.map(j => `
                    <div class="flex items-center justify-between bg-[#252523] rounded-lg px-3 py-1.5">
                        <div class="flex items-center gap-2">
                            <span class="text-[10px] bg-blue-700 text-white px-2 py-0.5 rounded-full">${j.tipNume}</span>
                            <span class="text-white text-[12px]">${j.nume}</span>
                        </div>
                        <button class="btn-elimina-joc text-red-400 text-[11px] hover:text-red-300 transition"
                            data-clasa="${clasa.id}"
                            data-joc='${JSON.stringify(j)}'>✕</button>
                    </div>
                `).join("")}
            </div>` : ""}

            <div class="flex justify-between flex-row gap-[1px] mt-2">
                <button class="btn-vezi-elevi text-[14px] bg-[#3a3a38] text-[#ccc] py-1 lg:px-4 lg:text-[16px] px-4 rounded-full hover:bg-[#4a4a48] transition">
                    Elevi
                </button>
                <select class="btn-adaug-joc appearance-none text-[14px] bg-blue-700 text-white py-1 lg:px-4 text-center lg:text-[16px] px-4 rounded-full hover:bg-blue-800 transition cursor-pointer outline-none">
                    <option value="" disabled selected>Adaugă joc</option>
                    <option value="1">Cartonase</option>
                    <option value="2">Adv-Fals</option>
                    <option value="3">Parola</option>
                    <option value="4">Variante</option>
                </select>
                <button class="btn-sterge-clasa text-[14px] bg-red-700 text-white py-1 lg:px-5 lg:text-[16px] px-4 rounded-full hover:bg-red-800 transition">
                    Sterge
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    if (cardAdauga) container.appendChild(cardAdauga);
}

export function atasazaEventuri(container) {
    container.addEventListener("click", async (e) => {

        const btnSterge = e.target.closest(".btn-sterge-clasa");
        if (btnSterge) {
            const card = btnSterge.closest(".clasa-card");
            const clasaId = card.dataset.id;
            await stergeClasa(clasaId);
            listaClaseGlobal = listaClaseGlobal.filter(c => c.id !== clasaId);
            card.remove();
            return;
        }

        const btnVezi = e.target.closest(".btn-vezi-elevi");
        if (btnVezi) {
            const card = btnVezi.closest(".clasa-card");
            const clasaId = card.dataset.id;
            const listaEl = card.querySelector(".elevi-lista");

            if (listaEl.classList.contains("hidden")) {
                const snap = await getDoc(doc(db, "users", auth.currentUser.uid, "clase", clasaId));
                const elevi = snap.exists() ? (snap.data().elevi || []) : [];

                const clasa = listaClaseGlobal.find(c => c.id === clasaId);
                if (clasa) clasa.elevi = elevi;

                listaEl.innerHTML = elevi.length === 0
                    ? `<p class="text-[#666] dark:text-[#EBF6FF]/50 text-[12px]">Niciun elev inscris inca.</p>`
                    : elevi.map(el => `
                        <div class="flex items-center justify-between bg-[#3a3a38] dark:bg-[#454870] rounded-lg px-3 py-1.5">
                            <span class="text-white dark:text-[#EBF6FF] text-[13px]">${el.nume || el.email || "—"}</span>
                            <button class="btn-elimina-elev text-red-400 text-[11px] hover:text-red-300 transition"
                                data-clasa="${clasaId}"
                                data-uid="${el.uid}"
                                data-nume="${el.nume || el.email || ""}">
                                ✕
                            </button>
                        </div>
                    `).join("");

                listaEl.classList.remove("hidden");
                btnVezi.textContent = "Ascunde";
            } else {
                listaEl.classList.add("hidden");
                btnVezi.textContent = "Vezi elevi";
            }
            return;
        }

        const btnElimina = e.target.closest(".btn-elimina-elev");
        if (btnElimina) {
            const clasaId = btnElimina.dataset.clasa;
            const elevUid = btnElimina.dataset.uid;

            await eliminaElevDinClasa(clasaId, elevUid);

            btnElimina.closest("div").remove();

            const clasa = listaClaseGlobal.find(c => c.id === clasaId);
            if (clasa) clasa.elevi = (clasa.elevi || []).filter(e => e.uid !== elevUid);

            const card = document.querySelector(`[data-id="${clasaId}"]`);
            const counter = card?.querySelector(".elevi-counter");
            if (counter && clasa) counter.textContent = `${(clasa.elevi || []).length} elevi`;

            return;
        }

        const btnEliminaJoc = e.target.closest(".btn-elimina-joc");
        if (btnEliminaJoc) {
            const clasaId = btnEliminaJoc.dataset.clasa;
            const jocData = JSON.parse(btnEliminaJoc.dataset.joc);
            await eliminaJocDinClasa(clasaId, jocData);
            btnEliminaJoc.closest("div").remove();
            const clasa = listaClaseGlobal.find(c => c.id === clasaId);
            if (clasa) clasa.jocuri = (clasa.jocuri || []).filter(j => j.jocId !== jocData.jocId);
            return;
        }
    });

    container.addEventListener("change", (e) => {
        const select = e.target.closest(".btn-adaug-joc");
        if (!select) return;
        const tip = select.value;
        const card = select.closest(".clasa-card");
        const clasaId = card.dataset.id;
        select.value = "";
        deschideModalJocuri(clasaId, tip, (jocData) => {
            const clasa = listaClaseGlobal.find(c => c.id === clasaId);
            if (clasa) {
                if (!clasa.jocuri) clasa.jocuri = [];
                clasa.jocuri.push(jocData);
            }
            genereazaHTMLClase(listaClaseGlobal, container);
            atasazaEventuri(container);
        });
    });
}

export async function initDashboard() {
    const container = document.querySelector("#grila-clase");
    if (!container) return;

    const clase = await getToateClasele();
    genereazaHTMLClase(clase, container);
    atasazaEventuri(container);

    const btnAdauga = document.querySelector("#btn-adauga-clasa");
    const inputNume = document.querySelector("#input-nume-clasa");
    const msgAdauga = document.querySelector("#msg-adauga-clasa");
    if (!btnAdauga || !inputNume) return;

    const executa = async () => {
        const numeClasa = inputNume.value.trim();
        if (!numeClasa) { inputNume.focus(); return; }

        btnAdauga.disabled = true;
        btnAdauga.textContent = "Se adauga...";

        const newId = await adaugaClasa(numeClasa);
        if (newId) {
            const claseActualizate = await getToateClasele();
            genereazaHTMLClase(claseActualizate, container);
            atasazaEventuri(container);
            if (msgAdauga) {
                msgAdauga.classList.remove("hidden");
                setTimeout(() => msgAdauga.classList.add("hidden"), 2500);
                window.location.href = "/public/pages/dashbord/dashbord.html";

            }
            inputNume.value = "";
        }

        btnAdauga.disabled = false;
        btnAdauga.innerHTML = `<span class="text-[18px] leading-none">+</span> Adaugă clasă`;
    };

    btnAdauga.addEventListener("click", executa);
    inputNume.addEventListener("keydown", (e) => { if (e.key === "Enter") executa(); });
}

onAuthStateChanged(auth, async (user) => {
    if (!user) return;
    await initDashboard();
});