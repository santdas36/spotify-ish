import React from "react";
import "./Sidebar.css";
import logoWhite from "./assets/spotify_white.svg"
import SidebarItem from "./SidebarItem";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { getTokenFromResponse } from "./spotify";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [{ playlists }, dispatch] = useStateValue();
  console.log(playlists);

  return (
    <div className="sidebar">
      <img className="sidebar__logo" src={logoWhite} alt="spotify logo" />
      <div className="sidebar__options">
        <SidebarItem Icon={HomeIcon} option="Home" />
        <SidebarItem Icon={SearchIcon} option="Search" />
        <SidebarItem Icon={LibraryMusicIcon} option="Your Library" />
      </div>
      
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarItem option={playlist.name} />
      ))}
    </div>
  );
}

export default Sidebar;
