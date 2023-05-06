// Mouse Trail
// let trailer = document.querySelector(".trailer");

// window.onmousemove = (e) => {
//     const x = e.clientX - trailer.offsetWidth / -5,
//         y = e.clientY - trailer.offsetHeight / -5;

//     const keyframes = {
//         transform: `translate(${x}px, ${y}px)`,
//     };

//     trailer.animate(keyframes, {
//         duration: 8000,
//         fill: "forwards",
//     });
// };

// Background
let background = document.querySelector(".background");
function backgroundMove() {
    window.onmousemove = (e) => {
        const mouseX = e.clientX,
            mouseY = e.clientY;

        const xDecimal = mouseX / window.innerWidth,
            yDecimal = mouseY / window.innerHeight;

        const maxX = background.offsetWidth - window.innerWidth,
            maxY = background.offsetHeight - window.innerHeight;

        const panX = maxX * xDecimal * -1,
            panY = maxY * yDecimal * -1;

        background.animate(
            {
                transform: `translate(${panX}px, ${panY}px)`,
            },
            {
                duration: 4000,
                fill: "forwards",
                easing: "ease",
            }
        );
    };
}

// Random Number Generator
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Health Variables
let count = 0;
let healthBar = document.querySelector(".health-bar");
let healthPoint = 100;
healthBar.style.width = `${healthPoint}%`;

// Start DOM
let startBtn = document.querySelector(".start-btn");
let backBtn = document.querySelector(".back-btn");
let healthContainer = document.querySelector(".health-container");
let restartText = document.querySelector(".click-to-r");
let startBackdrop = document.querySelector("#start-backdrop");

// Mouse Click EventListener
let mainMonster = document.querySelector(".main-monster");

mainMonster.addEventListener("click", mouseClick);
function mouseClick() {
    count += 1;
    healthPoint -= damage;
    healthBar.style.width = `${healthPoint}%`;
    healthBar.classList.add("monster-clicked");
    setTimeout(function () {
        healthBar.classList.remove("monster-clicked");
    }, 100);
}

// Refresh EventListener
window.addEventListener("keyup", keyPress);
function keyPress(k) {
    if (k.key == "r" || k.key == "R") {
        window.location.reload();
    }
}
