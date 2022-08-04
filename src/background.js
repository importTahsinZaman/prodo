var icon = null;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === "set_timer") {
    setTime(request.time);
    icon = request.icon;
  } else if (request.command === "stop_timer") {
    chrome.alarms.clear("timer", console.log("cleared alarm"));
  }
});

function setTime(time) {
  chrome.alarms.create("timer", {
    delayInMinutes: time / 60000,
    periodInMinutes: time / 60000,
  });
  console.log("Started timer for " + time / 60000 + "minutes");
}

chrome.alarms.onAlarm.addListener(() => {
  chrome.notifications.create(
    "NOTIFICATION_ID",
    {
      type: "basic",
      iconUrl: chrome.runtime.getURL(icon),
      title: "Prodo - Timer Ended",
      message:
        "The timer has ended, you can start the next part of the study cycle in the Study tab.",
      priority: 2,
    },
    () => {
      chrome.alarms.clear("timer", console.log("cleared alarm"));
    }
  );
});
