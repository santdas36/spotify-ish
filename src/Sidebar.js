import React from "react";
import "./Sidebar.css";
import logoWhite from "./assets/spotify_white.svg"
import SidebarItem from "./SidebarItem";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import LibraryMusicRoundedIcon from "@material-ui/icons/LibraryMusicRounded";
import { useStateValue } from "./StateProvider";


function Sidebar ({spotify}) {
  const [{ playlists }, dispatch] = useStateValue();
  
  const handlePlaylistChange = (id) => {
    spotify.getPlaylist(id).then((response) => {
      console.log(response);
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,
      });
    });
  }
  
  return (
    <div className="sidebar">
      <img className="sidebar__logo" src={logoWhite} alt="spotify logo" />
      <div className="sidebar__items">
        <SidebarItem Icon={HomeRoundedIcon} option="Home" />
        <SidebarItem Icon={SearchRoundedIcon} option="Search" />
        <SidebarItem Icon={LibraryMusicRoundedIcon} className="sidebar__icons-library" option="Your Library" />
      </div>
      
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarItem option={playlist} handlePlaylistChange={handlePlaylistChange} />
      ))}
    </div>
  );
}

export default Sidebar;
