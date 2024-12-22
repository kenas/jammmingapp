export async function getPublicToken() {
    const clientID = process.env.REACT_APP_SPOTIFY_USER_ID;
    const secretID = process.env.REACT_APP_SPOTIFY_SECRET_ID;

    // Base64 encode the client ID and secret
    const encodedCredentials = btoa(`${clientID}:${secretID}`);

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${encodedCredentials}`, // Correct Authorization format
            },
            body: "grant_type=client_credentials", // Request a client credentials token
        });

        if (response.ok) {
            const data = await response.json();
            //console.log("Access Token:", data.access_token); 
            return data.access_token;
        } else {
            console.error("Failed to get token, response status:", response.status);
        }
    } catch (error) {
        console.error('The request to get the token failed!', error);
    }
}