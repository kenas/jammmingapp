import styles from './Playlist.module.css';

function Playlist({theSong}) {

    return (
        <section>
            <div className={styles.titles}>
                <h1>
                    {Object.keys(theSong).length > 0 ? 'Playlist' : ''}
                </h1>
                <small>Save playlist</small>
            </div>
         
                   {theSong.map((song)=>
                   <div className={styles.card}>
                        <h5>{song.name}</h5>
                        <p>{song.name} | {song.artist}</p>
                   </div>  
  
                    
                )}
                
        </section>
    );

}

export default Playlist;