import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const x = document.getElementById("ConecteazataID");
const y = document.getElementById("InregistreazataID");

// MOBILE
const xM = document.getElementById("ConecteazataID_M");
const yM = document.getElementById("InregistreazataID_M");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // 🔹 Ascunde butoanele desktop
    if (x) x.style.display = "none";
    if (y) y.style.display = "none";

    // 🔹 Ascunde butoanele mobile
    if (xM) xM.style.display = "none";
    if (yM) yM.style.display = "none";

    // 🔹 Creează buton profil (DESKTOP)
    const userBtn = document.createElement("div");
    userBtn.className = "flex items-center";
    userBtn.innerHTML = `
      <button type="button" id="butonProfil"
        class="flex items-center justify-center w-10 h-10 rounded-full border-black border-[1px] bg-white overflow-hidden">
        <img class="w-full h-full object-cover" src="../../../../public/assets/img/Icon.png" alt="Profil">
      </button>
    `;

    if (x) {
      x.parentNode.insertBefore(userBtn, x.nextSibling);
    }

    // 🔹 Creează buton profil (MOBILE)
    if (xM) {
      const userBtnMobile = document.createElement("div");
      userBtnMobile.className = "flex items-center py-2";
      userBtnMobile.innerHTML = `
        <button type="button" id="butonProfilMobile"
          class="flex items-center justify-center w-10 h-10 rounded-full border-black border-[1px] bg-white overflow-hidden">
          <img class="w-full h-full object-cover" src="../../../../public/assets/img/Icon.png" alt="Profil">
        </button>
      `;

      xM.parentNode.insertBefore(userBtnMobile, xM.nextSibling);
    }

    // 🔹 EVENT DESKTOP
    document.addEventListener("click", (e) => {
      if (e.target.closest("#butonProfil")) {
        toggleDashboard(user);
      }
    });

    // 🔹 EVENT MOBILE
    document.addEventListener("click", (e) => {
      if (e.target.closest("#butonProfilMobile")) {
        toggleDashboard(user);
      }
    });

    console.log(`Bună ziua, ${user.email}`);
  } else {
    console.log("conectează-te");
  }
});

function toggleDashboard(user) {
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
   document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        console.log("Deconectat");
        window.location.reload(); 
      })
      .catch((err) => console.error(err));
  });
  
}

// 🔹 DASHBOARD HTML
let dashboard = `
<div id="dashboardUser" class="bg-white border border-gray-100 rounded-[32px] w-[380px] p-8 text-center shadow-2xl">
   
    <div class="flex justify-end -mt-2 -mr-2">
        <button id="closeDashboard" class="w-8 h-8 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition flex items-center justify-center">
            ✕
        </button>
    </div>

    <div class="relative w-24 h-24 bg-blue-50 rounded-[24px] flex items-center justify-center mx-auto mb-5 shadow-inner">
        <img id="profileImage" src="../../../../public/assets/img/img-patrat-la-iconita-profil/Icons.png" class="w-12 opacity-70">
    </div>

    <h2 class="text-[22px] font-semibold text-gray-900 mb-1">Salut!</h2>
    <p id="emailUser" class="text-[13px] text-gray-400 mb-8">user@exemplu.com</p>

    <button  id="logoutBtn" class="w-full h-[40px] bg-slate-900 text-white rounded-2xl hover:bg-red-600 transition">
        Ieși din cont
    </button>
</div>
`;

