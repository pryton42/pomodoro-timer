const pomodoro = document.getElementById("pomodoro-timer");
const short = document.getElementById("short-timer");
const long = document.getElementById("long-timer");
const timers = document.querySelectorAll(".timer-display");
const session = document.getElementById("pomodoro-session");
const shortBreake = document.getElementById("short-breake");
const longBreake = document.getElementById("long-breake");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const timerMsg = document.getElementById("timer-message");
const button = document.querySelector(".button");

let currentTimer = null;
let myInterval = null;

function showDefaultTimer() {
  pomodoro.style.display = "block";
  short.style.display = "none";
  long.style.display = "none";
}

showDefaultTimer();

function hideAll() {
  timers.forEach((timer) => {
    timer.style.display = "none";
  });
}

session.addEventListener("click", () => {
  hideAll();

  pomodoro.style.display = "block";

  session.classList.add("active");
  shortBreake.classList.remove("active");
  longBreake.classList.remove("active");

  currentTimer = pomodoro;
});

shortBreake.addEventListener("click", () => {
  hideAll();

  short.style.display = "block";

  session.classList.remove("active");
  shortBreake.classList.add("active");
  longBreake.classList.remove("active");

  currentTimer = short;
});

longBreake.addEventListener("click", () => {
  hideAll();

  long.style.display = "block";

  session.classList.remove("active");
  shortBreake.classList.remove("active");
  longBreake.classList.add("active");

  currentTimer = long;
});

function startTimer(timerDisplay) {
  if (myInterval) {
    clearInterval(myInterval);
  }

  timerDuration = timerDisplay.getAttribute("data-duration").split(":")[0];

  let durationInMillseconds = timerDuration * 60 * 1000;
  let endTimestamp = Date.now() + durationInMillseconds;

  myInterval = setInterval(() => {
    const timeRemaining = new Date(endTimestamp - Date.now());

    if (timeRemaining <= 0) {
      clearInterval(myInterval);
      timerDisplay.textContent = "00:00";

      const alarm = new Audio(
        "https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav",
      );
      alarm.play();
    } else {
      const minutes = Math.floor(timeRemaining / 60000);
      const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      timerDisplay.textContent = formattedTime;
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  if (currentTimer) {
    startTimer(currentTimer);
    timerMsg.style.display = "none";
  } else {
    timerMsg.style.display = "block";
  }
});

stopBtn.addEventListener("click", () => {
  if (currentTimer) {
    clearInterval(myInterval);
  }
});
