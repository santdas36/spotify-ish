import React from "react";
import "./Login.css";
import { accessUrl } from "./spotify";

function Login() {
  return (
    <div className="login">
      <img
        src="./assets/spotify_green.svg"
        alt="spotify logo"
      />
      <a href={accessUrl}>Login with Spotify</a>
    </div>
  );
}

export default Login;