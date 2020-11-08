import * as Constants from "./Constants";
let accessToken = "";

const Spotify = {
  // Get a user's access token
  getAccessToken() {
    // If the access token already exists, return it
    if (accessToken) {
      return accessToken;
    }

    // Check the window url for an access token and expires in match
    console.log(window.location.href);
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    console.log(accessTokenMatch + " " + expiresInMatch);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Set the expiry time for the access token
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");

      console.log("After fetch " + accessToken);
      return accessToken;
    } else {
      // Direct the user to the authorization page
      window.location = `https://accounts.spotify.com/authorize?client_id=${Constants.clientId}&redirect_uri=${Constants.redirectUri}&scope=${Constants.scope}&response_type=token`;
    }
  },

  // Search for tracks on Spotify with the requested term
  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const url = `${Constants.baseUri}/v1/search?type=track&q=${term}`;
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // Query the Spotify API and await a response
    try {
      const response = await fetch(url, options);

      // Check the response is ok
      if (response.ok) {
        // Convert the response to JSON
        const jsonResponse = await response.json();

        // Check the JSNO response contains a tracks object
        if (jsonResponse.tracks) {
          // Return an array of track objects
          return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }));
        }
      }
    } catch (error) {
      console.log(console.error);
    }
    // If no tracks were found or an error occured, return an empty array
    return [];
  },

  // Save the playlist to the user's Spotify account
  async savePlaylist(name, trackUris) {
    // Check both arguments contain values
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const url = `${Constants.baseUri}/v1/me`;
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await fetch(url, headers);

      if (response.ok) {
        const jsonResponse = await response.json();
        const userId = jsonResponse.id;
        const url = `${Constants.baseUri}/v1/users/${userId}/playlists`;

        // Set POST options for our query
        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ name: name }),
        };

        try {
          const response = await fetch(url, options);

          if (response.ok) {
            const jsonResponse = await response.json();
            const playlistId = jsonResponse.id;
            const url = `${Constants.baseUri}/v1/users/${userId}/playlists/${playlistId}/tracks`;
            const options = {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({ uris: trackUris }),
            };

            try {
              const response = await fetch(url, options);
              return response;
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default Spotify;
