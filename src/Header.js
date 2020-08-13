import React from "react";
import "./Header.css";
import { useStateValue } from "./StateProvider";
import { Avatar } from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { useEffect } from "react";

function Header({ spotify }) {
  const [{ user }, dispatch] = useStateValue();
  const logout = () => {
    dispatch({
      type: "SET_TOKEN",
      token: null
    })
  }

  return (
    <div className="header">
      <div className="header__left">
        <SearchRoundedIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
        />
      </div>
      <div className="header__right">
        <div>
          <h4 className="header__username">{user?.display_name}</h4>
          <small onClick={logout}>Log Out</small>
        </div>
        <Avatar className="header__avatar" alt={user?.display_name} src={user?.images[0]?.url} />
      </div>
    </div>
  );
}

export default Header;
