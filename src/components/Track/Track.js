import React from "react";
import "./Track.css";

class Track extends React.Component {
  renderAction() {
    const content = this.props.isRemoval ? "-" : "+";
    return <button className="Track-action">{content}</button>;
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>Track Name</h3>
          <p>Track Artist | Track Album</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
