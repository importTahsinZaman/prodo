/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
var current_pet = "";
var current_pet_name = "";
var current_pet_level = 1;
var current_pet_xp = 0;
var current_pet_evo = "evo1";
var current_pet_gif = "";

getData();

async function getData() {
  //Load In Data
  chrome.storage.sync.get(["current_pet"], (result1) => {
    current_pet = result1.current_pet;
    chrome.storage.sync.get([`${current_pet}`], (result2) => {
      current_pet_level = result2[current_pet].level;
      current_pet_name = result2[current_pet].name;
      current_pet_xp = result2[current_pet].current_xp;
      if (current_pet_level >= 60) {
        current_pet_evo = "evo3";
      } else if (current_pet_level >= 30) {
        current_pet_evo = "evo2";
      }
      current_pet_gif = `${current_pet}_${current_pet_evo}`;
    });
  });
}

window.onload = function () {
  //Take Care of all data-driven processes such as rendering the pet, updating level/xp
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var url = tabs[0].url.toString();

    const pet = document.getElementById("pet");

    if (!url.includes("https://classroom.google.com/")) {
      pet.src = chrome.runtime.getURL(`assets/Pets/${current_pet_gif}.gif`);
    } else {
      pet.style.zIndex = -1000;
    }
  });

  const name_text = document.getElementById("name");
  const level_text = document.getElementById("level");
  const xp_progress_text = document.getElementById("xp_progress");
  const xp_status = document.getElementById("xp_status");

  name_text.innerHTML = current_pet_name;
  level_text.innerHTML = `Level:${current_pet_level}`;
  xp_progress_text.innerHTML = `${current_pet_xp}/${getNeededXp(
    current_pet_level + 1
  )}`;
  xp_status.style.width = `${
    (current_pet_xp / getNeededXp(current_pet_level + 1)) * 100
  }%`;
};

function getNeededXp(target_level) {
  return Math.floor(56 * target_level ** 1.1);
}

function setData() {
  chrome.storage.sync.set({ owned_pets: ["f001", "f002"] });
  chrome.storage.sync.set({ current_pet: "f003" });
  chrome.storage.sync.set({
    f001: {
      name: "bruh",
      level: 1,
      current_xp: 0,
      needed_xp: getNeededXp(2),
    },
    f002: {
      name: "bruh2",
      level: 1,
      current_xp: 0,
      needed_xp: getNeededXp(2),
    },
    f003: {
      name: "bruh3",
      level: 1,
      current_xp: 0,
      needed_xp: getNeededXp(2),
    },
  });
}

/******/ })()
;
//# sourceMappingURL=popup.js.map