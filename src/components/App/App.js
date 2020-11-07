import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";

const track1 = {
  id: 1,
  uri: "sdoif",
  name: "Roady",
  artist: "Fat Freddy's Drop",
  album: "Based On A True Story",
};
const track2 = {
  id: 2,
  uri: "askdjhfk",
  name: "Orison",
  artist: "Soen",
  album: "Lykaia",
};
const track3 = {
  id: 3,
  uri: "lskdjhf",
  name: "The Nod",
  artist: "Fat Freddy's Drop",
  album: "Dr. Boondigga & The Big BW",
};
const searchResults = [track1, track2, track3];
const playlistName = "Rock and Roll";
const playlistTracks = [track1, track2];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: searchResults,
      playlistName: playlistName,
      playlistTracks: playlistTracks,
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
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

  // Save the playlist
  savePlaylist() {
    // Generate an array of track URIs from the current playlist
    let trackURIs = [];
    this.state.playlistTracks.forEach((track) => {
      trackURIs.push(track.uri);
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
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
