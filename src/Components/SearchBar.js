//user input into seachbar getting data
import React, {useState} from "react";
import SearchResult from './SearchResults';

import styles from './SearchBar.module.css';

function SearchBar({token, addToPlaylist}) {

    const [search, setSearch] = useState('');
    const [tracks, setTracks] = useState([]);
    

    function handleChange(e) {
        setSearch(e.target.value);
    }

    async function handleSearch(e) {
        e.preventDefault();

        try {

            const response = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=track`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })

            const data = await response.json();
            
            //console.log(data.tracks.items);
            setTracks(data.tracks.items);

            //Set back the input empty
            setSearch('');

        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <>
            <form onSubmit={handleSearch} className={styles.searchBar}>
                <input 
                    type="text"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search for a song ..."/>
                <button className={styles.buttonSearch}>Search</button>
            </form>
            <SearchResult listOftracks={tracks} addToPlaylist={addToPlaylist}/>
        </>
    )
}

export default SearchBar;