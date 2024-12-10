import {useState} from 'react';

import styles from './Playlist.module.css';

function Playlist({theSong, onRemoveSong}) {

    const [seveToSpo, setSeveToSpo] = useState(false);

    function handleAddToSpotify (e) {
        e.preventDefault(); 
        setSeveToSpo((prev) => !prev);
    }

    function handleRemoveSong (id) {
        //Passing ID back to Parent App.js to handle and keep eye on props call playlist
        onRemoveSong(id);

        /*Checking if the song is lats in the playlist, if so, set setSeveToSpo to flase because I do not need see the
        the input because the playlist is empty*/
        if(theSong.length ===1) {
            setSeveToSpo(false);
        }
    }


    return (
        <section className={styles.playlist}>

                {Object.keys(theSong).length > 0 ? 
                
                <div className={styles.navMenu}>
                    <h2>My playlist</h2> <a href='/' onClick={handleAddToSpotify}>Save to Spotify</a>
               
                </div>: ''}
                
                {seveToSpo && (
                <div className={styles.cardSaveToSpotify}>
                    <input placeholder='Name of your new play list ...' />
                    <button>Save to Spotify</button>
                </div>
                )}
               
                {theSong.map((song)=>
                <div key={song.id}    className={styles.card}>
                   
                    <div className={styles.cardContentPlaylist}>
                        <h5>{song.name}</h5>
                        <button aria-label="Remove the song" onClick={() => handleRemoveSong(song.id)}>-</button>
                    </div>
                    <p>{song.name} | {song.artist}</p>
                </div>  

                )}
                
        </section>
    );

}

export default Playlist;