//----------------------------------------------------------------------------------------------------------------------
//primele milisecunde din pagina apare un video care dureaza pana se incarca tot JS si se genereaza toate paginiile HTML
//----------------------------------------------------------------------------------------------------------------------


document.documentElement.classList.add("overflow-hidden");
const temaSalvata = localStorage.getItem("tema");
let strLoadigVideo;



//----------------------------------------------------------------------------------------------------------------------
//genreaza video alb sau negru 
//----------------------------------------------------------------------------------------------------------------------




if (temaSalvata === "dark") {
    document.documentElement.classList.add("dark");
    strLoadigVideo = `    <video
        class="absolute inset-0 w-[20%]  object-cover m-auto"
        autoplay
        muted
        playsinline
        preload="auto">
        <source src="/public/assets/video/loading_video_black.mp4" type="video/mp4">
    </video>`
} else {
    document.documentElement.classList.remove("dark");
    strLoadigVideo = `    <video
        class="absolute inset-0 w-[20%]  object-cover m-auto"
        autoplay
        muted
        playsinline
        preload="auto">
        <source src="/public/assets/video/SNJ (1).mp4" type="video/mp4">
    </video>`
}


//----------------------------------------------------------------------------------------------------------------------
//creaza elementul adauga clasele tailwind si il insereaza in pagina
//----------------------------------------------------------------------------------------------------------------------



const overlay = document.createElement("div");

overlay.id = "loading-overlay";

overlay.className = `
    fixed inset-0
    z-[999999]
    bg-white
    dark:bg-black
    flex items-center justify-center
    opacity-100
    transition-opacity duration-500
    `;

overlay.innerHTML = strLoadigVideo;


document.documentElement.appendChild(overlay);

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.classList.add("opacity-0");

        setTimeout(() => {
            overlay.remove();
            document.documentElement.classList.remove("overflow-hidden");
        }, 200);

    }, 500);
});