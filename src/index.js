import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      spacesLeft: 9
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    let spacesLeft = this.state.spacesLeft
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    spacesLeft -= 1
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      spacesLeft: spacesLeft
    });
  }
  renderSquare(i) {
    return (
            <Square
              value={this.state.squares[i]} 
              onClick={() => this.handleClick(i)} // this passes the function onto Square which it can freely call
            />
          );
  }
  
  render() {
    const arr = [0, 3, 6];
    const listItems = arr.map((num) =>
      <div className="board-row">
        {this.renderSquare(num)}
        {this.renderSquare(num + 1)}
        {this.renderSquare(num + 2)}
      </div>
    );
    const winner = calculateWinner(this.state.squares);
    const draw = this.state.spacesLeft === 0 && !winner
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
      let response = prompt(status + '\nPlay again?').toLowerCase();
      if (response === 'yes') {
        return <Game />
      }
    } else if (draw) {
      status = "Draw";
      let response = prompt(status + '\nPlay again?').toLowerCase();
      if (response === 'yes') {
        return <Game />
      }
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        {listItems}
      </div>
    );
  }
}

function Game(props){
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);