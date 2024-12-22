import Tracklist from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css';

function SearchResult({listOftracksFindBySearch, addTrackToPlaylist}) {

    return (
        <section className={styles.section}>
            
            {listOftracksFindBySearch.length > 0 ? <h2>Results</h2> : <h1>Welcome to JAMMMING!</h1>}

            <Tracklist 
                listOftracksFindBySearch={listOftracksFindBySearch}
                addTrackToPlaylist={addTrackToPlaylist}
            />
        </section>
    );
}

export default SearchResult;