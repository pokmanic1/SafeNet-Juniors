import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db, onAuthStateChanged } from "../fierbase/firebase-init.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getToateDatele } from "../fierbase/auth.js";




const x = document.getElementById("ConecteazataID");
const y = document.getElementById("InregistreazataID");

const xM = document.getElementById("ConecteazataID_M");
const yM = document.getElementById("InregistreazataID_M");
let ancora = `/public/pages/dashbord/dashbord.elev.html`;
let stareaInterfetei = "light";

let date = getToateDatele();

onAuthStateChanged(auth, async (user) => {

  function buildDashboard(ancora) {
    return `
    <div id="dashboardUser" class="bg-white border border-gray-100 rounded-[32px] p-4 text-center shadow-2xl min-w-[200px] relative overflow-hidden">
        
        <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent pointer-events-none rounded-[32px]"></div>

        <div class="flex justify-end -mt-2 -mr-2 relative z-10">
            <button id="closeDashboard" class="w-8 h-8 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition flex items-center justify-center shadow-sm">
                ✕
            </button>
        </div>

        <div class="relative z-10">
            <h2 id="numeUser" class="text-[22px] font-semibold text-gray-900 mb-1 tracking-wide">...</h2>
            <p id="emailUser" class="text-[13px] text-gray-400 mb-3">...</p>
                
            ${sliderul}
            <div class="flex flex-col items-center gap-2">
            <a href='${ancora}' id="dashboardLink" class="w-full h-[30px] bg-slate-900 text-sm text-center flex items-center justify-center px-4 text-white rounded-2xl hover:bg-blue-600 transition shadow-md hover:shadow-lg active:scale-[0.98]">
                Clase
            </a>
            <button id="logoutBtn" class="w-full h-[30px] bg-slate-900 text-sm text-center  flex items-center justify-center px-4 text-white rounded-2xl hover:bg-red-600 transition shadow-md hover:shadow-lg active:scale-[0.98]">
                Ieși din cont
            </button>
        </div>
        </div>

    </div>
  `;
  }
  const sliderul = `

  
    <div class="my-2 sliderul">
      <label
        class="relative inline-block text-[17px] w-[4em] h-[2.2em] rounded-[30px] shadow-[0_0_10px_rgba(0,0,0,0.1)]">

       <input class="checkbox-toggle" type="checkbox" checked class="w-0 h-0 opacity-0 peer" />

        <span
          class="slider absolute inset-0 cursor-pointer bg-[#2a2a2a] transition duration-300 rounded-[30px] overflow-hidden">

          <div
            class="star star_1 absolute bg-white rounded-full w-[5px] h-[5px] left-[2.5em] top-[0.5em] transition-all duration-300">
          </div>
          <div
            class="star star_2 absolute bg-white rounded-full w-[5px] h-[5px] left-[2.2em] top-[1.2em] transition-all duration-300">
          </div>
          <div
            class="star star_3 absolute bg-white rounded-full w-[5px] h-[5px] left-[3em] top-[0.9em] transition-all duration-300">
          </div>

          <svg viewBox="0 0 16 16"
            class="cloud absolute w-[3.5em] -bottom-[1.4em] -left-[1.1em] opacity-0 transition-all duration-300">
            <path transform="matrix(.77976 0 0 .78395-299.99-418.63)" fill="#fff"
              d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925">
            </path>
          </svg>

        </span>
      </label>

      <style>
        /* Keep only what Tailwind can't replace */

        .slider::before {
          position: absolute;
          content: "";
          height: 1.2em;
          width: 1.2em;
          border-radius: 20px;
          left: 0.5em;
          bottom: 0.5em;
          transition: 0.4s;
          transition-timing-function: cubic-bezier(0.81, -0.04, 0.38, 1.5);
          box-shadow: inset 8px -4px 0px 0px #fff;
        }

        /* checked state */
        input:checked+.slider {
          background-color: #00a6ff;
        }

        input:checked+.slider::before {
          transform: translateX(1.8em);
          box-shadow: inset 15px -4px 0px 15px #ffcf48;
        }

        input:checked~.slider .star {
          opacity: 0;
        }

        input:checked~.slider .cloud {
          opacity: 1;
        }
      </style>
    </div>
`;
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
                      
                  ${sliderul}
                  <div class="flex flex-col items-center gap-2"> <!-- ------------ -->
                  <a href='${ancora}' id="dashboardLink" class="w-full h-[20px] bg-slate-900  text-center flex items-center justify-center px-4 text-white rounded-2xl hover:bg-blue-600 transition shadow-md hover:shadow-lg active:scale-[0.98]"> <!-- ------------ -->
                      Clase
                  </a>
                  <button id="logoutBtn" class="w-full   h-[40px] bg-slate-900 text-center flex items-center justify-center px-4 text-white rounded-2xl hover:bg-red-600 transition shadow-md hover:shadow-lg active:scale-[0.98]"> <!-- ------------ -->
                      Ieși din cont
                  </button>
              </div>
              </div>
          
          </div>
          `;



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
          
  
              ${sliderul}
            <a href='${ancora}' id="dashboardLink" class="w-[150px] h-[34px] mt-[4px]  flex items-center justify-center px-4 bg-blue-600 text-white text-[13px] rounded-2xl hover:bg-red-600 transition"> <!-- ------------ -->
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

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      let username = "";
      let role = "Elev";

      if (docSnap.exists()) {
        const data = docSnap.data();
        username = data.usearname;
        role = data.role;
        ancora = role === "Profesor"
          ? "/public/pages/dashbord/dashbord.html"
          : "/public/pages/dashbord/dashbord.elev.html";
      }

      dashboardWrapper.innerHTML = buildDashboard(ancora);
      document.body.appendChild(dashboardWrapper);

      document.getElementById("numeUser").textContent = username;
      document.getElementById("emailUser").textContent = user.email;

      document.getElementById("closeDashboard").addEventListener("click", () => {
        dashboardWrapper.remove();
      });

      document.getElementById("logoutBtn").addEventListener("click", () => {
        signOut(auth).then(() => window.location.reload());
      });
    }

document.addEventListener("change", (e) => {
    if (e.target.classList.contains("checkbox-toggle")) {
        console.log("state:", e.target.checked);

        if (e.target.checked) {
            stareaInterfetei = "light";
            document.body.classList.remove("dark");
            
        } else {
            stareaInterfetei = "dark";
            document.body.classList.add("dark");
            
        }
        console.log("stare interfață:", stareaInterfetei);
    }
}); 
 



  }
  else {
    console.log("conectează-te");
  }


});







// const menuBtn = document.getElementById('menuBtn');
// const mobileMenu = document.getElementById('mobileMenu');
// const iconOpen = document.getElementById('iconOpen');
// const iconClose = document.getElementById('iconClose');

// function setMenu(open) {
//   mobileMenu.classList.toggle('hidden', !open);
//   iconOpen.classList.toggle('hidden', open);
//   iconClose.classList.toggle('hidden', !open);
//   menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
// }

// menuBtn.addEventListener('click', () => {
//   const isOpen = !mobileMenu.classList.contains('hidden');
//   setMenu(!isOpen);
// });

// // Închide meniul când se schimbă la desktop
// window.addEventListener('resize', () => {
//   if (window.innerWidth >= 768) setMenu(false);
// });

// // Închide meniul când se apasă Escape
// window.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape') setMenu(false);
// });
