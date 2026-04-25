// ============================================================
// modals.js
// Locatie: public/assets/js/modals.js
//
// Utilizare:
//   import { buildModals } from "../../../assets/js/modals.js";
//   buildModals("./documentatie-shuffle-game.html");
// ============================================================

function dacaNuSaConectat() {
    return `
    <div id="dacaNuSaConectat" class="fixed inset-0 z-50 flex items-center justify-center hidden bg-black/50">
        <div class="bg-white border border-gray-200 rounded-3xl w-[420px] px-10 py-10 text-center shadow-2xl">
            <div class="flex items-center justify-center mx-auto mb-6 w-14 h-14 bg-blue-50 rounded-2xl">
                <img src="../../../assets/img/Vector.svg" alt="Shield" class="h-auto w-14">
            </div>
            <h2 class="text-[22px] font-semibold text-gray-900 mb-2 tracking-tight">Înainte să începi…</h2>
            <p class="text-[13px] text-gray-400 mb-8">Conectează-te pentru a îți salva progresul.</p>
            <a href="../../conecteazate.html"
                class="h-[40px] bg-slate-900 text-white px-20 py-2 rounded-2xl font-medium text-md hover:bg-blue-600 transition-all hover:shadow-2xl hover:shadow-blue-200 active:scale-95">
                Conectează-te
            </a>
            <p class="mt-4 text-[12px] text-gray-400">
                Nu ai cont?
                <a href="../../inregistreazate.html" class="text-[#185FA5] hover:underline">Înregistrează-te</a>
            </p>
        </div>
    </div>`;
}

function dacaNuACititDocum(linkDocumentatie) {
    return `
    <div id="dacaNuACititDocum" class="fixed inset-0 z-50 flex items-center justify-center hidden bg-black/50">
        <div class="relative bg-[#7AB5D3] rounded-2xl border border-blue-700 shadow-lg p-10 w-[450px] text-center">
            <button onclick="document.getElementById('dacaNuACititDocum').classList.add('hidden')"
                class="absolute top-3 right-4 bg-blue-700 hover:bg-blue-800 text-white w-[30px] h-[30px] rounded-full flex items-center justify-center text-2xl font-bold transition duration-100 hover:scale-105">
                ×
            </button>
            <div class="flex justify-center mb-5">
                <img src="../../../assets/img/Vector.svg" alt="Shield" class="h-auto w-14">
            </div>
            <h2 class="mb-2 text-xl font-semibold text-gray-900">Înainte să începi ...</h2>
            <p class="mb-6 text-sm text-gray-500">Citește cu atenție Documentația</p>
            <a href="${linkDocumentatie}"
                class="inline-flex items-center justify-center gap-2 w-[200px] bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition">
                Documentație
            </a>
        </div>
    </div>`;
}

function finalModal(labelScor = "Întrebări corecte") {
    return `
    <div id="finalModal" class="fixed inset-0 z-50 flex items-center justify-center hidden bg-black/50">
        <div class="bg-[#7AB5D3] rounded-[20px] p-7 w-[380px] relative text-center">
            <div class="flex justify-center items-end gap-1.5 mb-3">
                <div class="w-7 h-7 bg-[#f5c518]" style="clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"></div>
                <div class="w-[38px] h-[38px] bg-[#f5c518]" style="clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"></div>
                <div class="w-7 h-7 bg-[#f5c518]" style="clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"></div>
            </div>
            <h1 class="text-[22px] font-bold text-[#1a1a2e] mb-5">Felicitări!</h1>
            <div class="bg-white rounded-xl px-5 py-2 flex flex-col">
                <div class="flex justify-between py-3 border-b">
                    <span>Nivelul</span>
                    <span id="nivelFinal"></span>
                </div>
                <div class="flex justify-between py-3 border-b">
                    <span>${labelScor}</span>
                    <span id="scorFinal"></span>
                </div>
                <div class="flex justify-between py-3">
                    <span>Timpul</span>
                    <span id="timpFinal"></span>
                </div>
            </div>
            <div class="flex gap-3 mt-5">
                <button id="retryBtn" class="restart1 flex-1 py-[11px] border bg-white rounded-full text-[13px]">
                    Încearcă din nou
                </button>
                <a href="../../games.html" class="flex-1 py-[11px] bg-[#3a7bd5] rounded-full text-white">
                    Meniu Jocuri
                </a>
            </div>
        </div>
    </div>`;
}

export function buildModals(linkDocumentatie, labelScor = "Întrebări corecte") {
    const container = document.querySelector(".container");
    container.innerHTML =
        dacaNuSaConectat() +
        dacaNuACititDocum(linkDocumentatie) +
        finalModal(labelScor);
}