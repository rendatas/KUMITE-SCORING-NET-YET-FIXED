let countdown;
let remainingTime = 180;
let isPaused = false;

// Tombol dan elemen
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const durationSelect = document.getElementById("duration");
const customTimeContainer = document.getElementById("custom-time");
const customMinutesInput = document.getElementById("custom-minutes");
const customSecondsInput = document.getElementById("custom-seconds");
const countdownDisplay = document.getElementById("countdown");

// Listener untuk pilihan durasi
durationSelect.addEventListener("change", () => {
  if (durationSelect.value === "custom") {
    customTimeContainer.style.display = "block";
  } else {
    customTimeContainer.style.display = "none";
    remainingTime = parseInt(durationSelect.value);
    updateTimerDisplay(remainingTime);
  }
});

// Fungsi untuk memulai timer
startButton.addEventListener("click", () => {
  if (!isPaused) {
    if (durationSelect.value === "custom") {
      const customMinutes = parseInt(customMinutesInput.value) || 0;
      const customSeconds = parseInt(customSecondsInput.value) || 0;
      remainingTime = customMinutes * 60 + customSeconds;
    }
  }

  startTimer();
  startButton.disabled = true;
  stopButton.disabled = false;
});

// Fungsi untuk memulai countdown
function startTimer() {
  countdown = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(countdown);
      return;
    }
    remainingTime--;
    updateTimerDisplay(remainingTime);
  }, 1000);
}

// Fungsi untuk menghentikan timer
stopButton.addEventListener("click", () => {
  clearInterval(countdown);
  startButton.disabled = false;
  stopButton.disabled = true;
});

// Fungsi untuk memperbarui tampilan waktu
function updateTimerDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  countdownDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

// Score Functions
function updateScore(player, points) {
  const playerScoreElement = document.getElementById(`${player}-score`);
  let currentScore = parseInt(playerScoreElement.textContent);
  currentScore += points;
  playerScoreElement.textContent = currentScore;
}

// Sensu Button Function
function toggleSensu(player) {
  const sensuButton = document.getElementById(`sensu-${player}`);
  const currentColor = sensuButton.style.color;

  if (currentColor === "green") {
    sensuButton.style.color = ""; // Reset
  } else {
    sensuButton.style.color = "green"; // Activate Sensu
  }
}

// Penalty Functions
function updatePenalty(player, penalty) {
  const penaltyDisplay = document.getElementById(`${player}-penalties`);
  const penaltyElement = document.createElement("div");
  penaltyElement.textContent = penalty;
  penaltyElement.classList.add("penalty");
  penaltyDisplay.appendChild(penaltyElement);
}

function resetPlayer(player) {
  const playerScoreElement = document.getElementById(`${player}-score`);
  playerScoreElement.textContent = "0";
  const penaltyDisplay = document.getElementById(`${player}-penalties`);
  penaltyDisplay.innerHTML = "";
}
