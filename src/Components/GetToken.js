import {useState, useEffect} from "react";

export function useSpotifyToken() {

    const [token, setToken] = useState(null);

    async function getAccessToSpotify() {
        const clientId = '0e49081f39b5477782421511eeccaa80'; // Replace with your actual Client ID
        const clientSecret = '283c135e48134e0db1df72ef7170f4dc'; // Replace with your actual Client Secret
      
        // Create a Base64-encoded string of `clientId:clientSecret`
        const encodedKey = btoa(`${clientId}:${clientSecret}`);
      
        try {
          const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST', // Correct the method
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${encodedKey}`
            },
            body: new URLSearchParams({
              'grant_type': 'client_credentials'
            })
          });
      
          if (!response.ok) {
            throw new Error(`Error fetching token: ${response.statusText}`);
          }
      
          const data = await response.json();
          setToken(data.access_token);
          return data.access_token;
        } catch (error) {
          console.error('Error:', error);
        }
      }
    
      useEffect(()=> {
        getAccessToSpotify();
      }, []);

      return token;
}