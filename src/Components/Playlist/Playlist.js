import Track from '../Track/Track';

import styles from './Playlist.module.css';
function Playlist({selectedTrack, removeTrackFromPlaylist, handleNameOfPlaylist, handleAuthProcessToSpotify, nameOfPlaylist}) {

    // Validate playlist name and call the authorization handler
    function handleSaveToSpotify(e) {
        if (!nameOfPlaylist || !nameOfPlaylist.trim()) {
            alert("Please provide a valid name for your playlist before saving.");
            console.error("Playlist name is empty or invalid.");
            return;
        }
        handleAuthProcessToSpotify(e); // Proceed if the playlist name is valid
    }
    

    //The user input is catch here and send to state in the parent App.js 
    function handleOnchangeNameOfPlaylist(e) {
       handleNameOfPlaylist(e.target.value);
    }


    return (
        <section className={styles.playlist}>
                
                {Object.keys(selectedTrack).length > 0 ? 
                
                <div className={styles.navMenu}>
                    <h2>My playlist</h2>
                    <div className={styles.cardSaveToSpotify}>
                    <input 
                        placeholder='The name of the playlist?'
                        onChange={handleOnchangeNameOfPlaylist}
                    />
                    <button type="button" onClick={handleSaveToSpotify}>Save to Spotify</button>
                </div>
        
           
            {selectedTrack && selectedTrack.length > 0 && selectedTrack.map((track) => {
                return (
                    <Track
                    key={track.id}
                    track={track}
                    removeTrackFromPlaylist={removeTrackFromPlaylist}
                    onRemove={true}
                />
                )
            })}
               
                </div>: ''}

        </section>
    )
}

export default Playlist;