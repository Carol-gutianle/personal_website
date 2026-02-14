(() => {
  const toggle = document.getElementById("bgm-toggle");
  const audio = document.getElementById("bgm-audio");
  if (!toggle || !audio) return;

  const key = "bgm-enabled";

  const sync = (playing) => {
    toggle.setAttribute("aria-pressed", playing ? "true" : "false");
    toggle.querySelector(".bgm-label").textContent = playing ? "Pause BGM" : "Play BGM";
  };

  toggle.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        localStorage.setItem(key, "1");
        sync(true);
      } catch (_) {
        sync(false);
      }
    } else {
      audio.pause();
      localStorage.setItem(key, "0");
      sync(false);
    }
  });

  if (localStorage.getItem(key) === "1") {
    audio.play().then(() => sync(true)).catch(() => sync(false));
  } else {
    sync(false);
  }
})();
