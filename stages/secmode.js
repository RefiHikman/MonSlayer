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

// Random Number Generator
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Animation
function randomValues() {
    anime({
        targets: `.main-monster`,
        translateX: function () {
            return anime.random(-650, 650);
        },
        translateY: function () {
            return anime.random(-400, 250);
        },
        rotate: ".1turn",
        easing: "easeInElastic(1, .6)",
        duration: 800,
        complete: randomValues,
    });
}

// Health Variables
let count = 0;
let healthBar = document.querySelector(".health-bar");
let healthPoint = 100;
healthBar.style.width = `${healthPoint}%`;
let damage = 2;

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

    gameStarted();
}

// Start Button
let startBtn = document.querySelector(".start-btn");
let backBtn = document.querySelector(".back-btn");
let healthContainer = document.querySelector(".health-container");

startBtn.addEventListener("click", function gameStarted() {
    startBtn.classList.add("disappear");
    restartText.classList.add("disappear");
    backBtn.classList.add("disappear");
    healthContainer.classList.add("appear");

    // DELAY
    setTimeout(function () {
        let minutes = 60 * 0.16,
            timer = document.querySelector(".timer");
        startTimer(minutes, timer);

        mainMonster.style.visibility = "visible";
        mainMonster.style.opacity = "1";

        randomValues();
    }, 1000);
});

// Refresh EventListener
window.addEventListener("keyup", keyPress);
function keyPress(k) {
    if (k.key == "r" || k.key == "R") {
        window.location.reload();
    }
}

// Timer
function startTimer(duration, display) {
    let timer = duration,
        minutes,
        seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            damage = 0;
            anime.remove(".main-monster");
        }
    }, 1000);
}

// Responsive
let restartText = document.querySelector(".click-to-r");
let timer = document.querySelector(".timer");

function responsiveFunction(x) {
    if (x.matches) {
        restartText.innerText = "Click the timer to restart";
        timer.addEventListener("click", function () {
            window.location.reload();
        });
    }
}

let x = window.matchMedia("(max-width: 768px)");
responsiveFunction(x);
x.addListener(responsiveFunction);
