/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
let time = 0; // in seconds
var testInterval = null; // interval

function update_timer() {
  if (time > 0) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    chrome.storage.sync.set({ test: `${minutes}:${seconds}` });
    time--;
  } else {
    chrome.storage.sync.set({ test: `00:00` });
    clearInterval(testInterval);
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.sync.get(["test"], (result) => {
    time = result.test * 60;
  });
  testInterval = setInterval(update_timer, 1000);
  sendResponse({ msg: "started timer" });
});

/******/ })()
;
//# sourceMappingURL=background.js.map