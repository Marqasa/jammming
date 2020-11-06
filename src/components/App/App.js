import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";

const track1 = {
  id: 1,
  name: "Roady",
  artist: "Fat Freddy's Drop",
  album: "Based On A True Story",
};
const track2 = {
  id: 2,
  name: "Orison",
  artist: "Soen",
  album: "Lykaia",
};
const track3 = {
  id: 3,
  name: "The Nod",
  artist: "Fat Freddy's Drop",
  album: "Dr. Boondigga & The Big BW",
};
const searchResults = [track1, track2];
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

  componentDidMount() {}

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
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
