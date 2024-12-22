import {useEffect, useState} from 'react';
import Playlist from './Components/Playlist/Playlist';
import SearchBar from './Components/SearchBar/SearchBar';
import {getPublicToken} from './Components/GetPublicToken';

import styles from './App.module.css';

function App() {

  const [token, setToken] = useState('');
  const [auth, setAuth] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState([]);
  const [nameOfPlaylist, setNameOfPlaylist] = useState('');
  const [listOftracksFindBySearch, setListOftracksFindBySearch] = useState([]);


  //Get the token after the page is fully loaded.
  useEffect(() => {
    async function fetchToken() {
      const theTokenFromAPI = await getPublicToken();
      setToken(theTokenFromAPI);
    }
    fetchToken();
  }, [])

  //SEARCH Result - If there are any songs, after redirect, set the state setListOftracksFindBySearch for them!
  useEffect(() => {
    const savedPlaylist = JSON.parse(sessionStorage.getItem("listOftracksFindBySearch")) || [];
    setListOftracksFindBySearch(savedPlaylist);
  }, []);

  //PLAYLIST - If there are any songs in the playlist, after redirect, set the state of setSelectedTrack!
  useEffect(() => {
    const savedTrack = JSON.parse(sessionStorage.getItem("savedTracksForSeesins")) || [];
    setSelectedTrack(savedTrack);
  }, []);

  /*
    Check if the page after reload had already auth set to true, by seva the auth code into sessionStorage.
    The sessionStarage is clear by closing page!
  */
  useEffect(() => {

    // Check if there's an auth code in the URL on page load
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    
    //If the has the authCode from the url store it in the sessionStorage
    if (authCode) {
      sessionStorage.setItem('authCode', authCode); // Store the auth code in sessionStorage
      setAuth(true); // Mark the user as authenticated
    }
  }, []);


  function addTrackToPlaylist(track) {
    setSelectedTrack((prevSelectedTrack) => {
      if (prevSelectedTrack.some((t) => t.id === track.id)) {
        alert('The song is alredy in Playlist!');
        return prevSelectedTrack; 
        
      }
      const savedTracksForSeesins = [...prevSelectedTrack, track];
      sessionStorage.setItem('savedTracksForSeesins', JSON.stringify(savedTracksForSeesins));
      return savedTracksForSeesins;
    }); 
  }

  function handleNameOfPlaylist(input) {
      if(input === '') {
        alert('sdsd');
        return null;
      }
      setNameOfPlaylist(input)
  }

  function removeTrackFromPlaylist(track) {
    setSelectedTrack((prevSelectedTrack) => {
      const filtered = prevSelectedTrack.filter((t) => t.id !== track.id)

      //Here I have to use the same key!!!! in order to remove the track from the sessions!
      sessionStorage.setItem('savedTracksForSeesins', JSON.stringify(filtered));
      return filtered;
    })
  }

  async function handleAuthProcessToSpotify(e) {
    e.preventDefault();
  
    // Get the authCode from sessionStorage
    const authCode = sessionStorage.getItem('authCode');
  
    // If there's no authCode, initiate the authentication flow
    if (!authCode) {
      alert("Redirecting to Spotify for authentication...");
      try {
        const clientID = process.env.REACT_APP_SPOTIFY_USER_ID;
        const redirectUri = "http://localhost:3000";
        const scopes = [
          "playlist-modify-public",
          "playlist-modify-private",
        ].join(" ");
  
        const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  
        // Redirect the user to Spotify for authentication
        window.location.href = spotifyAuthUrl;
      } catch (error) {
        console.log('Could not sign the user into the Spotify account!', error);
      }
    } else {
      // If there's an authCode, check if the access token exists in sessionStorage
      const theToken = sessionStorage.getItem('theToken');
      
      if (!theToken) {
        // If the token is not available, exchange the authCode for an access token
        try {

          const clientID = process.env.REACT_APP_SPOTIFY_USER_ID;
          const secretID = process.env.REACT_APP_SPOTIFY_SECRET_ID;
   
          const redirectUri = "http://localhost:3000";
  
          const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Basic ' + btoa(clientID + ':' + secretID), // Basic auth for client credentials
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: authCode,
              redirect_uri: redirectUri,
            }),
          });
  
          const data = await response.json();
  
          if (data.access_token) {
            const theToken = data.access_token;
            sessionStorage.setItem('theToken', theToken);  // Save token to sessionStorage
            console.log('Access token saved:', theToken);
            createNamePlaylist(theToken);  // Proceed with playlist creation
          } else {
            console.error('Failed to get access token from Spotify:', data.error);
          }
        } catch (error) {
          console.error('Error exchanging authorization code for access token', error);
        }
      } else {
        // If the token exists, proceed with playlist creation
        createNamePlaylist(theToken);
      }
    }
  }

  async function getUserIDFromSpotify(theToken) {

    //Fetch the endpoint to get the user ID
    if(theToken) {
      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${theToken}`
          }
        });
  
  
        if(!response.ok) {
          const error = await response.json();
          console.error('I reached the API but I got: ', error.error.message);
          return null;
        }
  
        const data = await response.json();
        console.log('Your ID is:', data.id)
        return data.id;
  
      } catch (error) {
        console.error('I could not fetch the user id', error)
      }
    } else {
     
    }
  }

  async function createNamePlaylist(theToken) {
  
    const userIDFromSpotify = await getUserIDFromSpotify(theToken);

    if (!userIDFromSpotify) {
      console.error("Could not retrieve user ID.");
      return;
    }
    
    try {
      
        const response = await fetch(`https://api.spotify.com/v1/users/${userIDFromSpotify}/playlists`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${theToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nameOfPlaylist,  // The name of the new playlist
            public: false,  // Set to true if you want the playlist to be public
          }),
        });
      
        const data = await response.json();

        if(response.ok) {
          
          addAlltracksIntoSpotifytheToken(theToken, data.id)
          alert(`The playlist ${nameOfPlaylist} created successfully!`)
        } else {
          console.error('Failed to create playlist:', data);
        }
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  }

  async function addAlltracksIntoSpotifytheToken(theToken, playlistID) {

    if(!playlistID) {
      console.error('Could not retrieve playlist ID.');
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${theToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: selectedTrack.map((track) => track.uri)
        }),
      });


    const data = await response.json();
    
    if (response.ok) {
      alert("Yeheee!, the playlist with your selections successfully added!")
    } else {
      console.error('Failed to add tracks:', data);
    }
    } catch (error) {
      
    }
  }





  return (
    <div className={styles.container}>
      <SearchBar 
        token={token}
        listOftracksFindBySearch={listOftracksFindBySearch}
        setListOftracksFindBySearch={setListOftracksFindBySearch}
        addTrackToPlaylist={addTrackToPlaylist}
        auth={auth}
      />

    <Playlist 
      selectedTrack={selectedTrack}
      removeTrackFromPlaylist={removeTrackFromPlaylist}
      handleNameOfPlaylist={handleNameOfPlaylist}
      handleAuthProcessToSpotify={handleAuthProcessToSpotify}
      nameOfPlaylist={nameOfPlaylist}
    />
    </div>
  );
}

export default App;
