import React, { useState } from "react";
import style from "./MusicApp.module.css";
import { prevNextMusic, playPause, updateTime, tempo } from "./script.js";
import Icon from 'react-native-vector-icons/FontAwesome';
const MusicApp = () => {
    const [isPlaying, setIsPlaying] = useState(true);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying); 
        playPause(); 
        setCurrentSongIndex(type === "prev" ? currentSongIndex - 1 : currentSongIndex + 1); 
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