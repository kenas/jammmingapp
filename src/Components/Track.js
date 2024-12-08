//is going to store the single track / song
// import {useState} from 'react';

import styles  from './Track.module.css';


function Track({id, name, artist, addToPlaylist}) {

    // const [artists, setArtists] = useState(null)

    function handleAddClick() {
        const trackDetails = {
            name: name,
            artist: artist,
            id: id
        }
        addToPlaylist(trackDetails);
    }

    return (
        <>      
            <div className={styles.card}>
                {<h5 className={styles.cardTitle}>{name}</h5> }
                <div className={styles.cardContent}>
                    {<p>{name} | {artist}</p>}
                    <button className={styles.buttonAddToPlay} onClick={handleAddClick}>+</button>
                </div>
               
            </div>
        </>
        
    )
}

export default Track;