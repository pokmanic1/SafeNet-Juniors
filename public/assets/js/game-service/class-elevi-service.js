
import { db, auth } from "../fierbase/firebase-init.js";
import {
    collection,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    setDoc,
    arrayUnion,
    arrayRemove,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const LOCALSTORAGE_KEY = {
    1: "shuffleGameData",
    2: "intrebariTrueFalse",
    3: "conditii",
    4: "jocVarianteCustom"
};
const GAME_URL = {
    1: "../../pages/game-page/shuffle-game-page/shuffle-game.html",
    2: "../../pages/game-page/true-false-game-page/true-false-game.html",
    3: "../../pages/game-page/password-game-page/password-game.html",
    4: "../../pages/game-page/variante-game-page/variante-game.html"
};
const TIP_ICOANE = { 1: "🃏", 2: "✅", 3: "🔑", 4: "📋" };
const TIP_CULORI = {
    1: "bg-purple-700", 2: "bg-green-700",
    3: "bg-yellow-700", 4: "bg-blue-700"
};

async function cautaClasaDupaCod(codClasa) {
    const cod = codClasa.trim().toUpperCase();

    try {
        const snap = await getDocs(collection(db, "clase_globale"));
        for (const d of snap.docs) {
            const data = d.data();
            if (data.cod && data.cod.toUpperCase() === cod) {
                return { id: d.id, ...data };
            }
        }
    } catch (err) { console.warn("clase_globale err:", err); }

    try {
        const usersSnap = await getDocs(collection(db, "users"));
        for (const userDoc of usersSnap.docs) {
            const claseSnap = await getDocs(collection(db, "users", userDoc.id, "clase"));
            for (const clasaDoc of claseSnap.docs) {
                const data = clasaDoc.data();
                if (data.cod && data.cod.toUpperCase() === cod) {
                    try {
                        await setDoc(doc(db, "clase_globale", clasaDoc.id), {
                            cod: data.cod, nume: data.nume,
                            teacherUid: userDoc.id, clasaId: clasaDoc.id,
                            jocuri: data.jocuri || []
                        });
                    } catch (_) { }
                    return { id: clasaDoc.id, clasaId: clasaDoc.id, teacherUid: userDoc.id, ...data };
                }
            }
        }
    } catch (err) { console.warn("fallback users err:", err); }

    return null;
}

async function getCLasaFresh(clasaData) {
    const clasaId = clasaData.clasaId || clasaData.id;
    try {
        const snap = await getDoc(doc(db, "clase_globale", clasaId));
        if (snap.exists()) return { id: snap.id, ...snap.data() };
        if (clasaData.teacherUid) {
            const snap2 = await getDoc(doc(db, "users", clasaData.teacherUid, "clase", clasaId));
            if (snap2.exists()) return { id: snap2.id, ...snap2.data() };
        }
    } catch (err) { console.error("getCLasaFresh err:", err); }
    return null;
}

async function getDateJoc(teacherUid, colectie, jocId) {
    try {
        const snap = await getDoc(doc(db, "users", teacherUid, colectie, jocId));
        return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    } catch (err) { console.error("getDateJoc err:", err); return null; }
}

async function salveazaClasaPentruElev(user, clasaData) {
    const clasaId = clasaData.id || clasaData.clasaId;
    try {
        await setDoc(doc(db, "users", user.uid, "clase_elev", clasaId), {
            id: clasaId, clasaId: clasaId,
            teacherUid: clasaData.teacherUid,
            cod: clasaData.cod, nume: clasaData.nume
        }, { merge: true });
    } catch (err) { console.error("salveazaClasa err:", err); }
}

async function getClaseleElevului(user) {
    try {
        const snap = await getDocs(collection(db, "users", user.uid, "clase_elev"));
        return snap.docs.map(d => d.data());
    } catch (err) { console.error("getClaseleElevului err:", err); return []; }
}

async function parsesteClasa(user, clasaId) {
    try {
        await deleteDoc(doc(db, "users", user.uid, "clase_elev", clasaId));
        const elevData = { uid: user.uid, email: user.email, nume: user.displayName || user.email };
        const snapGlobal = await getDoc(doc(db, "clase_globale", clasaId));
        if (snapGlobal.exists()) {
            const { teacherUid } = snapGlobal.data();
            if (teacherUid) {
                await updateDoc(doc(db, "users", teacherUid, "clase", clasaId), {
                    elevi: arrayRemove(elevData)
                });
            }
        }
    } catch (err) { console.error("parsesteClasa err:", err); }
}

async function inregistreazaElev(user, clasaData) {
    const elevData = { uid: user.uid, email: user.email, nume: user.displayName || user.email };
    const clasaId = clasaData.clasaId || clasaData.id;
    const teacherUid = clasaData.teacherUid;
    if (!clasaId || !teacherUid) return;
    try {
        const snap = await getDoc(doc(db, "users", teacherUid, "clase", clasaId));
        if (snap.exists()) {
            const elevi = snap.data().elevi || [];
            if (!elevi.some(e => e.uid === user.uid)) {
                await updateDoc(doc(db, "users", teacherUid, "clase", clasaId), {
                    elevi: arrayUnion(elevData)
                });
            }
        }
    } catch (err) { console.error("inregistreazaElev err:", err); }
}


let userGlobal = null;
let listaClaseElev = [];

function randeazaJocuriInCard(card, clasa) {
    const listaEl = card.querySelector(".jocuri-lista");
    const jocuri = clasa.jocuri || [];

    if (jocuri.length === 0) {
        listaEl.innerHTML = `
            <p class="text-[#666] text-[12px] text-center py-2">
                Niciun joc adăugat încă.<br>
                <span class="text-[11px] text-[#444]">Profesorul va adăuga jocuri în curând.</span>
            </p>`;
        return;
    }

    listaEl.innerHTML = jocuri.map(joc => `
        <div class="flex items-center justify-between bg-[#252523] rounded-xl px-3 py-2 gap-2">
            <div class="flex items-center gap-2 min-w-0">
                <span class="text-[18px] flex-shrink-0">${TIP_ICOANE[joc.tip] || "🎮"}</span>
                <div class="flex flex-col min-w-0">
                    <span class="text-white text-[12px] font-semibold truncate">${joc.nume || "Joc"}</span>
                    <span class="text-[10px] ${TIP_CULORI[joc.tip] || "bg-gray-700"} text-white px-2 py-0.5 rounded-full w-fit mt-0.5">
                        ${joc.tipNume}
                    </span>
                </div>
            </div>
            <button class="btn-joaca-joc flex-shrink-0 bg-green-600 hover:bg-green-700 active:scale-95
                           text-white text-[11px] font-bold px-3 py-1.5 rounded-full transition"
                data-joc-id="${joc.jocId}"
                data-tip="${joc.tip}"
                data-colectie="${joc.colectie}"
                data-teacher="${joc.teacherUid}">
                ▶ Joacă
            </button>
        </div>
    `).join("");
}

async function randeazaToateClasele(container, cardAdauga) {
    container.querySelectorAll(".clasa-card-elev").forEach(el => el.remove());

    const claseFresh = await Promise.all(
        listaClaseElev.map(c => getCLasaFresh(c))
    );

    claseFresh.forEach((clasa, idx) => {
        if (!clasa) return;
        listaClaseElev[idx] = { ...listaClaseElev[idx], ...clasa };

        const jocuri = clasa.jocuri || [];
        const clasaId = clasa.id || listaClaseElev[idx].clasaId;

        const card = document.createElement("div");
        card.dataset.id = clasaId;
        card.className = "clasa-card-elev border border-black bg-[#30302E] rounded-2xl py-[29px] xl:px-[20px] px-[10px] flex flex-col gap-[8px] transition-transform hover:scale-[1.02]";
        card.innerHTML = `
            <div class="flex justify-between items-center">
                <h2 class="text-white font-bold text-[18px]">${clasa.nume}</h2>
                <span class="bg-white text-black text-[12px] font-medium px-[12px] py-[4px] rounded-full">
                    ${jocuri.length} joc${jocuri.length !== 1 ? "uri" : ""}
                </span>
            </div>
            <p class="text-[#888] text-[13px]">
                Cod: <span class="font-mono font-bold text-white">${clasa.cod}</span>
            </p>

            <!-- Jocuri expandabile -->
            <div class="jocuri-lista hidden mt-1 flex flex-col gap-1"></div>

            <!-- Butoane — acelasi layout ca la profesor -->
            <div class="flex justify-between flex-row gap-[4px] mt-2">
                <button class="btn-vezi-jocuri text-[14px] bg-[#3a3a38] text-[#ccc] py-1 lg:px-4 lg:text-[16px] px-4 rounded-full hover:bg-[#4a4a48] transition">
                    ▶ Joacă
                </button>
                <button class="btn-paraseste text-[14px] bg-red-700 text-white py-1 lg:px-5 lg:text-[16px] px-4 rounded-full hover:bg-red-800 transition">
                    Părăsește
                </button>
            </div>
        `;
        container.insertBefore(card, cardAdauga);
    });
}

function atasazaEventuri(container, cardAdauga) {
    container.addEventListener("click", async (e) => {

        const btnVezi = e.target.closest(".btn-vezi-jocuri");
        if (btnVezi) {
            const card    = btnVezi.closest(".clasa-card-elev");
            const clasaId = card.dataset.id;
            const clasa   = listaClaseElev.find(c => (c.id || c.clasaId) === clasaId);
            const listaEl = card.querySelector(".jocuri-lista");

            if (listaEl.classList.contains("hidden")) {
                randeazaJocuriInCard(card, clasa || {});
                listaEl.classList.remove("hidden");
                btnVezi.textContent = "🔼 Ascunde";
            } else {
                listaEl.classList.add("hidden");
                btnVezi.textContent = "▶ Joacă";
            }
            return;
        }

        const btnJoaca = e.target.closest(".btn-joaca-joc");
        if (btnJoaca) {
            btnJoaca.disabled = true;
            btnJoaca.innerHTML = `<span class="animate-pulse">⏳</span>`;

            const tip        = parseInt(btnJoaca.dataset.tip);
            const jocId      = btnJoaca.dataset.jocId;
            const colectie   = btnJoaca.dataset.colectie;
            const teacherUid = btnJoaca.dataset.teacher;

            const dateJoc = await getDateJoc(teacherUid, colectie, jocId);
            if (!dateJoc) {
                btnJoaca.disabled = false;
                btnJoaca.textContent = "▶ Joacă";
                alert("Jocul nu a putut fi încărcat. Încearcă din nou.");
                return;
            }

            const cheie = LOCALSTORAGE_KEY[tip];
            if (tip === 1) localStorage.setItem(cheie, JSON.stringify(dateJoc.date));
            if (tip === 2) localStorage.setItem(cheie, JSON.stringify(dateJoc.intrebari || dateJoc.date || dateJoc));
            if (tip === 3) localStorage.setItem(cheie, JSON.stringify(dateJoc.conditii  || dateJoc.date || dateJoc));
            if (tip === 4) localStorage.setItem(cheie, JSON.stringify(dateJoc.intrebari || dateJoc.date || dateJoc));

            window.location.href = GAME_URL[tip];
            return;
        }

        const btnParaseste = e.target.closest(".btn-paraseste");
        if (btnParaseste) {
            if (!confirm("Ești sigur că vrei să părăsești această clasă?")) return;
            const card    = btnParaseste.closest(".clasa-card-elev");
            const clasaId = card.dataset.id;
            await parsesteClasa(userGlobal, clasaId);
            listaClaseElev = listaClaseElev.filter(c => (c.id || c.clasaId) !== clasaId);
            card.remove();
            return;
        }
    });
}

function initBtnAdaugaClasa(container, cardAdauga) {
    const input     = document.querySelector("#input-nume-clasa");
    const btn       = document.querySelector("#btn-adauga-clasa");
    const msgAdauga = document.querySelector("#msg-adauga-clasa");
    if (!btn || !input) return;

    const executa = async () => {
        const cod = input.value.trim();
        if (!cod) { input.focus(); return; }

        btn.disabled = true;
        btn.innerHTML = `<span class="animate-pulse">Se caută...</span>`;

        const clasa = await cautaClasaDupaCod(cod);

        if (!clasa) {
            input.classList.add("border-red-500");
            setTimeout(() => input.classList.remove("border-red-500"), 1500);
            if (msgAdauga) {
                msgAdauga.textContent = " Cod invalid. Verifică și încearcă din nou.";
                msgAdauga.className = "text-[12px] text-red-400";
                msgAdauga.classList.remove("hidden");
                setTimeout(() => msgAdauga.classList.add("hidden"), 3500);
            }
            btn.disabled = false;
            btn.innerHTML = `<span class="text-[18px] leading-none">+</span> Intră în clasă`;
            return;
        }

        const clasaId = clasa.id || clasa.clasaId;

        if (listaClaseElev.some(c => (c.id || c.clasaId) === clasaId)) {
            if (msgAdauga) {
                msgAdauga.textContent = "ℹ️ Ești deja în această clasă!";
                msgAdauga.className = "text-[12px] text-yellow-400";
                msgAdauga.classList.remove("hidden");
                setTimeout(() => msgAdauga.classList.add("hidden"), 3000);
            }
            btn.disabled = false;
            btn.innerHTML = `<span class="text-[18px] leading-none">+</span> Intră în clasă`;
            input.value = "";
            return;
        }

        await salveazaClasaPentruElev(userGlobal, clasa);
        await inregistreazaElev(userGlobal, clasa);
        listaClaseElev.push(clasa);
        input.value = "";

        if (msgAdauga) {
            msgAdauga.textContent = `✓ Ai intrat în clasa ${clasa.nume}!`;
            msgAdauga.className = "text-[12px] text-green-400";
            msgAdauga.classList.remove("hidden");
            setTimeout(() => msgAdauga.classList.add("hidden"), 2500);
        }

        await randeazaToateClasele(container, cardAdauga);

        btn.disabled = false;
        btn.innerHTML = `<span class="text-[18px] leading-none">+</span> Intră în clasă`;
    };

    btn.addEventListener("click", executa);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") executa(); });
}

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "../../index.html";
        return;
    }
    userGlobal = user;

    const container  = document.querySelector("#grila-clase");
    const cardAdauga = document.querySelector("#card-adauga-clasa");
    if (!container || !cardAdauga) return;

    listaClaseElev = await getClaseleElevului(user);
    await randeazaToateClasele(container, cardAdauga);
    atasazaEventuri(container, cardAdauga);
    initBtnAdaugaClasa(container, cardAdauga);
});