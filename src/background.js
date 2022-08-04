chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.time) {
    console.log("Starting Timer for " + request.time + "milliseconds");
    setTime(request.time);
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
      iconUrl: "https://picsum.photos/id/237/200/300",
      title: "notification title",
      message: "notification message",
      priority: 2,
    },
    () => {
      chrome.alarms.clear("timer", console.log("cleared alarm"));
    }
  );
});
