import React, { Component } from 'react';
import './App.css';
import Board from './Board'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="play-area">
          <Board />
        </div>
      </div>
    );
  }
}

export default App;
