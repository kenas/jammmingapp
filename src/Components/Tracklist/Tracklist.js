import Track from '../Track/Track';

function Tracklist({listOftracksFindBySearch, addTrackToPlaylist}) {
    return (
        <>
        {listOftracksFindBySearch && listOftracksFindBySearch.map((track) => {
           
          return (
                <Track
                key={track.id}
                track={track}
                addTrackToPlaylist={addTrackToPlaylist}
                onRemove={false}
                /> 
          )
  
        })}
          
        </>   
    )
}

export default Tracklist;