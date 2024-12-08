import styles from './Playlist.module.css';

function Playlist({theSong, onRemoveSong}) {


    function handleAddToSpotify () {
        alert("aad");
    }


    return (
        <section className={styles.playlist}>

                {Object.keys(theSong).length > 0 ? 
                
                <div className={styles.navMenu}>
                    <h2>My playlist</h2> <small onClick={handleAddToSpotify}>Save to spotify</small>
               
                </div>: ''}
         
               
                {theSong.map((song)=>
                <div key={song.id}    className={styles.card}>
                    <h5>{song.name}</h5>

                    <div className={styles.cardContentPlaylist}>
                        <p>{song.name} | {song.artist}</p>
                        <button onClick={() => onRemoveSong(song.id)}>-</button>
                    </div>

                </div>  

                )}
                
        </section>
    );

}

export default Playlist;