import React, { Component } from "react";

import "./App.css";

function Square(props) {
  return (
    <div className="square">
      <div className="content" onClick={props.onClick}>
        {props.value}
      </div>
    </div>
  );
}

class Squares extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.player[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div className="board">
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
      </div>
    );
  }
}
class App extends Component {
  constructor() {
    super();

    this.state = {
      player: [],
      XisNextPlayer: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.winner = this.winner.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  handleClick(i) {
    let player = this.state.player;
    let XisNextPlayer = this.state.XisNextPlayer;
    player[i] = XisNextPlayer ? "O" : "X";
    XisNextPlayer = !XisNextPlayer;
    this.setState({
      player: player,
      XisNextPlayer: XisNextPlayer
    });
    this.winner(player);
  }

  winner(player) {
    let wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < wins.length; i++) {
      const [a, b, c] = wins[i];
      if (player[a] && player[a] === player[b] && player[a] === player[c]) {
        document.querySelector(".winner").classList.add("winning");
      }
    }
  }

  resetGame() {
    this.setState({
      player: [],
      XisNextPlayer: false
    });
    document.querySelector(".winner").classList.remove("winning");
  }

  render() {
    return (
      <div className="App">
        <Squares
          player={this.state.player}
          onClick={i => this.handleClick(i)}
        />
        <div className="winner">
          Winner! {this.state.XisNextPlayer ? "X" : "O"}
        </div>
        <button onClick={this.resetGame} onSubmit={this.resetGame}>
          Start Over
        </button>
      </div>
    );
  }
}

export default App;
