import Playlist from "./Components/Playlist";
import SearchBar from "./Components/SearchBar";
import {useSpotifyToken} from './Components/GetToken';

import styles from './App.module.css';
import { useState } from "react";

function App() {
  const token = useSpotifyToken();

    const [playlist, setPlaylist] = useState([]);

    function addToPlaylist(trackDetails) {
      setPlaylist([...playlist, trackDetails]);
      console.log(playlist);
    }

  return (
    <div className={styles.container}>
      <SearchBar token={token} addToPlaylist={addToPlaylist}/>
      <Playlist className={styles.results} theSong={playlist}/>
    </div>
  );
}

export default App;
