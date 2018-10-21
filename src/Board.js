import React, { Component } from 'react';
import './App.css';
import GridSpace from './GridSpace'
import PlacementArea from './PlacementArea'

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [
        [{ disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }],
        [{ disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }],
        [{ disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }],
        [{ disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }],
        [{ disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }],
        [{ disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }],
        [{ disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }, { disc: null }],
      ]
    }
  }

  addDisc(targetColumn) {
    const grid = this.state.grid
    const targetRow = this.numberOfFreeSpaces(this.getColumn(targetColumn)) - 1;
    if (targetRow < 0) {
      return;
    }
    grid[targetRow][targetColumn].disc = { number: 1 }
    this.setState({ grid })
  }


  getColumn(targetColumn) {
    return (
      this.state.grid.map((row) => {
        return row[targetColumn];
      })
    )
  }

  numberOfFreeSpaces(column) {
    return (
      column.filter((space) => {
        return space.disc === null
      }).length
    )
  }

  renderGridSpaces() {
    return (
      this.state.grid.map((row, index) => {
        return (
          row.map((space, subIndex) => {
            return (
              <GridSpace key={`${index}-${subIndex}`} xCoord={index} yCoord={subIndex} disc={space.disc} />
            )
          })
        )
      })
    )
  }

  render() {
    return (
      <div>
        <PlacementArea addDisc={this.addDisc.bind(this)} />
        <div className="board">
          {this.renderGridSpaces()}
        </div>
      </div>
    );
  }
}

export default Board;
