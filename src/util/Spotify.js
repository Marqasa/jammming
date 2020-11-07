const CLIENT_ID = "a86a7569f68e4686a8f7fae4c8f21e26";
const REDIRECT_URI = "http://localhost:3000/";
let accessToken;
let expiresIn;

const Spotify = {
  // Get a user's access token
  getAccessToken() {
    // If accessToken already exists, return
    if (accessToken) return;

    // Check if the url response contains the access token
    if (window.location.href.includes("access_token")) {
      // Get the hash response from the url
      const hash = window.location.hash.substring(1);

      // Parse the response into an object
      const response = hash.split("&").reduce((result, item) => {
        let parts = item.split("=");
        result[parts[0]] = parts[1];
        return result;
      }, {});

      // Set access token and expiry date
      accessToken = response.access_token;
      expiresIn = response.expiresIn;

      // Set the expiry time for the access token
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      // Direct the user to the authorization page
      window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
    }
  },

  // Search Spotify for the requested term
  async search(term) {
    // Make sure accessToken is set
    if (!accessToken) {
      this.getAccessToken();
    }

    // Await the API response
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Convert the response to JSON
    const jsonResponse = await response.json();

    // Check the response contains a tracks object
    if (jsonResponse.tracks) {
      // Parse the items in the tracks object
      return jsonResponse.tracks.items.map((track) => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        };
      });
    } else {
      return [];
    }
  },
};

export default Spotify;
