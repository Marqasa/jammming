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
  name: "Orisor",
  artist: "Soen",
  album: "Lykaia",
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
            <SearchResults searchResults={this.state.searchResults} />
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
