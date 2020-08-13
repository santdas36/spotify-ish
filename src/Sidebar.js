import React from "react";
import "./Sidebar.css";
import logoWhite from "./assets/spotify_white.svg"
import SidebarItem from "./SidebarItem";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useStateValue } from "./StateProvider";


function Sidebar ({spotify}) {
  const [{ playlists }, dispatch] = useStateValue();
  
  const handlePlaylistChange = (id) => {
    spotify.getPlaylist(id).then((response) =>
      console.log(response);
      dispatch({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,
      })
    );
  }
  
  return (
    <div className="sidebar">
      <img className="sidebar__logo" src={logoWhite} alt="spotify logo" />
      <div className="sidebar__items">
        <SidebarItem Icon={HomeIcon} option="Home" />
        <SidebarItem Icon={SearchIcon} option="Search" />
        <SidebarItem Icon={LibraryMusicIcon} className="sidebar__icons-library" option="Your Library" />
      </div>
      
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarItem option={playlist.name} onClick={() => handlePlaylistChange(playlist.id)} />
      ))}
    </div>
  );
}

export default Sidebar;
