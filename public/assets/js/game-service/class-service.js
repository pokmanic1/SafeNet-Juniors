import { db, auth } from "../fierbase/firebase-init.js";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "../../index.html";
        return;
    }
    await initDashboard();
});

function genereazaCod(numeClasa) {
    const prefix = numeClasa.replace(/\s+/g, "").slice(0, 3).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `${prefix}-${rand}`;
}


export const adaugaClasa = async (numeClasa) => {
    const user = auth.currentUser;
    if (!user) { console.error("Neautentificat!"); return null; }

    try {
        const claseRef = collection(db, "users", user.uid, "clase");
        const docRef = await addDoc(claseRef, {
            nume: numeClasa,
            cod: genereazaCod(numeClasa),
            elevi: [],
            creatLa: serverTimestamp()
        });
        console.log("Clasa adaugata:", docRef.id);
        return docRef.id;
    } catch (err) {
        console.error("Eroare la adaugare clasa:", err);
        return null;
    }
};

export const getToateClasele = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    try {
        const claseRef = collection(db, "users", user.uid, "clase");
        const snapshot = await getDocs(claseRef);
        return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
        console.error("Eroare la citire clase:", err);
        return [];
    }
};

export const stergeClasa = async (clasaId) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
        await deleteDoc(doc(db, "users", user.uid, "clase", clasaId));
    } catch (err) {
        console.error("Eroare la stergere clasa:", err);
    }
};

export const adaugaElevInClasa = async (teacherUid, clasaId, elevData) => {
    try {
        const clasaRef = doc(db, "users", teacherUid, "clase", clasaId);
        await updateDoc(clasaRef, { elevi: arrayUnion(elevData) });
    } catch (err) {
        console.error("Eroare la adaugare elev:", err);
    }
};

export const eliminaElevDinClasa = async (clasaId, elevData) => {
    const user = auth.currentUser;
    if (!user) return;
    try {
        const clasaRef = doc(db, "users", user.uid, "clase", clasaId);
        await updateDoc(clasaRef, { elevi: arrayRemove(elevData) });
    } catch (err) {
        console.error("Eroare la eliminare elev:", err);
    }
};

let listaClaseGlobal = [];

// ─── Randare carduri clase ────────────────────────────────────────────────────
export function genereazaHTMLClase(clase, container) {
    listaClaseGlobal = clase;

    const cardAdauga = document.querySelector("#card-adauga-clasa");
    container.innerHTML = "";

    clase.forEach(clasa => {
        const card = document.createElement("div");
        card.dataset.id = clasa.id;
        card.className = "clasa-card border border-black bg-[#30302E] rounded-2xl p-[20px] flex flex-col gap-[8px] cursor-pointer transition-transform hover:scale-[1.02]";
        card.innerHTML = `
            <div class="flex justify-between items-center">
                <h2 class="text-white font-bold text-[18px]">${clasa.nume}</h2>
                <span class="elevi-counter bg-white text-black text-[12px] font-medium px-[12px] py-[4px] rounded-full">
                    ${(clasa.elevi || []).length} elevi
                </span>
            </div>
            <p class="text-[#888] text-[13px]">Codul: <span class="font-mono font-bold text-white">${clasa.cod}</span></p>
            <div class="elevi-lista hidden mt-2 flex flex-col gap-1"></div>
            <div class="flex gap-2 mt-3">
                <button class="btn-vezi-elevi text-[11px] bg-[#3a3a38] text-[#ccc] px-3 py-1 rounded-full hover:bg-[#4a4a48] transition">
                    Vezi elevi
                </button>
                <button class="btn-sterge-clasa text-[11px] bg-red-700 text-white px-3 py-1 rounded-full hover:bg-red-800 transition">
                    Sterge
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    if (cardAdauga) container.appendChild(cardAdauga);
}

function atasazaEventuri(container) {
    container.addEventListener("click", async (e) => {

        const btnSterge = e.target.closest(".btn-sterge-clasa");
        if (btnSterge) {
            const card = btnSterge.closest(".clasa-card");
            const clasaId = card.dataset.id;
            await stergeClasa(clasaId);
            card.remove();
            listaClaseGlobal = listaClaseGlobal.filter(c => c.id !== clasaId);
            return;
        }

        const btnVezi = e.target.closest(".btn-vezi-elevi");
        if (btnVezi) {
            const card = btnVezi.closest(".clasa-card");
            const clasaId = card.dataset.id;
            const clasa = listaClaseGlobal.find(c => c.id === clasaId);
            const listaEl = card.querySelector(".elevi-lista");

            if (listaEl.classList.contains("hidden")) {
                const elevi = clasa?.elevi || [];
                listaEl.innerHTML = elevi.length === 0
                    ? `<p class="text-[#666] text-[12px]">Niciun elev inscris inca.</p>`
                    : elevi.map(el => `
                        <div class="flex items-center justify-between bg-[#3a3a38] rounded-lg px-3 py-1.5">
                            <span class="text-white text-[13px]">${el.nume || el.email}</span>
                            <button class="btn-elimina-elev text-red-400 text-[11px] hover:text-red-300"
                                data-clasa="${clasaId}"
                                data-elev='${JSON.stringify(el)}'>x</button>
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
            const elevData = JSON.parse(btnElimina.dataset.elev);
            await eliminaElevDinClasa(clasaId, elevData);
            btnElimina.closest("div").remove();

            const clasa = listaClaseGlobal.find(c => c.id === clasaId);
            if (clasa) clasa.elevi = clasa.elevi.filter(e => e.uid !== elevData.uid);

            const card = document.querySelector(`[data-id="${clasaId}"]`);
            if (card) {
                const counter = card.querySelector(".elevi-counter");
                const clazaActualizata = listaClaseGlobal.find(c => c.id === clasaId);
                if (counter && clazaActualizata) {
                    counter.textContent = `${(clazaActualizata.elevi || []).length} elevi`;
                }
            }
        }
    });
}

async function initDashboard() {
    const container = document.querySelector("#grila-clase");
    if (!container) return;

    const clase = await getToateClasele();
    genereazaHTMLClase(clase, container);
    atasazaEventuri(container);

    const btnAdauga = document.querySelector("#btn-adauga-clasa");
    const inputNume = document.querySelector("#input-nume-clasa");
    const msgAdauga = document.querySelector("#msg-adauga-clasa");

    if (!btnAdauga || !inputNume) return;

    btnAdauga.addEventListener("click", async () => {
        const numeClasa = inputNume.value.trim();
        if (!numeClasa) {
            inputNume.focus();
            return;
        }

        btnAdauga.disabled = true;
        btnAdauga.textContent = "Se adauga...";

        const newId = await adaugaClasa(numeClasa);

        if (newId) {
            const claseActualizate = await getToateClasele();
            genereazaHTMLClase(claseActualizate, container);

            if (msgAdauga) {
                msgAdauga.classList.remove("hidden");
                setTimeout(() => msgAdauga.classList.add("hidden"), 2500);
            }
            inputNume.value = "";
        }

        btnAdauga.disabled = false;
        btnAdauga.innerHTML = `<span class="text-[18px] leading-none">+</span> Adauga clasa`;
    });

    inputNume.addEventListener("keydown", (e) => {
        if (e.key === "Enter") btnAdauga.click();
    });
}