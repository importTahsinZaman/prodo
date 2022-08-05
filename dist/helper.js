export function getNeededXp(target_level) {
  return Math.floor(56 * target_level ** 1.1);
}

export function setData() {
  chrome.storage.sync.set({ timer_running: false });
  chrome.storage.sync.set({ time_remaining: 0 });
  chrome.storage.sync.set({ timer_paused: false });
  chrome.storage.sync.set({ timer: 0 });
  chrome.storage.sync.set({ break_time: false });
  chrome.storage.sync.set({ switch_break: false });

  chrome.storage.sync.set({ owned_pets: ["f001", "f002", "f003"] });
  chrome.storage.sync.set({ current_pet: "f001" });
  chrome.storage.sync.set({
    f001: {
      name: "bruh",
      level: 61,
      current_xp: 0,
      needed_xp: getNeededXp(2),
    },
    f002: {
      name: "bruh2",
      level: 62,
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
