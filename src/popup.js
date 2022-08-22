import { getNeededXp, setData } from "./helper.js";

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
    [
      "timer_running",
      "timer_paused",
      "time_remaining",
      "break_time",
      "switch_break",
    ],
    (result) => {
      break_time = result.break_time;
      if (break_time) {
        document.getElementById("study_title").innerHTML = "BREAK";
        time = break_amount;
      } else {
        document.getElementById("study_title").innerHTML = "STUDY";
        time = study_amount;
      }
      if (result.timer_running) {
        loadTimer();
      } else if (result.timer_paused) {
        var minutes = Math.floor(result.time_remaining / 60000);
        var seconds = Math.round(result.time_remaining / 1000) % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById(
          "study_clock"
        ).innerHTML = `${minutes}:${seconds}`;
      } else {
        var minutes = Math.floor(time / 60000);
        var seconds = Math.round(time / 1000) % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        document.getElementById(
          "study_clock"
        ).innerHTML = `${minutes}:${seconds}`;
      }
      if (result.switch_break) {
        switchBreak();
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
  xp_progress_text.innerHTML = `${current_pet_xp}/${getNeededXp(
    current_pet_level + 1
  )}`;
  xp_status.style.width = `${
    (current_pet_xp / getNeededXp(current_pet_level + 1)) * 100
  }%`;

  if (timer_paused) {
    document.getElementById("start_pause_button").innerHTML = "PAUSE";
  }
}

//Click Events:
setTimeout(function () {
  document.getElementById("computer").addEventListener("click", () => {
    document.getElementById("game_popup").classList.toggle("active");
    document.getElementById("bg_overlay").classList.toggle("active");
    document.getElementById("close_popup_button").classList.toggle("active");
    if (
      break_time &&
      document.getElementById("start_pause_button").innerHTML == "PAUSE"
    ) {
      document.getElementById("game_popup_message").innerHTML =
        "REOPEN THE EXTENSION POPUP TO START GAMING";
    } else {
      document.getElementById("game_popup_message").innerHTML =
        "YOU CAN ONLY GAME WHILE THE BREAK TIMER IS RUNNING";
    }
  });
  document.getElementById("bag_button").addEventListener("click", () => {
    setData();
  });
  document
    .getElementById("close_popup_button")
    .addEventListener("click", function () {
      document.getElementById("game_popup").classList.remove("active");
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
        startTimer(false);
      } else {
        pauseTimer(false);
      }
    });
}, 100);

const study_amount = 32000;
const break_amount = 30000;
var time = null;
var target_time = 0;
var update_timer_interval = null;
var timer_paused = false;
var break_time = false;

function loadTimer() {
  document.getElementById("start_pause_button").innerHTML = "PAUSE";
  chrome.storage.sync.get(["timer"], (result) => {
    var now = new Date().getTime();
    target_time = result.timer;
    updateTimer();
    update_timer_interval = setInterval(updateTimer, 1000);
  });
}

function startTimer(leave_timer) {
  document.getElementById("start_pause_button").innerHTML = "PAUSE";
  chrome.storage.sync.set({ timer_running: true });
  chrome.storage.sync.get(["timer_paused", "time_remaining"], (result) => {
    if (result.timer_paused) {
      var now = new Date();
      target_time = new Date(now.getTime() + result.time_remaining);
      if (!leave_timer)
        chrome.runtime.sendMessage({
          command: "set_timer",
          time: result.time_remaining,
          icon: chrome.runtime.getURL(`assets/Pets/${current_pet_gif}.gif`),
        });
      chrome.storage.sync.set({ timer: target_time.getTime() });
      updateTimer();
      update_timer_interval = setInterval(updateTimer, 1000);
    } else {
      var now = new Date();
      target_time = new Date(now.getTime() + time);
      if (!leave_timer)
        chrome.runtime.sendMessage({
          command: "set_timer",
          time: time,
          icon: chrome.runtime.getURL(`assets/Pets/${current_pet_gif}.gif`),
        });
      chrome.storage.sync.set({ timer: target_time.getTime() });
      updateTimer();
      update_timer_interval = setInterval(updateTimer, 1000);
    }
    chrome.storage.sync.set({ timer_paused: false });
  });
}

function updateTimer() {
  var now = new Date();
  var minutes = Math.floor((target_time - now) / 60000);
  var seconds = Math.round((target_time - now) / 1000) % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  document.getElementById("study_clock").innerHTML = `${minutes}:${seconds}`;
}

function pauseTimer(leave_timer) {
  chrome.storage.sync.set({ timer_paused: true }, () => {
    document.getElementById("start_pause_button").innerHTML = "START";
    clearInterval(update_timer_interval);
    if (!leave_timer) chrome.runtime.sendMessage({ command: "stop_timer" });
    var now = new Date();
    var time_remaining = target_time - now;
    chrome.storage.sync.set({ time_remaining: time_remaining });
    chrome.storage.sync.set({ timer_running: false });
  });
}

function switchBreak() {
  clearInterval(update_timer_interval);
  document.getElementById("study_clock").innerHTML = `0:00`;

  if (document.getElementById("study_title").innerHTML == "BREAK") {
    document.getElementById("study_title").innerHTML = "STUDY";
    time = study_amount;
  } else {
    document.getElementById("study_title").innerHTML = "BREAK";
    time = break_amount;
  }

  startTimer(true);
  pauseTimer(true);

  break_time = !break_time;
  chrome.storage.sync.set({ break_time: break_time });
}
