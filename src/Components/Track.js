//is going to store the single track / song
// import {useState} from 'react';
import styles  from './Track.module.css';

function Track({singleTrack}) {

    // const [artists, setArtists] = useState(null)

    return (
        <section>
            <h1>{singleTrack.length >0 ? "Results" : ""}</h1>
            <ul>
                {singleTrack.map((track) =>
                <li className={styles.li}>
                    <h5>{track.name}</h5>

                    <p>{track.album.name} | {track.artists.map((artist) => artist.name).join(', ')}</p>
                </li>
                )}
            </ul>
        </section>
        
    )
}

export default Track;