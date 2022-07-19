/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
window.onload = function () {
  var url = "";
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    url = tabs[0].url.toString();

    const pet = document.getElementById("pet");

    if (!url.includes("https://classroom.google.com/")) {
      pet.src = chrome.runtime.getURL("assets/Pets/bunny_evo1.gif");
    } else {
      pet.style.zIndex = -1000;
    }
  });
};

function getNeededXp(current_level) {
  return 56 * current_level ** 1.1;
}

function setData() {
  chrome.storage.sync.set({ owned_pets: ["f001"] });
  chrome.storage.sync.set({ current_pet: "f001" });
  chrome.storage.sync.set({
    f001: {
      name: "bruh",
      level: 1,
      current_xp: 0,
      needed_xp: getNeededXp(1),
    },
  });
}

/******/ })()
;
//# sourceMappingURL=popup.js.map