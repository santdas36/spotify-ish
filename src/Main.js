import React from "react";
import "./Main.css";
import Header from "./Header";
import { useStateValue } from "./StateProvider";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Main ({ spotify }) {
  const [{ discover_weekly }, dispatch] = useStateValue();

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcSdzTuPzdrW3`,
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
          <PlayCircleFilledIcon
            className="main__playButton"
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        {discover_weekly?.tracks.items.map((item) => (
          <SongRow playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
  );
}

export default Main;