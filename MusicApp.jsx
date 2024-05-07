import React, { useState } from "react";
import style from "./MusicApp.module.css";

import Icon from 'react-native-vector-icons/FontAwesome';
import songs from "./songs.js";
let index = 0;
const MusicApp = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    
    const prevNextMusic = (type) => {
      if ((type === "next" && index + 1 === songs.length) || type === "init") {
        index = 0;
      } else if (type === "prev" && index === 0) {
        index = songs.length - 1;
      } else {
        index = type === "prev" ? index - 1 : index + 1;
      }
      setIsPlaying(true)
      const player = document.querySelector("#player");
      const musicName = document.querySelector("#musicName");
      setCurrentSongIndex(type === "prev" ? currentSongIndex - 1 : currentSongIndex + 1); 
      if (player && musicName) {
        player.src = songs[index].src;
        musicName.innerHTML = songs[index].name;
      }
      playPause();
      updateTime();
    };
    const updateTime = () => {
      const player = document.querySelector("#player");
      const currentTime = document.querySelector("#currentTime");
      const duration = document.querySelector("#duration");
  
      if (player && currentTime && duration) {
          const currentMinutes = Math.floor(player.currentTime / 60);
          const currentSeconds = Math.floor(player.currentTime % 60);
          currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;
  
          let formattedDuration;
          if (isNaN(player.duration)) {
              formattedDuration = '00:00';
          } else {
              const durationMinutes = Math.floor(player.duration / 60);
              const durationSeconds = Math.floor(player.duration % 60);
              formattedDuration = `${durationMinutes}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
          }
          duration.textContent = formattedDuration;
      }
  };
  
  updateTime();
    
    const tempo = (e) => {
      const player = document.querySelector("#player");
      const progressBar = document.querySelector(".progress-bar");
    
      if (player && progressBar) {
        const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
        player.currentTime = newTime;
      }
    };
    const playPause = () => {
      const player = document.querySelector("#player");
      const playPauseButton = document.querySelector("#playPauseButton");
      if (player && playPauseButton) {
        if (player.paused) {
          player.play();
          
        } else {
          player.pause();
        }
      }
    };
    
    const handlePlayPause = () => {
        setIsPlaying(!isPlaying); 
        playPause(); 
    };
  return (
    <body className={style.body}>

      <h2>Music App</h2>
      <div className={style.player}>

        <div className={style.logo}>
          <Icon name="headphones" size={40} color="black"/>
        </div>

        <span className={style.musicName} id="musicName"></span>

        <audio className={style.player} onTimeUpdate={updateTime} id="player" src=""></audio>
        <div className={style.controls}>
      <button onClick={() => prevNextMusic("prev")} id="prevButton">
        <Icon name="backward" size={30} color="black" /> 
      </button>
      <button onClick={handlePlayPause} id="playPauseButton">
            {isPlaying ? (
              <Icon name="pause" size={30} color="black" /> 
            ) : (
              <Icon name="play" size={30} color="black" />
            )}
          </button>
      <button onClick={() => prevNextMusic("next")} id="nextButton">
        <Icon name="forward" size={30} color="black" /> 
      </button>
    </div>
        <div className={style.footer}>
          <div onClick={tempo} className={style["progress-bar"]}>
            <div className={style.progress}></div>
          </div>
          <div className={style.time}>
            <span id="currentTime">0:00</span>
            <span id="duration">0:00</span>
          </div>
        </div>
      </div>
      <h4>(Avançar para tocar)</h4>
    </body>
  );
};

export default MusicApp;