document.documentElement.classList.add("overflow-hidden");
const temaSalvata = localStorage.getItem("tema");
let strLoadigVideo;
if (temaSalvata === "dark") {
    document.documentElement.classList.add("dark");
    strLoadigVideo=`    <video
        class="absolute inset-0 w-[20%]  object-cover m-auto"
        autoplay
        muted
        playsinline
        preload="auto">
        <source src="/public/assets/video/loading_video_black.mp4" type="video/mp4">
    </video>`
} else {
    document.documentElement.classList.remove("dark");
       strLoadigVideo=`    <video
        class="absolute inset-0 w-[20%]  object-cover m-auto"
        autoplay
        muted
        playsinline
        preload="auto">
        <source src="/public/assets/video/SNJ (1).mp4" type="video/mp4">
    </video>`
}
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
// overlay.innerHTML=`

//     <img src="/public/assets/img/DarkLogo.svg" class="block m-auto w-[5%] " alt="">
// `
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