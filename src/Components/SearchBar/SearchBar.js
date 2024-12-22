//user input into seachbar getting data
import React, {useState} from "react";
import SearchResult from '../SearchResult/SearchResults';

import styles from './SearchBar.module.css';

function SearchBar({token, addToPlaylist, listOftracksFindBySearch, setListOftracksFindBySearch, addTrackToPlaylist}) {

    const [search, setSearch] = useState('');
    const [toggleErrorMessage, setToggleErrorMessage] = useState(false);
   
    
    function handleChange(e) {
        setSearch(e.target.value);
    }

    async function handleSearch(e) {
        e.preventDefault();

        if(search === '') {
            setToggleErrorMessage(true);
            return null;
        }
        setToggleErrorMessage(false)

        try {

            const response = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=track`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })

            const data = await response.json();
            
            setListOftracksFindBySearch(data.tracks.items);
            sessionStorage.setItem('listOftracksFindBySearch', JSON.stringify(data.tracks.items));
         
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
                    name="search"
                    type="text"
                    value={search}
                    onChange={handleChange}
                    placeholder="Search for a song ..."/>
                <button className={styles.buttonSearch}>Search</button>
                <p className={styles.errorMessage}></p>
                {toggleErrorMessage ? "Please write a name of the song!" : ''}
            </form>

            <SearchResult 
                listOftracksFindBySearch={listOftracksFindBySearch} 
                addToPlaylist={addToPlaylist}
                addTrackToPlaylist={addTrackToPlaylist}
            />
        </>
    )
}

export default SearchBar;