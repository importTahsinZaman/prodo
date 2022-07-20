// chrome.storage.sync.set({ test: 1 });
// setInterval(function () {
//   chrome.storage.sync.get(["test"], (result) => {
//     chrome.storage.sync.set({ test: result.test + 1 });
//     console.log(result.test);
//   });
// }, 1000);

// const starting_time = 10; // Minutes
// let time = starting_time * 60;

// setInterval(update_timer, 1000);

// function update_timer() {
//   const minutes = Math.floor(time / 60);
//   let seconds = time % 60;
//   seconds = seconds < 10 ? "0" + seconds : seconds;
//   time--;
//   console.log(`${minutes}:${seconds}`);
// }
