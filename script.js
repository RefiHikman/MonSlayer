// BG Music
let bgMusic = document.querySelector("#bg-music");
let audioControl = document.querySelector(".audio-control");
let volumeActive = document.querySelector(".volume-active");
let volumeInactive = document.querySelector(".volume-inactive");

window.onload = function () {
    bgMusic.play();
    if (bgMusic.paused) {
        volumeInactive.style.display = "block";
        volumeActive.style.display = "none";
    } else {
        volumeInactive.style.display = "none";
        volumeActive.style.display = "block";
    }
};

audioControl.addEventListener("click", audioPausePlay);
function audioPausePlay() {
    if (!bgMusic.paused) {
        bgMusic.pause();
        volumeInactive.style.display = "block";
        volumeActive.style.display = "none";
    } else {
        bgMusic.play();
        volumeInactive.style.display = "none";
        volumeActive.style.display = "block";
    }
}

// Mouse Trail
let trailer = document.querySelector(".trailer");

window.onmousemove = (e) => {
    const x = e.clientX - trailer.offsetWidth / -5,
        y = e.clientY - trailer.offsetHeight / -5;

    const keyframes = {
        transform: `translate(${x}px, ${y}px)`,
    };

    trailer.animate(keyframes, {
        duration: 8000,
        fill: "forwards",
    });
};

// Animation
anime({
    targets: `.svg`,
    scale: 0.5,
    easing: "easeInElastic(1, .6)",
    duration: 1000,
    direction: "alternate",
    loop: true,
});

// Modal
let stageModal = document.querySelector(".stage-modal");
let playBtn = document.querySelector(".play-btn");
let closeBtn = document.querySelector(".close");
let modalBackdrop = document.querySelector("#modal-backdrop");

playBtn.addEventListener("click", function () {
    stageModal.classList.add("show");
    modalBackdrop.classList.add("active");
});

closeBtn.addEventListener("click", function () {
    stageModal.classList.remove("show");
    modalBackdrop.classList.remove("active");
});

// Check Stages State
let stage1 = localStorage.getItem("stage1");
let stage2 = localStorage.getItem("stage2");
let stage3 = localStorage.getItem("stage3");
let stage4 = localStorage.getItem("stage4");
let stage5 = localStorage.getItem("stage5");
let stage6 = localStorage.getItem("stage6");
let stage7 = localStorage.getItem("stage7");
let stage8 = localStorage.getItem("stage8");
let stage9 = localStorage.getItem("stage9");
let stage10 = localStorage.getItem("stage10");

let stagesState = [
    stage1,
    stage2,
    stage3,
    stage4,
    stage5,
    stage6,
    stage7,
    stage8,
    stage9,
];

console.log(stagesState);

// Stage OnClick
let stages = Array.from(document.getElementsByClassName("stage"));
let wipe = document.querySelector(".wipe");

stages.map(() => {
    for (let i = 0; i < stages.length; i++) {
        if (stagesState[i]) {
            stages[i + 1].classList.remove("stage-none");

            stages[i + 1].addEventListener("click", (e) => {
                wipe.classList.add("unwipe");

                for (let i = 0; i < stages.length; i++) {
                    switch (e.target) {
                        case stages[i]:
                            setTimeout(function () {
                                location.href = `stages/${i + 1}/stage${
                                    i + 1
                                }.html`;
                            }, 1000);
                            break;
                        default:
                    }
                }
            });
        }
    }
});

// First Stage
let firstStage = document.querySelector(".first-stage");
firstStage.addEventListener("click", () => {
    wipe.classList.add("unwipe");
    setTimeout(function () {
        location.href = `stages/1/stage1.html`;
    }, 1000);
});
