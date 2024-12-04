//Here are going to be store data from the seachBar
import Track from './Track';

import styles from './SearchResults.module.css';

function SearchResult({listOftracks, addToPlaylist}) {
    
    return (
        <section className={styles.section}>
            <h1>{listOftracks.length > 0 ? "Results" : ""}</h1>

                <ul>
                    {listOftracks.map((track) => 
                        <Track 
                            name={track.album.name} 
                            artist={track.artists.map((artist) => artist.name).join(', ')}
                            addToPlaylist={addToPlaylist}
                        />
                    )}
                </ul>
        </section>

    )
}

export default SearchResult;