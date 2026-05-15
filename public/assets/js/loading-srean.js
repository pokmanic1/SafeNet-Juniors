document.documentElement.classList.add("overflow-hidden");

const overlay = document.createElement("div");

overlay.id = "loading-overlay";

overlay.className = `
    fixed inset-0
    z-[999999]
    bg-black
    flex items-center justify-center
    opacity-100
    transition-opacity duration-500
    `;

overlay.innerHTML = `
    <video
        class="absolute inset-0 w-full h-full object-cover"
        autoplay
        muted
        playsinline
        preload="auto">
        <source src="./video.mp4" type="video/mp4">
    </video>
    `;

document.documentElement.appendChild(overlay);

document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.classList.add("opacity-0");

        setTimeout(() => {
            overlay.remove();
            document.documentElement.classList.remove("overflow-hidden");
        }, 100);

    }, 250);
});