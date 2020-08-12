import React from "react";
import "./Login.css";
import { accessUrl } from "./spotify";
import logo from "./assets/spotify_white.svg";

function Login() {
  return (
    <div className="login">
      <img src={logo} alt="spotify logo" />
      <a href={accessUrl}>Login with Spotify</a>
    </div>
  );
}

export default Login;