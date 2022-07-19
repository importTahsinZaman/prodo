import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

var current_pet = "";
var current_pet_name = "";
var current_pet_level = 1;
var current_pet_evo = "evo1";
var current_pet_gif = "";

getData();

async function getData() {
  chrome.storage.sync.get(["current_pet"], (result1) => {
    current_pet = result1.current_pet;
    chrome.storage.sync.get([`${current_pet}`], (result2) => {
      current_pet_level = result2[current_pet].level;
      current_pet_name = result2[current_pet].name;
      if (current_pet_level >= 30) {
        current_pet_evo = "evo2";
      } else if (current_pet_level >= 60) {
        current_pet_evo = "evo3";
      }
      current_pet_gif = `${current_pet}_${current_pet_evo}`;
    });
  });
}

setTimeout(function () {
  if (window.location.href.includes("https://classroom.google.com/")) {
    const image = document.createElement("img");
    image.src = chrome.runtime.getURL(`assets/Pets/${current_pet_gif}.gif`);
    document.getElementsByTagName("body")[0].appendChild(image);
    image.setAttribute("style", "position: fixed; image-rendering: pixelated;");
    image.style.right = "0px";
    image.style.bottom = "14px";
    image.style.width = "18%";
    image.style.height = "30%";
  }
}, 200);

document.onclick = function (event) {
  if (
    event.target.textContent == "Turning in…" &&
    window.location.href.includes("https://classroom.google.com/")
  ) {
    const back = document.getElementsByClassName("NBxL9e")[0];
    back.style.display = "none";
    jsConfetti.addConfetti();
  }
};
