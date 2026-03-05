const body = document.body;
const hourhand = document.querySelector(".hour");
const minutehand = document.querySelector(".minute");
const secondhand = document.querySelector(".second");
const modeswitch = document.querySelector(".mode-switch");

const digitalTimeEl = document.querySelector("#digital-time");
const digitalDateEl = document.querySelector("#digital-date");
const themeButtons = document.querySelectorAll(".theme-btn");

// The Theme
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

// Dark Mode
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

// To support the keyboard
modeswitch.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleDarkMode();
    }
});

// The analog hands and digital readout
const updateTime = () => {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours() % 12;

    const secToDeg = (seconds / 60) * 360;
    const minToDeg = ((minutes + seconds / 60) / 60) * 360;
    const hrToDeg = ((hours + minutes / 60) / 12) * 360;

    secondhand.style.transform = `rotate(${secToDeg}deg)`;
    minutehand.style.transform = `rotate(${minToDeg}deg)`;
    hourhand.style.transform = `rotate(${hrToDeg}deg)`;

    if (digitalTimeEl) {
        digitalTimeEl.textContent = new Intl.DateTimeFormat(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(date);
    }

    if (digitalDateEl) {
        digitalDateEl.textContent = new Intl.DateTimeFormat(undefined, {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "2-digit",
        }).format(date);
    }
};

// To start
setInterval(updateTime, 1000);
updateTime();