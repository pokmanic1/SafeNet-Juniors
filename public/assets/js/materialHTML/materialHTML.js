export function buildHeader() {
    const headerStr = `
    <header class="w-full sticky top-0 left-0 z-10 bg-white dark:bg-neutral-900 border-b border-gray-300 dark:border-neutral-800">
        <div class="mx-[10px] md:mx-[30px] lg:mx-[40px] max-w-full px-6 py-3 flex items-center justify-between">
            <a href="/public/index.html" class="flex items-center gap-3">
                <img class="object-contain w-20 dark:brightness-110" src="/public/assets/img/Logo.svg" alt="SafeNet Junior">
            </a>

            <nav class="absolute items-center hidden gap-12 font-semibold transform -translate-x-1/2 md:flex left-1/2">
                <a class="hover:text-gray-700 dark:hover:text-gray-300" href="/public/pages/games.html">Jocuri</a>
                <a class="hover:text-gray-700 dark:hover:text-gray-300" href="/public/pages/assessment.html">Teste</a>
            </nav>

            <div class="items-center hidden gap-10 font-semibold md:flex">
                <a id="ConecteazataID" class="hover:text-gray-700 dark:hover:text-gray-300" href="/public/pages/conecteazate.html">Conectare</a>
                <a id="InregistreazataID" class="hover:text-gray-700 dark:hover:text-gray-300" href="/public/pages/inregistreazate.html">Înregistrare</a>
            </div>

            <button id="menuBtn" class="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800">
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
                <a class="block py-2 hover:text-gray-700 dark:hover:text-gray-300" href="/public/pages/games.html">Jocuri</a>
                <a class="block py-2 hover:text-gray-700 dark:hover:text-gray-300" href="/public/pages/assessment.html">Teste</a>
                <div class="h-px bg-gray-200 dark:bg-neutral-800"></div>

                <!-- ✅ ID-urile mobile — esențiale pentru dashboard.js -->
                <a id="InregistreazataID_M" class="block py-2 hover:text-gray-700 dark:hover:text-gray-300" href="/public/pages/inregistreazate.html">Înregistrare</a>
                <a id="ConecteazataID_M" class="block py-2 hover:text-gray-700 dark:hover:text-gray-300" href="/public/pages/conecteazate.html">Conectare</a>
            </div>
        </div>
    </header>`;

    const container = document.querySelector('.header');
    container.innerHTML = headerStr;

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

buildHeader();