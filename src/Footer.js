import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import ShuffleRoundedIcon from "@material-ui/icons/ShuffleRounded";
import RepeatRoundedIcon from "@material-ui/icons/RepeatRounded";
import VolumeDownRoundedIcon from "@material-ui/icons/VolumeDownRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import QueueMusicRoundedIcon from "@material-ui/icons/QueueMusicRounded";
import "./Footer.css";
import { Slider } from "@material-ui/core";

function Footer({ spotify }) {
  const [{ token, item, playing }, dispatch] = useStateValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r);

      dispatch({
        type: "SET_PLAYING",
        playing: r.is_playing,
      });

      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
    });
  }, [spotify]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          className="footer__albumArt"
          src={item?.album.images[0].url}
          alt={item?.name}
        />
        {item ? (
          <div className="footer__songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer__songInfo">
            <h4>Pick a song to play...</h4>
            <p>Premium subscriotion required</p>
          </div>
        )}
      </div>

      <div className="footer__center">
        <ShuffleRoundedIcon className="footer__icon" style={{ fontSize: 24 }} />
        <SkipPreviousRoundedIcon onClick={skipPrevious} className="footer__icon" style={{ fontSize: 32 }}  />
        {playing ? (
          <PauseRoundedIcon
            onClick={handlePlayPause}
            className="footer__icon"
            style={{ fontSize: 54 }} 
          />
        ) : (
          <PlayArrowRoundedIcon
            onClick={handlePlayPause}
            className="footer__icon"
            style={{ fontSize: 54 }} 
          />
        )}
        <SkipNextRoundedIcon onClick={skipNext} className="footer__icon" style={{ fontSize: 32 }} />
        <RepeatRoundedIcon className="footer__icon" style={{ fontSize: 24 }} />
      </div>
      <div className="footer__right">
        <QueueMusicRoundedIcon style={{ fontSize: 24 }}/>
        <VolumeDownRoundedIcon style={{ fontSize: 24 }}/>
        <Slider className="footer__slider" aria-labelledby="continuous-slider" />
      </div>
    </div>
  );
}

export default Footer;
