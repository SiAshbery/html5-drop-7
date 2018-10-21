import React, { Component } from 'react';
import './App.css';

class GridSpace extends Component {
  constructor(props) {
    super(props);
  }

  renderNumber() {
    if (this.props.disc) {
      return (
        <div className="disc">{this.props.disc.number}</div>
      )
    }
  }
  render() {
    return (
      <div className="grid-space" id={`${this.props.xCoord}-${this.props.yCoord}`}>
        {this.renderNumber()}
      </div>
    );
  }
}

export default GridSpace;
