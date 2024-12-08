import styles from './Playlist.module.css';

function Playlist({theSong, onRemoveSong}) {


    function handleAddToSpotify () {
        alert("aad");
    }


    return (
        <section className={styles.playlist}>

                {Object.keys(theSong).length > 0 ? 
                
                <div className={styles.navMenu}>
                    <h2>My playlist</h2> <a href='#' onClick={handleAddToSpotify}>Save to Spotify</a>
               
                </div>: ''}
         
               
                {theSong.map((song)=>
                <div key={song.id}    className={styles.card}>
                   

                    <div className={styles.cardContentPlaylist}>
                        <h5>{song.name}</h5>
                        <button aria-label="Remove the song" onClick={() => onRemoveSong(song.id)}>-</button>
                    </div>
                    <p>{song.name} | {song.artist}</p>
                </div>  

                )}
                
        </section>
    );

}

export default Playlist;