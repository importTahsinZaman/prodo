//Global Pet Data Variables, used in: getData(); window.onload(){at the beginning};
var current_pet = "";
var current_pet_name = "";
var current_pet_level = 1;
var current_pet_xp = 0;
var current_pet_evo = "evo1";
var current_pet_gif = "";

var task_list_content = "";

setData();
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
  chrome.storage.sync.get(["task_list"], (result) => {
    document.getElementById("task_list").textContent = result.task_list;
  });
}

//Data-driven rendering processes
window.onload = function () {
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

//Timer Global Variables. Used in: Timer Start/Pause button function; updateTimer()
var update_timer_interval = null;
var target_time = null;

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
        document.getElementById("start_pause_button").innerHTML = "PAUSE";

        var now = new Date().getTime();
        target_time = new Date(now + 20 * 60 * 1000).getTime();
        update_timer_interval = setInterval(updateTimer, 1000);
      } else {
        clearInterval(update_timer_interval);
        document.getElementById("start_pause_button").innerHTML = "START";
      }
    });
}, 100);

function updateTimer() {
  var now = new Date().getTime();
  document.getElementById("study_clock").innerHTML = millisToMinutesAndSeconds(
    target_time - now
  );
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function setData() {
  chrome.storage.sync.set({ owned_pets: ["f001", "f002"] });
  chrome.storage.sync.set({ current_pet: "f001" });
  chrome.storage.sync.set({
    f001: {
      name: "bruh",
      level: 10,
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
