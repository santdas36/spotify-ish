import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./StateProvider";
import Player from "./Player";
import { getTokenFromResponse } from "./spotify";
import "./App.css";
import Login from "./Login";

const spotifyApi = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    
    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;
    
    if (_token) {
      spotifyApi.setAccessToken(_token);
      sessionStorage.setItem( 'token', _token );
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      
    const discoverApi = "https://api.spotify.com/v1/views/made-for-x";
    const headers =  {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + _token
      }
    };
    
     const getDiscoverWeekly = async () => {
         await fetch(discoverApi, headers)
          .then((response) => console.log('here >>>', response)) //401: unauthorized, duh
      };

      getDiscoverWeekly();
    

      spotifyApi.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotifyApi,
      });

      spotifyApi.getMe().then((user) => {
        console.log(user);
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      spotifyApi.getUserPlaylists().then((playlists) => {

        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: playlists.items[0]
        })
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
    }
  }, [token, dispatch]);

  return (
    <div className="app">
      {!token && <Login />}
      {token && <Player spotify={spotifyApi} />}
    </div>
  );
}

export default App;