/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getNeededXp": () => (/* binding */ getNeededXp),
/* harmony export */   "setData": () => (/* binding */ setData)
/* harmony export */ });
function getNeededXp(target_level) {
  return Math.floor(56 * target_level ** 1.1);
}

function setData() {
  chrome.storage.sync.set({ timer_running: false });
  chrome.storage.sync.set({ time_remaining: 0 });
  chrome.storage.sync.set({ timer_paused: false });
  chrome.storage.sync.set({ timer: 0 });

  chrome.storage.sync.set({ owned_pets: ["f001", "f002", "f003"] });
  chrome.storage.sync.set({ current_pet: "f002" });
  chrome.storage.sync.set({
    f001: {
      name: "bruh",
      level: 60,
      current_xp: 0,
      needed_xp: getNeededXp(2),
    },
    f002: {
      name: "bruh2",
      level: 32,
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ "./src/helper.js");


//Global Pet Data Variables, used in: getData(); window.onload(){at the beginning};
var current_pet = "";
var current_pet_name = "";
var current_pet_level = 1;
var current_pet_xp = 0;
var current_pet_evo = "evo1";
var current_pet_gif = "";

getData();

function getData() {
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
      loadUI();
    });
  });
  chrome.storage.sync.get(["task_list"], (result) => {
    document.getElementById("task_list").textContent = result.task_list;
  });
  chrome.storage.sync.get(
    ["timer_running", "timer_paused", "time_remaining"],
    (result) => {
      if (result.timer_running) {
        loadTimer();
      } else if (result.timer_paused) {
        document.getElementById("study_clock").innerHTML = Math.floor(
          result.time_remaining / 1000
        );
      }
    }
  );
}

//Data-driven rendering processes
function loadUI() {
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
  xp_progress_text.innerHTML = `${current_pet_xp}/${(0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getNeededXp)(
    current_pet_level + 1
  )}`;
  xp_status.style.width = `${
    (current_pet_xp / (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getNeededXp)(current_pet_level + 1)) * 100
  }%`;

  if (timer_paused) {
    document.getElementById("start_pause_button").innerHTML = "PAUSE";
  }
}

//Click Events:
setTimeout(function () {
  document
    .getElementById("close_popup_button")
    .addEventListener("click", function () {
      document.getElementById("study_popup").classList.remove("active");
      document.getElementById("bg_overlay").classList.remove("active");
      document.getElementById("close_popup_button").classList.remove("active");
    });

  document
    .getElementById("study_button")
    .addEventListener("click", function () {
      document.getElementById("study_popup").classList.toggle("active");
      document.getElementById("bg_overlay").classList.toggle("active");
      document.getElementById("close_popup_button").classList.toggle("active");
    });

  document.getElementById("task_list").addEventListener("blur", function () {
    chrome.storage.sync.set({
      task_list: document.getElementById("task_list").value,
    });
  });

  document
    .getElementById("start_pause_button")
    .addEventListener("click", function () {
      if (document.getElementById("start_pause_button").innerHTML == "START") {
        startTimer();
      } else {
        pauseTimer();
      }
    });
}, 100);

var time = 60000;
var target_time = 0;
var update_timer_interval = null;
var timer_paused = false;

function loadTimer() {
  document.getElementById("start_pause_button").innerHTML = "PAUSE";
  chrome.storage.sync.get(["timer"], (result) => {
    var now = new Date().getTime();
    target_time = result.timer;
    updateTimer();
    update_timer_interval = setInterval(updateTimer, 1000);
  });
}

function startTimer() {
  document.getElementById("start_pause_button").innerHTML = "PAUSE";
  chrome.storage.sync.set({ timer_running: true });
  chrome.storage.sync.get(["timer_paused", "time_remaining"], (result) => {
    if (result.timer_paused) {
      var now = new Date();
      target_time = new Date(now.getTime() + result.time_remaining);
      chrome.storage.sync.set({ timer: target_time.getTime() });
      updateTimer();
      update_timer_interval = setInterval(updateTimer, 1000);
    } else {
      var now = new Date();
      target_time = new Date(now.getTime() + time);
      chrome.storage.sync.set({ timer: target_time.getTime() });
      updateTimer();
      update_timer_interval = setInterval(updateTimer, 1000);
    }
    chrome.storage.sync.set({ timer_paused: false });
  });
}

function updateTimer() {
  // var now = new Date();
  // document.getElementById("study_clock").innerHTML = Math.floor(
  //   (target_time - now) / 1000
  // );

  var now = new Date();
  var minutes = Math.floor((target_time - now) / 60000);
  var seconds = Math.round((target_time - now) / 1000) % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  console.log(minutes, seconds);
  document.getElementById("study_clock").innerHTML = `${minutes}:${seconds}`;
}

function pauseTimer() {
  chrome.storage.sync.set({ timer_paused: true }, () => {
    document.getElementById("start_pause_button").innerHTML = "START";
    clearInterval(update_timer_interval);
    var now = new Date();
    var time_remaining = target_time - now;
    chrome.storage.sync.set({ time_remaining: time_remaining });
    chrome.storage.sync.set({ timer_running: false });
  });
}

})();

/******/ })()
;
//# sourceMappingURL=popup.js.map