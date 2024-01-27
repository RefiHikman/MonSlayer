// DAMAGE
let damage = 3.5;

// BG MUSIC
let stageBGMusic = document.querySelector("#stage-bg-music");

// Check Previous Stage's State
startBtn.addEventListener("click", startGame);
function startGame() {
  stageBGMusic.play();
  startBtn.classList.add("disappear");
  backBtn.classList.add("disappear");
  restartText.classList.add("disappear");
  startBackdrop.classList.add("inactive");
  healthContainer.classList.add("appear");
  background.style.width = "150vw";
  background.style.height = "150vh";
  background.style.transition = "5s";

  // DELAY
  setTimeout(function () {
    let minutes = 60 * 0.16,
      timer = document.querySelector(".timer");
    startTimer(minutes, timer);

    timer.classList.add("appear");
    mainMonster.style.visibility = "visible";
    mainMonster.style.opacity = "1";
    setTimeout(function () {
      mainMonster.style.transition = "0.2s";
    }, 500);

    randomValues();
    backgroundMove();
  }, 1500);
}
let modalBackdrop = document.querySelector("#modal-backdrop");
let prevStage = localStorage.getItem("stage4");
if (prevStage) {
  modalBackdrop.classList.remove("active");
} else {
  startBtn.removeEventListener("click", startGame);
}

// Animation
function randomValues() {
  anime({
    targets: `.main-monster`,
    translateX: function () {
      return anime.random(-650, 650);
    },
    translateY: function () {
      return anime.random(-300, 250);
    },
    easing: "easeInElastic(1, .6)",
    duration: 850,
    complete: randomValues,
  });
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

    let finishModal = document.querySelector(".finish-modal");
    let finishBtns = document.querySelector(".finish-modal-btns");
    let slayedText = document.querySelector(".slayed-text");
    let nextStage = document.querySelector("#next-stage");

    // Game Finished FAILED
    if (--timer < 0 && healthPoint > 0) {
      timer = 0;
      damage = 0;
      anime.remove(".main-monster");
      slayedText.innerText = "YOU'RE SLAIN";
      finishModal.classList.add("show");

      anime({
        targets: ".main-monster",
        translateX: 0,
        translateY: 0,
        delay: 200,
      });

      setTimeout(function () {
        modalBackdrop.classList.add("active");

        setTimeout(function () {
          slayedText.classList.add("show");

          setTimeout(function () {
            finishBtns.classList.add("show");
            nextStage.style.display = "none";
          }, 1500);
        }, 800);
      }, 1500);
    }

    // Game Finished SUCCEED
    if (healthPoint <= 0) {
      timer = 0;
      damage = 0;
      anime.remove(".main-monster");
      finishModal.classList.add("show");

      anime({
        targets: ".main-monster",
        translateX: 0,
        translateY: 0,
      });
      anime({
        targets: ".main-monster",
        opacity: 0,
        delay: 800,
      });

      setTimeout(function () {
        modalBackdrop.classList.add("active");

        setTimeout(function () {
          slayedText.classList.add("show");

          setTimeout(function () {
            finishBtns.classList.add("show");
          }, 1500);
        }, 800);
      }, 1500);

      localStorage.setItem(`stage5`, true);
    }
  }, 1000);
}
