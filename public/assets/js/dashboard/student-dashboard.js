import { auth, onAuthStateChanged } from "../fierbase/firebase-init.js";
console.log(auth)
const x = document.getElementById("ConecteazataID");
const y = document.getElementById("InregistreazataID");

onAuthStateChanged(auth, (user) => {
    if (user) {
        x.innerHTML = `
        <div class="flex items-center">
            <button  type="button" class="butonDashboard w-8 h-8 rounded-[40px] bg-black border-0" ></button>
        </div>`;
        y.style.display = "none";


        console.log(`Bună ziua, ${user.email}`)
    } else {
        console.log('conecteazate');
    }
});


const dashboard = `
   <div id="dashboardUser" class="bg-[#7AB5D3] p-[6px] rounded-[40px] w-[480px] relative">

      <div class="absolute top-[15px] right-[15px]">
        <button id="closeDashboard" class="inchidere_b w-[40px] h-[40px] rounded-full bg-blue-600 text-white flex items-center justify-center text-xl">
          <img class="w-[70%] " src=""  alt="">
        </button>
      </div>

      <div class="my-[20px] mx-[10px]">

        <h3 id="emailUser" class="text-center text-[18px]">
          Nume-awcasc@elev.cihcahul.md
        </h3>

        <h3 class="text-center mt-[5px] text-[20px] font-medium">
          Username
        </h3>

        <div
          class="relative w-[90px] h-[90px] bg-[E3E3E3] rounded-full mt-[20px] mx-auto flex items-center justify-center bg-white">
          <img src="../assets/img/img-patrat-la-iconita-profil/Icons.png" alt="" class="w-[70%] my-auto">

          <div
            class="absolute bottom-0 right-0 w-[30px] h-[30px] bg-sky-200 rounded-full flex items-center justify-center text-[14px]">
            <img src="../assets/img/img-patrat-la-iconita-profil/Camera.svg" alt="" class="w-[70%] my-auto">
          </div>
        </div>

        <div class="w-[420px] h-[80px] flex justify-center items-center p-[10px] mt-[25px] gap-[15px] bg-[#93CCE9] rounded-[25px] mx-auto">

          <div class="w-[190px] h-[55px] bg-white  rounded-[15px] flex items-center justify-center gap-[8px]">
            <img src="../assets/img/img-patrat-la-iconita-profil/Setari.png" alt="" class="w-[30px]  my-auto"> Setări
          </div>

          <div class="w-[190px] h-[55px] bg-white  rounded-[15px] flex items-center justify-center gap-[8px]">
            <img src="../assets/img/img-patrat-la-iconita-profil/Vector.png" alt="" class="w-[30px]  my-auto"> Ieși
          </div>

        </div>

      </div>

    </div>
`;