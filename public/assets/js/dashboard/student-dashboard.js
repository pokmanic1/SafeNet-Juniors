import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";

const x = document.getElementById("ConecteazataID");
const y = document.getElementById("InregistreazataID");

const dashboard = `
  <div id="dashboardUser" class="bg-gradient-to-b from-[#5BA3C9] to-[#7AB5D3] rounded-[28px] w-[320px] shadow-2xl overflow-hidden">
    
    <!-- Header -->
    <div class="relative bg-[#4A90B8] px-5 py-4 flex items-center justify-between">
      <span class="text-white font-semibold text-[15px] tracking-wide">Profilul meu</span>
      <button id="closeDashboard" class="w-[32px] h-[32px] rounded-full bg-white/20 hover:bg-white/40 transition flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Avatar + Info -->
    <div class="flex flex-col items-center pt-6 pb-4 px-5">
      <div class="relative w-[80px] h-[80px] rounded-full bg-white shadow-md flex items-center justify-center mb-3">
        <img src="../assets/img/img-patrat-la-iconita-profil/Icons.png" alt="" class="w-[60%]">
        <div class="absolute bottom-0 right-0 w-[26px] h-[26px] bg-[#4A90B8] rounded-full flex items-center justify-center shadow">
          <img src="../assets/img/img-patrat-la-iconita-profil/Camera.svg" alt="" class="w-[55%]">
        </div>
      </div>

      <h3 class="text-white font-semibold text-[15px]">Username</h3>
      <h3 id="emailUser" class="text-white/70 text-[12px] mt-[2px]"></h3>
    </div>

    <!-- Divider -->
    <div class="mx-5 h-[1px] bg-white/20 mb-4"></div>

    <!-- Butoane -->
    <div class="flex flex-col gap-[10px] px-5 pb-5">
      
      <button class="w-full h-[48px] bg-white/20 hover:bg-white/30 transition rounded-[14px] flex items-center gap-3 px-4 text-white text-[14px] font-medium">
        <img src="../assets/img/img-patrat-la-iconita-profil/Setari.png" alt="" class="w-[22px]">
        Setări
      </button>

      <button class="w-full h-[48px] bg-white/20 hover:bg-red-400/60 transition rounded-[14px] flex items-center gap-3 px-4 text-white text-[14px] font-medium">
        <img src="../assets/img/img-patrat-la-iconita-profil/Vector.png" alt="" class="w-[22px]">
        Ieși din cont
      </button>

    </div>
  </div>
`;
onAuthStateChanged(auth, (user) => {
  if (user) {
    x.style.display = "none";
    y.style.display = "none";

    const userBtn = document.createElement("div");
    userBtn.className = "flex items-center";
    userBtn.innerHTML = `<button type="button" id="butonProfil" class="butonDashboard w-8 h-8 rounded-[40px] bg-black border-0"></button>`;
    x.parentNode.insertBefore(userBtn, x.nextSibling);

    document.getElementById("butonProfil").addEventListener("click", () => {
      const existing = document.getElementById("dashboardWrapper");
      if (existing) {
        existing.remove();
        return;
      }
      const dashboardWrapper = document.createElement("div");
      dashboardWrapper.id = "dashboardWrapper";
      dashboardWrapper.style.cssText = `
        position: fixed;
        top: 70px;
        right: 20px;
        z-index: 9999;
      `;

      dashboardWrapper.innerHTML = dashboard;
      document.body.appendChild(dashboardWrapper);

      document.getElementById("emailUser").textContent = user.email;

      document.getElementById("closeDashboard").addEventListener("click", () => {
        dashboardWrapper.remove();
      });
    });

    console.log(`Bună ziua, ${user.email}`);
  } else {
    console.log('conecteazate');
  }
});