import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
    };
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  // Search for tracks on Spotify with the requested term
  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
  }

  // Save the playlist to the user's Spotify account
  savePlaylist() {
    // Create an array of track URIs from the current playlist
    const trackUris = this.state.playlistTracks.map((track) => track.uri);

    // Once the playlist has saved, reset playlistName and playlistTracks
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      });
    });
  }

  // Add a new track to the playlist
  addTrack(track) {
    // Get a copy of the current playlist
    const playlistTracks = this.state.playlistTracks;

    // Check if the current playlist already contains the new track
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    // If not, add the new track to the playlist
    playlistTracks.push(track);
    this.setState({
      playlistTracks: playlistTracks,
    });
  }

  // Remove a track from the playlist
  removeTrack(track) {
    // Create a new playlist that doesn't contain the track to remove
    const playlistTracks = this.state.playlistTracks.filter(
      (savedTrack) => savedTrack.id !== track.id
    );

    // Update the state playlist
    this.setState({
      playlistTracks: playlistTracks,
    });
  }

  // Update the playlist's name
  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
