const body = document.body;
const hourhand = document.querySelector(".hour");
const minutehand = document.querySelector(".minute");
const secondhand = document.querySelector(".second");
const modeswitch = document.querySelector(".mode-switch");

const digitalTimeEl = document.querySelector("#digital-time");
const digitalDateEl = document.querySelector("#digital-date");
const themeButtons = document.querySelectorAll(".theme-btn");

/* ---------------- THEME SYSTEM ---------------- */

const setTheme = (theme) => {
    body.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    themeButtons.forEach((btn) => {
        btn.classList.toggle("is-active", btn.dataset.theme === theme);
    });
};

setTheme(localStorage.getItem("theme") || "ocean");

themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => setTheme(btn.dataset.theme));
});

/* ---------------- DARK MODE ---------------- */

if (localStorage.getItem("mode") === "dark") {
    body.classList.add("dark");
    modeswitch.textContent = "Light Mode";
}

const toggleDarkMode = () => {
    const isDarkMode = body.classList.toggle("dark");
    modeswitch.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    localStorage.setItem("mode", isDarkMode ? "dark" : "light");
};

modeswitch.addEventListener("click", toggleDarkMode);
modeswitch.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleDarkMode();
    }
});

/* ---------------- SMOOTH CLOCK ENGINE ---------------- */

function updateClock() {
    const now = new Date();

    const milliseconds = now.getMilliseconds();
    const seconds = now.getSeconds() + milliseconds / 1000;
    const minutes = now.getMinutes() + seconds / 60;
    const hours = (now.getHours() % 12) + minutes / 60;

    const secDeg = (seconds / 60) * 360;
    const minDeg = (minutes / 60) * 360;
    const hrDeg = (hours / 12) * 360;

    secondhand.style.transform = `rotate(${secDeg}deg)`;
    minutehand.style.transform = `rotate(${minDeg}deg)`;
    hourhand.style.transform = `rotate(${hrDeg}deg)`;

    if (digitalTimeEl) {
        digitalTimeEl.textContent = new Intl.DateTimeFormat(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(now);
    }

    if (digitalDateEl) {
        digitalDateEl.textContent = new Intl.DateTimeFormat(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "2-digit",
        }).format(now);
    }

    requestAnimationFrame(updateClock);
}

updateClock();