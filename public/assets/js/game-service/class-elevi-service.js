//----------------------------------------------------------------------------------------------------------------------
//BPagina de clase pentru elevi
//----------------------------------------------------------------------------------------------------------------------








import { db, auth } from "../fierbase/firebase-init.js";
import {
    collection, getDocs, doc, getDoc,
    updateDoc, setDoc, arrayUnion, arrayRemove, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const LOCALSTORAGE_KEY = { 1: "shuffleGameData", 2: "intrebariTrueFalse", 3: "conditiiProfesori", 4: "jocVarianteCustom" };
const GAME_URL = {
    1: "../../pages/game-page/shuffle-game-page/shuffle-game.html",
    2: "../../pages/game-page/true-false-game-page/true-false-game.html",
    3: "../../pages/game-page/password-game-page/password-game.html",
    4: "../../pages/game-page/variante-game-page/variante-game.html"
};



let userGlobal = null;

//----------------------------------------------------------------------------------------------------------------------
//Cauta in baza de date un cod asemanator cu cel introdus de utilizator
//----------------------------------------------------------------------------------------------------------------------
async function cautaClasaDupaCod(cod) {
    const snap = await getDocs(collection(db, "clase_globale"));
    for (const d of snap.docs) {
        const data = d.data();
        if (data.cod && data.cod.toUpperCase() === cod.toUpperCase()) {
            return { id: d.id, ...data };
        }
    }
    return null;
}


//----------------------------------------------------------------------------------------------------------------------
//Ia clasa din clase globale din baza de date
//----------------------------------------------------------------------------------------------------------------------
async function getClasaFresh(clasaId) {
    const snap = await getDoc(doc(db, "clase_globale", clasaId));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

//----------------------------------------------------------------------------------------------------------------------
//Toate clasele elevului
//----------------------------------------------------------------------------------------------------------------------
async function getClaseleElevului() {
    const snap = await getDocs(collection(db, "users", userGlobal.uid, "clase_elev"));
    return snap.docs.map(d => d.data());
}

//----------------------------------------------------------------------------------------------------------------------
//Salveaza clasa in care e elevul
//----------------------------------------------------------------------------------------------------------------------
async function salveazaClasaLaElev(clasa) {
    const clasaId = clasa.id || clasa.clasaId;
    await setDoc(doc(db, "users", userGlobal.uid, "clase_elev", clasaId), {
        clasaId, teacherUid: clasa.teacherUid, cod: clasa.cod, nume: clasa.nume
    }, { merge: true });
}

//----------------------------------------------------------------------------------------------------------------------
//Il inregistreaza in clasa profesorului in baza de date a profesorului
//----------------------------------------------------------------------------------------------------------------------
async function inregistreazaElev(clasa) {
    const clasaId = clasa.id || clasa.clasaId;
    const elevData = { uid: userGlobal.uid, email: userGlobal.email, nume: userGlobal.displayName || userGlobal.email };
    try {
        const snap = await getDoc(doc(db, "users", clasa.teacherUid, "clase", clasaId));
        if (!snap.exists()) return;
        const elevi = snap.data().elevi || [];
        if (!elevi.some(e => e.uid === userGlobal.uid)) {
            await updateDoc(doc(db, "users", clasa.teacherUid, "clase", clasaId), { elevi: arrayUnion(elevData) });
        }
    } catch (err) { console.error(err); }
}

//----------------------------------------------------------------------------------------------------------------------
//Iesi din clasa
//----------------------------------------------------------------------------------------------------------------------
async function parasestClasa(clasaId, teacherUid) {
    await deleteDoc(doc(db, "users", userGlobal.uid, "clase_elev", clasaId));
    try {
        const elevData = { uid: userGlobal.uid, email: userGlobal.email, nume: userGlobal.displayName || userGlobal.email };
        await updateDoc(doc(db, "users", teacherUid, "clase", clasaId), { elevi: arrayRemove(elevData) });
    } catch (err) { console.error(err); }
}

//----------------------------------------------------------------------------------------------------------------------
//Obtine datele despre un joc
//----------------------------------------------------------------------------------------------------------------------
async function getDateJoc(teacherUid, colectie, jocId) {
    const snap = await getDoc(doc(db, "users", teacherUid, colectie, jocId));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}


//----------------------------------------------------------------------------------------------------------------------
//generare HTML
//----------------------------------------------------------------------------------------------------------------------
function creeazaCard(clasa) {
    const jocuri = clasa.jocuri || [];
    const clasaId = clasa.id || clasa.clasaId;

    const card = document.createElement("div");
    card.dataset.id = clasaId;
    card.className = "clasa-card bg-[#1a1a18] dark:bg-[#1e2035] rounded-[24px] p-6 flex flex-col gap-4 transition-transform hover:scale-[1.02] relative overflow-hidden";

    card.innerHTML = `
        <div class="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>
 
        <div class="w-full h-[140px] rounded-2xl flex justify-center items-center bg-[#252523] dark:bg-[#252840] border border-white/5">
            <img src="../../assets/img/img-pt-index/User_Add-normalMode.svg" alt="Clasa" class="w-[30%] opacity-90 drop-shadow-lg">
        </div>
 
        <div class="flex justify-between items-start gap-2">
            <h2 class="text-white font-extrabold text-[18px] leading-tight">${clasa.nume}</h2>
            <span class="flex-shrink-0 bg-white/10 text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/10">
                ${jocuri.length} joc${jocuri.length !== 1 ? "uri" : ""}
            </span>
        </div>
 
        <div class="flex items-center gap-2 bg-[#252523] dark:bg-[#252840] border border-white/5 rounded-xl px-4 py-2 w-fit">
            <span class="text-gray-400 text-[12px]">Cod:</span>
            <span class="font-mono font-bold text-white tracking-widest text-[13px]">${clasa.cod}</span>
        </div>
 
        <div class="jocuri-lista flex flex-col gap-2">
            ${jocuri.length === 0
            ? `<p class="text-gray-600 text-[12px]">Niciun joc adăugat încă.</p>`
            : jocuri.map(j => `
                    <div class="flex items-center justify-between bg-[#252523] dark:bg-[#252840] border border-white/5 rounded-xl px-3 py-2 gap-2">
                        <div class="flex flex-col min-w-0">
                            <span class="text-white text-[12px] font-semibold truncate">${j.nume}</span>
                            <span class="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full w-fit mt-0.5 font-semibold">${j.tipNume}</span>
                        </div>
                        <button class="btn-joaca bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 active:scale-95 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl transition shadow-md shadow-green-900/30 flex-shrink-0"
                            data-joc-id="${j.jocId}" data-tip="${j.tip}" data-colectie="${j.colectie}" data-teacher="${j.teacherUid}">
                            ▶ Joacă
                        </button>
                    </div>
                `).join("")
        }
        </div>
 
        <div class="flex justify-end mt-auto pt-2 border-t border-white/5">
            <button class="btn-paraseste text-[13px] bg-red-700/80 hover:bg-red-700 text-white py-2 px-5 rounded-xl transition font-semibold">
                 Părăsește
            </button>
        </div>
    `;

    card.querySelectorAll(".btn-joaca").forEach(btn => {
        btn.addEventListener("click", async () => {
            const tip = parseInt(btn.dataset.tip);
            const dateJoc = await getDateJoc(btn.dataset.teacher, btn.dataset.colectie, btn.dataset.jocId);
            if (!dateJoc) {
                //console.log("Jocul nu a putut fi încărcat.");
                return;
            }
            const cheie = LOCALSTORAGE_KEY[tip];
            if (tip === 1) localStorage.setItem(cheie, JSON.stringify(dateJoc.date));
            if (tip === 2) localStorage.setItem(cheie, JSON.stringify(dateJoc.intrebari || dateJoc.date || dateJoc));
            if (tip === 3) localStorage.setItem(cheie, JSON.stringify(dateJoc.conditii || dateJoc.date || dateJoc));
            if (tip === 4) localStorage.setItem(cheie, JSON.stringify(dateJoc.intrebari || dateJoc.date || dateJoc));
            window.location.href = GAME_URL[tip];
        });
    });

    card.querySelector(".btn-paraseste").addEventListener("click", async () => {
        await parasestClasa(clasaId, clasa.teacherUid);
        card.remove();
    });

    return card;
}
async function randeazaClase() {
    const container = document.querySelector("#grila-clase");
    const cardAdauga = document.querySelector("#card-adauga-clasa");
    if (!container || !cardAdauga) return;

    container.querySelectorAll(".clasa-card").forEach(el => el.remove());

    const claseRef = await getClaseleElevului();
    for (const ref of claseRef) {
        const clasa = await getClasaFresh(ref.clasaId);
        if (clasa) container.insertBefore(creeazaCard(clasa), cardAdauga);
    }
}


//----------------------------------------------------------------------------------------------------------------------
//Codul care il adauga elevul
//----------------------------------------------------------------------------------------------------------------------
function initInput() {
    const input = document.querySelector("#input-cod-clasa");
    const btn = document.querySelector("#btn-adauga-clasa");
    const msg = document.querySelector("#msg-adauga-clasa");
    if (!input || !btn) return;

    const afiseazaMesaj = (text, culoare) => {
        if (!msg) return;
        msg.textContent = text;
        msg.className = `text-[12px] ${culoare}`;
        msg.classList.remove("hidden");
        setTimeout(() => msg.classList.add("hidden"), 3000);
    };

    const executa = async () => {
        const cod = input.value.trim();
        if (!cod) { input.focus(); return; }

        const clasa = await cautaClasaDupaCod(cod);

        if (!clasa) {
            afiseazaMesaj("Cod invalid. Verifică și încearcă din nou.", "text-red-400");
            return;
        }

        const clasaId = clasa.id || clasa.clasaId;
        const container = document.querySelector("#grila-clase");
        const cardAdauga = document.querySelector("#card-adauga-clasa");

        if (container.querySelector(`[data-id="${clasaId}"]`)) {
            afiseazaMesaj(" Ești deja în această clasă!", "text-yellow-400");
            input.value = "";
            return;
        }

        await salveazaClasaLaElev(clasa);
        await inregistreazaElev(clasa);

        const clasaFresh = await getClasaFresh(clasaId) || clasa;
        container.insertBefore(creeazaCard(clasaFresh), cardAdauga);

        afiseazaMesaj(`Ai intrat în clasa ${clasa.nume}!`, "text-green-400");
        input.value = "";
    };

    btn.addEventListener("click", executa);
    input.addEventListener("keydown", e => { if (e.key === "Enter") executa(); });
}

onAuthStateChanged(auth, async (user) => {
    if (!user) { window.location.href = "../../index.html"; return; }
    userGlobal = user;
    await randeazaClase();
    initInput();
});