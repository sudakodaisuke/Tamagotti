const state = { hunger: 80, clean: 80, happy: 80, energy: 80 };
const logList = document.getElementById("logList");
const statusText = document.getElementById("statusText");
const pixelPet = document.getElementById("pixelPet");

const nums = {
  hunger: document.getElementById("hungerNum"),
  clean: document.getElementById("cleanNum"),
  happy: document.getElementById("happyNum"),
  energy: document.getElementById("energyNum"),
};

const clamp = (n) => Math.max(0, Math.min(100, n));

function log(msg) {
  const t = new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
  const li = document.createElement("li");
  li.textContent = `${t} - ${msg}`;
  logList.prepend(li);
  while (logList.children.length > 10) logList.lastChild.remove();
}

function avg() { return (state.hunger + state.clean + state.happy + state.energy) / 4; }

function updateMood() {
  const a = avg();
  if (a >= 75) {
    pixelPet.textContent = "ᗢ";
    statusText.textContent = "ごきげん！";
  } else if (a >= 50) {
    pixelPet.textContent = "•ᴥ•";
    statusText.textContent = "ふつう";
  } else if (a >= 25) {
    pixelPet.textContent = "x_x";
    statusText.textContent = "おせわして！";
  } else {
    pixelPet.textContent = "✖﹏✖";
    statusText.textContent = "ピンチ…！";
  }
}

function render() {
  Object.keys(nums).forEach((k) => nums[k].textContent = state[k]);
  updateMood();
}

function change(delta, message) {
  Object.keys(state).forEach((k) => state[k] = clamp(state[k] + (delta[k] ?? 0)));
  log(message);
  render();
}

document.querySelector('[data-action="feed"]').onclick = () => change({ hunger: 20, happy: 5, clean: -6 }, "ごはんタイム");
document.querySelector('[data-action="clean"]').onclick = () => change({ clean: 22, happy: 3 }, "おふろでさっぱり");
document.querySelector('[data-action="play"]').onclick = () => change({ happy: 24, energy: -10, hunger: -8 }, "ミニゲームで遊んだ");
document.getElementById("sleepBtn").onclick = () => change({ energy: 26, hunger: -6 }, "ねむって回復");

setInterval(() => change({ hunger: -4, clean: -3, happy: -2, energy: -4 }, "時間経過でステータスが減った"), 6500);

log("Tamagotti 起動");
render();
