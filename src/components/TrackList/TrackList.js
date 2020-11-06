import React from "react";
import Track from "../Track/Track";
import "./TrackList.css";

function TrackList(props) {
  let tracks;
  if (props.tracks) {
    tracks = props.tracks.map(track => {
        return (
          <Track key={track.id} track={track} />
        );
    });
  }
  return <div className="TrackList">{tracks}</div>;
}

export default TrackList;
