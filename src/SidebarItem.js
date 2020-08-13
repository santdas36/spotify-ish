import React from "react";
import "./SidebarItem.css";

function SidebarItem ({ option, Icon, handlePlaylistChange }) {
  return (
    <div className="sidebarItem">
      {Icon && <Icon className="sidebarItem__icon" />}
      {Icon ? <h4>{option}</h4> : <p onClick={() => handlePlaylistChange(option.id)}>{option.name}</p>}
    </div>
  );
}

export default SidebarItem;
