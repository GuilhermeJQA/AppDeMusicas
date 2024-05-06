import React, { useState } from "react";
import style from "./MusicApp.module.css";
import { prevNextMusic, playPause, updateTime, chamaIsso, tempo } from "./script.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import songs from "./songs.js";
const MusicApp = () => {
    const [isPlaying, setIsPlaying] = useState(true);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying); // Alterna o estado de reprodução
        playPause(); // Chama a função playPause para controlar a reprodução
        setCurrentSongIndex(type === "prev" ? currentSongIndex - 1 : currentSongIndex + 1); // Atualiza o índice da música atual
    };
  return (
    <body className={style.body}>
      <div className="player">

        <div className={style.logo}>
        </div>

        <span className={style.musicName} id="musicName"></span>

        <audio className={style.player} onTimeUpdate={updateTime} id="player" src=""></audio>
        <div className={style.controls}>
      <button onClick={() => prevNextMusic("prev")} id="prevButton">
        <Icon name="backward" size={30} color="black" /> {/* Ícone de voltar */}
      </button>
      <button onClick={handlePlayPause} id="playPauseButton">
            {isPlaying ? (
              <Icon name="pause" size={30} color="black" /> // Ícone de pause quando estiver reproduzindo
            ) : (
              <Icon name="play" size={30} color="black" /> // Ícone de play quando estiver pausado
            )}
          </button>
      <button onClick={() => prevNextMusic("next")} id="nextButton">
        <Icon name="forward" size={30} color="black" /> {/* Ícone de avançar */}
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
    </body>
  );
};

export default MusicApp;