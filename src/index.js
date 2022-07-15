import JSConfetti from "js-confetti";

if (window.location.href.includes("https://classroom.google.com/")) {
  const image = document.createElement("img");
  image.src = chrome.runtime.getURL("assets/Pets/bunny.gif");
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
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
  }
};
