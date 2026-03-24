import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db, onAuthStateChanged } from "../fierbase/firebase-init.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const x = document.getElementById("ConecteazataID");
const y = document.getElementById("InregistreazataID");

// MOBILE
const xM = document.getElementById("ConecteazataID_M");
const yM = document.getElementById("InregistreazataID_M");

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (x) x.style.display = "none";
    if (y) y.style.display = "none";

    
    if (xM) xM.style.display = "none";
    if (yM) yM.style.display = "none";

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

    //
    document.addEventListener("click", (e) => {
      if (e.target.closest("#butonProfil")) {
        toggleDashboard(user);
      }
    });

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

async function toggleDashboard(user) {
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

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    document.getElementById("numeUser").textContent = data.usearname; 
 
    document.getElementById("emailUser").textContent = user.email;
  }

  document.getElementById("closeDashboard").addEventListener("click", () => {
    dashboardWrapper.remove();
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => window.location.reload());
  });
}

let dashboard = `
<div id="dashboardUser" class="bg-white border border-gray-100 rounded-[32px] p-4 text-center shadow-2xl min-w-[200px] relative overflow-hidden"> <!-- ------------ -->
    
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent pointer-events-none rounded-[32px]"></div> <!-- ------------ -->

    <div class="flex justify-end -mt-2 -mr-2 relative z-10"> <!-- ------------ -->
        <button id="closeDashboard" class="w-8 h-8 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition flex items-center justify-center shadow-sm"> <!-- ------------ -->
            ✕
        </button>
    </div>

    <div class="relative z-10"> <!-- ------------ -->
        <h2  id="numeUser" class=" text-[22px] font-semibold text-gray-900 mb-1 tracking-wide">John Doe</h2> <!-- ------------ -->
        <p id="emailUser" class="text-[13px] text-gray-400 mb-3">user@exemplu.com</p> <!-- ------------ -->

        <button id="logoutBtn" class="w-full h-[40px] bg-slate-900 text-white rounded-2xl hover:bg-red-600 transition shadow-md hover:shadow-lg active:scale-[0.98]"> <!-- ------------ -->
            Ieși din cont
        </button>
    </div>

</div>
`;

