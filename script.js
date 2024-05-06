import songs from "./songs.js";

let index = 0;

export const prevNextMusic = (type) => {
  if ((type === "next" && index + 1 === songs.length) || type === "init") {
    index = 0;
  } else if (type === "prev" && index === 0) {
    index = songs.length - 1;
  } else {
    index = type === "prev" ? index - 1 : index + 1;
  }

  const player = document.querySelector("#player");
  const musicName = document.querySelector("#musicName");

  if (player && musicName) {
    player.src = songs[index].src;
    musicName.innerHTML = songs[index].name;
  }

  playPause();
  updateTime();
};

export const playPause = () => {
  const player = document.querySelector("#player");
  const playPauseButton = document.querySelector("#playPauseButton");

  if (player && playPauseButton) {
    if (player.paused) {
      player.play();
      setIsPlaying(true);
    } else {
      player.pause();
      setIsPlaying(false);
    }
  }
};

export const updateTime = () => {
  const player = document.querySelector("#player");
  const currentTime = document.querySelector("#currentTime");
  const duration = document.querySelector("#duration");

  if (player && currentTime && duration) {
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;

    const durationMinutes = Math.floor(player.duration / 60);
    const durationSeconds = Math.floor(player.duration % 60);
    duration.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
  }
};

export const tempo = (e) => {
  const player = document.querySelector("#player");
  const progressBar = document.querySelector(".progress-bar");

  if (player && progressBar) {
    const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
    player.currentTime = newTime;
  }
};