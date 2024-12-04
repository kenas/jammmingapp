//is going to store the single track / song
// import {useState} from 'react';

import styles  from './Track.module.css';

function Track({name, artist, addToPlaylist}) {

    // const [artists, setArtists] = useState(null)

    function handleAddClick() {
        const trackDetails = {
            name: name,
            artist: artist
        }
        addToPlaylist(trackDetails);
    }

    return (
        <>      
            <li className={styles.li}>
                {<h5>{name}</h5> }

                {<p>{name} | {artist}</p>}
                <button onClick={handleAddClick}>add</button>
            </li>
        </>
        
    )
}

export default Track;