import Playlist from "./Components/Playlist";
import SearchBar from "./Components/SearchBar";
import {useSpotifyToken} from './Components/GetToken';


import styles from './App.module.css';
import { useState } from "react";

function App() {
  const token = useSpotifyToken();

    //This state is looking after adding songs to playlist and removing songs from the playlist
    const [playlist, setPlaylist] = useState([]);


    function addToPlaylist(trackDetails) {
      setPlaylist([...playlist, trackDetails]);
    }

    function removeFromPlaylist(removeSong) {
      setPlaylist((prev) => prev.filter((song) => song.id !== removeSong));
    }

  return (
    <div className={styles.container}>
      <SearchBar token={token} addToPlaylist={addToPlaylist}/>
     
      <Playlist className={styles.results} theSong={playlist} onRemoveSong={removeFromPlaylist}/>


    </div>
  );
}

export default App;
