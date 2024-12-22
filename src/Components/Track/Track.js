import styles from './Track.module.css';

function Track({track, addTrackToPlaylist, removeTrackFromPlaylist, onRemove}) {

    function handleAdd() {
        addTrackToPlaylist(track);
      }
    
      function handleRemove() {
        removeTrackFromPlaylist(track);
      }
    
      return (
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <img className={styles.albumImg} src={track.album.images[0].url} width="90" alt={track.name} />
            <div className={styles.cardDetails}>
              <h5 className={styles.cardTitle}>{track.name}</h5>
              <p>{track.name} | {track.artists.map((artist) => artist.name).join(', ')}</p>
            </div>
            <button 
              className={styles.buttonAddToPlay}
              onClick={onRemove ? handleRemove : handleAdd}  // Use specific handler based on isRemove
            >
              {onRemove ? '-' : '+'}
            </button>
          </div>
        </div>
      );
}

export default Track;