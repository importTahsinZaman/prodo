import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

var current_pet = "";
var current_pet_name = "";
var current_pet_level = 1;
var current_pet_xp = 0;
var current_pet_evo = "evo1";
var current_pet_gif = "";

getData();

async function getData() {
  chrome.storage.sync.get(["current_pet"], (result1) => {
    current_pet = result1.current_pet;
    chrome.storage.sync.get([`${current_pet}`], (result2) => {
      current_pet_level = result2[current_pet].level;
      current_pet_xp = result2[current_pet].current_xp;
      current_pet_name = result2[current_pet].name;
      if (current_pet_level >= 60) {
        current_pet_evo = "evo3";
      } else if (current_pet_level >= 30) {
        current_pet_evo = "evo2";
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

    const xp_message = document.createElement("h1");
    xp_message.id = "xp_message";
    document.getElementsByTagName("body")[0].appendChild(xp_message);
    xp_message.innerHTML = "+150 xp";
    xp_message.setAttribute(
      "style",
      "position: fixed; z-index: 1000000; font-size:10px; top: 30%; left: 50%; transform: translate(-50%, -50%); opacity:0%; user-select: none;"
    );
  }
}, 200);

document.onclick = function (event) {
  if (
    event.target.textContent == "Turning in…" &&
    window.location.href.includes("https://classroom.google.com/")
  ) {
    addXP(150);

    const back = document.getElementsByClassName("NBxL9e")[0];
    back.style.display = "none";
    jsConfetti.addConfetti();

    const animation = [
      { fontSize: "10px", opacity: "100%" },
      { fontSize: "80px", top: "40%" },
      { fontSize: "10px", opacity: "0%", top: "30%" },
    ];

    const animationDuration = {
      duration: 100,
      iterations: 1,
    };

    document.getElementById("xp_message").animate(animation, animationDuration);
  }
};

function getNeededXp(target_level) {
  return Math.floor(56 * target_level ** 1.1);
}

function addXP(xpAmount) {
  current_pet_xp += xpAmount;

  while (current_pet_xp >= getNeededXp(current_pet_level + 1)) {
    current_pet_xp = current_pet_xp - getNeededXp(current_pet_level + 1);
    current_pet_level += 1;
  }

  chrome.storage.sync.set(
    {
      [current_pet]: {
        name: current_pet_name,
        level: current_pet_level,
        current_xp: current_pet_xp,
        needed_xp: getNeededXp(current_pet_level + 1),
      },
    },
    (r) => {
      console.log("updated xp");
    }
  );
}
