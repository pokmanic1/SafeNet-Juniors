import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db, onAuthStateChanged } from "../fierbase/firebase-init.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const x = document.getElementById("ConecteazataID");
const y = document.getElementById("InregistreazataID");

const xM = document.getElementById("ConecteazataID_M");
const yM = document.getElementById("InregistreazataID_M");
let ancora = `/public/pages/dashbord/dashbord.elev.html`;



onAuthStateChanged(auth, async (user) => {
  if (user) {
    let role;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {

      const data = userSnap.data();

      if (data.role === "Profesor") {
        role = "Profesor";
        ancora = "/public/pages/dashbord/dashbord.html";
      } else {
        role = "Elev";
        ancora = "/public/pages/dashbord/dashbord.elev.html";
      }

    }
    console.log("ROL:", role);
    console.log("ancora:", ancora);





    if (x) x.style.display = "none";
    if (y) y.style.display = "none";
    if (xM) xM.style.display = "none";
    if (yM) yM.style.display = "none";
    if (!document.getElementById("butonProfil")) {
      const userBtn = document.createElement("div");
      userBtn.className = "flex items-center";
      userBtn.innerHTML = `
    <button type="button" id="butonProfil"
      class="flex items-center justify-center w-10 h-10 rounded-full border-black border-[1px] bg-white overflow-hidden">
      <img class="w-full h-full object-cover" src="../../../../public/assets/img/Icon.png" alt="Profil">
    </button>
  `;

      if (x) x.parentNode.insertBefore(userBtn, x.nextSibling);
    }
    if (xM) {
      const userInfoMobile = document.createElement("div");
      userInfoMobile.className = "flex items-center gap-3 py-2";
      userInfoMobile.id = "mobileUserInfo";
      userInfoMobile.innerHTML = `
        <div class="flex justify-center items-center  flex-col mx-auto">
          <span id="numeUserMobile" class="text-[14px] font-semibold text-gray-900">...</span>
          <span id="emailUserMobile" class="text-[12px] mt-[5px]  text-gray-400">${user.email}</span>
            <a href='${ancora}' id="dashboardLink" class="w-[150px] h-[34px] mt-[10px]  flex items-center justify-center px-4 bg-blue-600 text-white text-[13px] rounded-2xl hover:bg-red-600 transition"> <!-- ------------ -->
              Clase
            </a>
          <button id="logoutBtnMobile"
            class="h-[34px] mt-[10px] w-[150px]   flex items-center justify-center px-4 bg-red-600 text-white text-[13px] rounded-2xl hover:bg-red-600 transition">
            Ieși din cont
          </button></div>
        
      `;
      xM.parentNode.insertBefore(userInfoMobile, xM.nextSibling);

      const docRef = doc(db, "users", user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const el = document.getElementById("numeUserMobile");
          if (el) el.textContent = data.usearname;
        }
      });

      document.getElementById("logoutBtnMobile").addEventListener("click", () => {
        signOut(auth).then(() => window.location.reload());
      });
    }

    document.addEventListener("click", (e) => {
      if (e.target.closest("#butonProfil")) toggleDashboard(user);
    });

    console.log(`Bună ziua, ${user.email}`);



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
      <div class="flex flex-col items-center gap-2"> <!-- ------------ -->
        <a href='${ancora}' id="dashboardLink" class="w-full h-[40px] bg-slate-900  text-center flex items-center justify-center px-4 text-white rounded-2xl hover:bg-blue-600 transition shadow-md hover:shadow-lg active:scale-[0.98]"> <!-- ------------ -->
            Clase
        </a>
        <button id="logoutBtn" class="w-full   h-[40px] bg-slate-900 text-center flex items-center justify-center px-4 text-white rounded-2xl hover:bg-red-600 transition shadow-md hover:shadow-lg active:scale-[0.98]"> <!-- ------------ -->
            Ieși din cont
        </button>
    </div>
    </div>

</div>
`;
  }
  else {
    console.log("conectează-te");
  }


});
