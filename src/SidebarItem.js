import React from "react";
import "./SidebarItem.css";

function SidebarItem ({ option, Icon }) {
  return (
    <div className="sidebarItem">
      {Icon && <Icon className="sidebarItem__icon" />}
      {Icon ? <h4>{option}</h4> : <p>{option}</p>}
    </div>
  );
}

export default SidebarItem;
