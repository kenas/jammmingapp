export async function getPublicToken() {
    const clientID = '0e49081f39b5477782421511eeccaa80';
    const secretID = '283c135e48134e0db1df72ef7170f4dc';

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