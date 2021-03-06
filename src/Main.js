import React from "react";
import "./Main.css";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import SongRow from "./SongRow";
import PlayCircleFilledRoundedIcon from "@material-ui/icons/PlayCircleFilledRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Main ({ spotify }) {
  const [{ discover_weekly }, dispatch] = useStateValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:${id}`,
      })
      .then((res) => {
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
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
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
      });
  };

  return (
    <div className="main">
      <Header spotify={spotify} />

      <div className="main__header">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="main__headerText">
          <strong>PLAYLIST</strong>
          <h2>{discover_weekly?.name}</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="main__songslist">
        <div className="main__icons">
          <PlayCircleFilledRoundedIcon
            className="main__playButton"
            onClick={playPlaylist(discover_weekly?.id)}
          />
          <FavoriteRoundedIcon style={{fontSize: 32}} />
          <MoreHorizIcon style={{fontSize: 32}}/>
        </div>

        {discover_weekly?.tracks.items.map((item) => (
          item.track && <SongRow playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
  );
}

export default Main;