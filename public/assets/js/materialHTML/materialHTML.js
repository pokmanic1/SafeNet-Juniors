//----------------------------------------------------------------------------------------------------------------------
//Pagina genereaza acelasi footer si header in toate paginiile
//-----------------------------------------------------------------------------------------------




let logo;
if (localStorage.getItem("tema") === "dark") {
  logo = '/assets/img/logo-dark-mode.svg';
}
else {
  logo = '/assets/img/Logo.svg';
}


//----------------------------------------------------------------------------------------------------------------------
//Functia pentru genereare a Headerului
//-----------------------------------------------------------------------------------------------

function buildHeader() {
  const headerStr = `
      <header class="w-full bg-white dark:bg-[#1A1C26] border-b border-gray-300 dark:border-[#4C5074] z-20">  
            <div class="mx-[10px] md:mx-[30px] lg:mx-[40px] max-w-full px-6 py-3 flex items-center justify-between">
            <a href="/index.html" class="flex items-center gap-3">
                <img class="logo object-contain w-[90px] dark:brightness-110" src="${logo}" alt="SafeNet Junior">
            </a>

            <nav class="absolute items-center hidden gap-12 font-semibold transform -translate-x-1/2 md:flex left-1/2">
                <a class="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300" href="/pages/games.html">Jocuri</a>
                <a class="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300" href="/pages/assessment/assessment.html">Teste</a>
            </nav>

            <div class="items-center hidden gap-10 font-semibold md:flex">
                <a id="ConecteazataID" class="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300" href="/pages/conecteazate.html">Conectare</a>
                <a id="InregistreazataID" class="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300" href="/pages/inregistreazate.html">Înregistrare</a>
            </div>

            <button id="menuBtn" class="md:hidden p-2 rounded-xl text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
                <svg id="iconOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg id="iconClose" xmlns="http://www.w3.org/2000/svg" class="hidden w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        
        <div id="mobileMenu" class="hidden bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 md:hidden">
            <div class="px-6 py-4 space-y-3 font-semibold">
                <a class="block py-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300" href="/pages/games.html">Jocuri</a>
                <a class="block py-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300" href="/pages/assessment/assessment.html">Teste</a>
                <div class="h-px bg-gray-200 dark:bg-neutral-800"></div>
                <a id="InregistreazataID_M" class="block py-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300" href="/pages/inregistreazate.html">Înregistrare</a>
                <a id="ConecteazataID_M" class="block py-2 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300" href="/pages/conecteazate.html">Conectare</a>
            </div>
        </div>
    </header>`;

  const container = document.querySelector('.header');
  container.innerHTML = headerStr;


  //----------------------------------------------------------------------------------------------------------------------
//Pentru divesurile mai mici de 768 icon dashbord sau butoanele conectare inregistrare dispar 
// si apare iconita burger care contine toate detaliile
//-----------------------------------------------------------------------------------------------

  // Logica meniului mobil
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconOpen = document.getElementById('iconOpen');
  const iconClose = document.getElementById('iconClose');

  function setMenu(open) {
    mobileMenu.classList.toggle('hidden', !open);
    iconOpen.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    setMenu(!isOpen);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) setMenu(false);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });
}


//----------------------------------------------------------------------------------------------------------------------
//Functia pentru genereare a Footerului
//-----------------------------------------------------------------------------------------------

function buildFooter() {
  const footer = `
          <section
    class="flex flex-col items-center justify-center w-full bg-white  dark:bg-[#1A1C26] subsol ">
    <div class="w-[85%] mx-auto px-2 md:px-[100px] py-16">

      <div class="flex flex-col gap-12 md:flex-row md:justify-between md:items-start">

        <div class="md:w-[40%]">
          <h1 class="text-2xl font-semibold dark:text-white">SafeNet Junior</h1>
          <p class="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
            Platformă educațională pentru siguranța online, dedicată elevilor din ciclul primar.
          </p>
          <p class="mt-3 leading-relaxed text-gray-600 dark:text-gray-400">
            Instituție vizată: <span class="font-medium text-gray-900 dark:text-gray-100">Școala Primară „Alexandru
              Donici”, Cahul</span>
          </p>
        </div>


        <div class="grid grid-cols-1 sm:grid-cols-2">

          <div>
            <h2 class="font-semibold text-gray-900 dark:text-white">Navigare</h2>
            <ul class="mt-3 space-y-2 text-gray-600 dark:text-gray-400">
              <li><a class="hover:text-gray-900 dark:hover:text-white" href="/index.html">Acasă</a></li>
              <li><a class="hover:text-gray-900 dark:hover:text-white" href="/pages/assessment/assessment.html">Teste</a></li>
              <li><a class="hover:text-gray-900 dark:hover:text-white" href="/pages/games.html">Jocuri</a></li>
              <li><a class="hover:text-gray-900 dark:hover:text-white" href="/pages/about.html">Despre noi</a></li>
            </ul>
          </div>


          <div>
            <h2 class="font-semibold text-gray-900 dark:text-white">Contact</h2>
            <div class="mt-3 space-y-2 text-gray-600 dark:text-gray-400">
              <p>
                <span class="font-medium text-gray-900 dark:text-gray-200">Email:</span>
                <a class="underline hover:text-gray-900 dark:hover:text-white"
                  href="mailto:scoalaprimaradonici@gmail.com">scoalaprimaradonici@gmail.com</a>
              </p>
              <p>
                <span class="font-medium text-gray-900 dark:text-gray-200">Adresă:</span>
                Școala Primară „Alexandru Donici”, Cahul, Republica Moldova
              </p>
            </div>
          </div>

        </div>
      </div>


      <div class="mt-12">
        <h2 class="mb-3 font-semibold text-gray-900 dark:text-white">Locație</h2>
        <div class="w-full overflow-hidden border border-gray-200 dark:border-neutral-800 rounded-2xl">
          <iframe title="Harta - Școala Primară Alexandru Donici, Cahul"
            src="https://www.google.com/maps?q=%C8%98coala%20Primar%C4%83%20Alexandru%20Donici%20Cahul&output=embed"
            width="100%" height="280" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen class="dark:opacity-80 dark:invert-[0.85] dark:hue-rotate-180">
          </iframe>
        </div>
      </div>


      <div class="pt-6 mt-10 text-sm text-gray-600 border-t border-gray-200 dark:text-gray-500 dark:border-neutral-800">
        <p class="leading-relaxed">
          Acest website a fost realizat în cadrul competiției „Tekwill Junior Ambassadors” organizată de proiectul
          „Tekwill în Fiecare Școală” și nu reflectă neapărat opinia proiectului.
        </p>
        <p class="mt-2">© 2026 SafeNet Junior.</p>
      </div>
    </div>
  </section>
    `;
  if (document.querySelector('.footer')) {
    document.querySelector('.footer').innerHTML = footer;
  }

}





buildHeader();
buildFooter();




