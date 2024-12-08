//Here are going to be store data from the seachBar
import Track from './Track';

import styles from './SearchResults.module.css';

function SearchResult({listOftracks, addToPlaylist}) {
    
    return (
        <section className={styles.section}>
            {listOftracks.length > 0 ? <h2>Results</h2> : ""}

              
                    {listOftracks.map((track) => 
                        <Track 
                            id={track.id}
                            name={track.album.name} 
                            artist={track.artists.map((artist) => artist.name).join(', ')}
                            addToPlaylist={addToPlaylist}
                        />
                    )}
               
        </section>

    )
}

export default SearchResult;