import JSConfetti from "js-confetti";

chrome.storage.sync.set({ test: 69 }, function () {
  console.log("Value is set to " + value);
});

if (window.location.href.includes("https://classroom.google.com/")) {
  const image = document.createElement("img");
  image.src = chrome.runtime.getURL("assets/Pets/bunny_evo1.gif");
  document.getElementsByTagName("body")[0].appendChild(image);
  image.setAttribute("style", "position: fixed; image-rendering: pixelated;");
  image.style.right = "0px";
  image.style.bottom = "14px";
  image.style.width = "18%";
  image.style.height = "30%";
}

document.onclick = function (event) {
  if (event === undefined) event = window.event;

  if (
    event.target.textContent == "Turning in…" &&
    window.location.href.includes("https://classroom.google.com/")
  ) {
    const back = document.getElementsByClassName("NBxL9e")[0];
    back.style.display = "none";
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
  }
};
