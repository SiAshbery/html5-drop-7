import React, { Component } from 'react';
import './App.css';

class PlacementArea extends Component {

  render() {
    return (
      <div className="placement-area">
        {
          [...Array(7)].map((e, index) => <div className="placement-space" key={index} onClick={this.props.addDisc.bind(this, index)} />)
        }
      </div>
    );
  }
}

export default PlacementArea;
