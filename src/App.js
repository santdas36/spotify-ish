import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./StateProvider";
import Player from "./Player";
import { getTokenFromResponse } from "./spotify";
import "./App.css";
import Login from "./Login";
import  "./eruda";

eruda.init();
const s = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {

    const hash = getTokenFromResponse();
    window.location.hash = "";
    let _token = hash.access_token;

    if (_token) {
      s.setAccessToken(_token);

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
          .then((response) => console.log('here >>>', response))
        };

        getDiscoverWeekly();
    
   //     s.getPlaylist("37i9dQZEVXcJZyENOWUFo7").then((response) =>
   //     dispatch({
//          type: "SET_DISCOVER_WEEKLY",
    //      discover_weekly: response,
//        })
     // );

      s.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: s,
      });

      s.getMe().then((user) => {
        console.log(user);
        dispatch({
          type: "SET_USER",
          user,
        });
      });

      s.getUserPlaylists().then((playlists) => {
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
      {token && <Player spotify={s} />}
    </div>
  );
}

export default App;