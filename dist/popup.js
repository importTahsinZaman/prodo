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

/******/ })()
;
//# sourceMappingURL=popup.js.map