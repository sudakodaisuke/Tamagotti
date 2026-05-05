const state = {
  hunger: 80,
  clean: 80,
  happy: 80,
  energy: 80,
};

const moodFace = document.getElementById("moodFace");
const statusText = document.getElementById("statusText");
const logList = document.getElementById("logList");

const bars = {
  hunger: document.getElementById("hungerBar"),
  clean: document.getElementById("cleanBar"),
  happy: document.getElementById("happyBar"),
  energy: document.getElementById("energyBar"),
};

const clamp = (n) => Math.max(0, Math.min(100, n));

function addLog(message) {
  const time = new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
  const li = document.createElement("li");
  li.textContent = `${time} - ${message}`;
  logList.prepend(li);

  while (logList.children.length > 8) {
    logList.removeChild(logList.lastChild);
  }
}

function averageStatus() {
  return (state.hunger + state.clean + state.happy + state.energy) / 4;
}

function updateMood() {
  const avg = averageStatus();

  if (avg >= 75) {
    moodFace.textContent = "😺";
    statusText.textContent = "ごきげん！";
  } else if (avg >= 50) {
    moodFace.textContent = "🙂";
    statusText.textContent = "まあまあ元気。";
  } else if (avg >= 25) {
    moodFace.textContent = "😵";
    statusText.textContent = "おせわが必要…";
  } else {
    moodFace.textContent = "💀";
    statusText.textContent = "かなり弱ってる！急いでおせわ！";
  }
}

function render() {
  Object.entries(bars).forEach(([key, bar]) => {
    bar.value = state[key];
  });
  updateMood();
}

function changeStats({ hunger = 0, clean = 0, happy = 0, energy = 0 }, log) {
  state.hunger = clamp(state.hunger + hunger);
  state.clean = clamp(state.clean + clean);
  state.happy = clamp(state.happy + happy);
  state.energy = clamp(state.energy + energy);
  addLog(log);
  render();
}

document.getElementById("feedBtn").addEventListener("click", () => {
  changeStats({ hunger: 20, clean: -6, happy: 5 }, "ごはんをあげた🍚");
});

document.getElementById("cleanBtn").addEventListener("click", () => {
  changeStats({ clean: 24, happy: 4 }, "きれいになってスッキリ🧼");
});

document.getElementById("playBtn").addEventListener("click", () => {
  changeStats({ happy: 22, energy: -10, hunger: -8, clean: -6 }, "いっぱい遊んだ🎉");
});

document.getElementById("sleepBtn").addEventListener("click", () => {
  changeStats({ energy: 26, hunger: -8 }, "ぐっすり眠った💤");
});

setInterval(() => {
  changeStats({ hunger: -5, clean: -4, happy: -3, energy: -4 }, "時間がたって、少しお世話が必要に…");
}, 6000);

addLog("たまごっちのお世話を始めよう！");
render();
