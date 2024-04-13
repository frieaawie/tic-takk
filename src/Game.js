import React from "react";

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: new Array(9).fill(null),
      count: 0,
      bool: false,
      winnerPlayer: "",
      x : 0,
      o : 0
    };
  }

  lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  check = (e) => {
    let data = e.target.getAttribute("data");
    if (this.state.squares[data] == null) {
      this.state.squares[data] = this.state.count % 2 === 0 ? "X" : "O";
      e.target.style.textShadow =
        this.state.count % 2 === 0
          ? "0 0 2px deeppink,0 0 5px deeppink,0 0 10px deeppink,0 0 20px deeppink,0 0 50px deeppink,0 0 100px deeppink,0 0 200px deeppink"
          : "0 0 2px deepskyblue,0 0 5px deepskyblue,0 0 10px deepskyblue,0 0 20px deepskyblue,0 0 50px deepskyblue,0 0 100px deepskyblue,0 0 200px deepskyblue";
      this.setState({ count: this.state.count + 1 });
      this.setState({ squares: this.state.squares });
    }
    this.winner();
    let win = this.state.count % 2 === 0 ? "X" : "O";
    for (let i = 0; i < this.lines.length; i++) {
      let line = this.lines[i];
      if (
        this.state.squares[line[0]] === win &&
        this.state.squares[line[1]] === win &&
        this.state.squares[line[2]] === win
      ) {
        this.setState({ bool: true });
        this.setState({ winnerPlayer: win + " is Winner" });
        if(win == 'X') {
            let squares = document.querySelectorAll(".square");
            line.forEach((i) => {
                squares[i].classList.add("win-line-X");
            });
            this.setState({x : this.state.x + 1})
        }
        else {
            let squares = document.querySelectorAll(".square");
            line.forEach((i) => {
                squares[i].classList.add("win-line-O");
            });
            this.setState({o : this.state.o + 1})
        }
        return;
      }
    }
    if (this.state.count === 8) {
      this.setState({ bool: true });
      this.setState({ winnerPlayer: "Draw" });
    }
  };

  winner = () => {
    let win = this.state.count % 2 === 0 ? "X" : "O";
    for (let i = 0; i < this.lines.length; i++) {
      let line = this.lines[i];
      if (
        this.state.squares[line[0]] === win &&
        this.state.squares[line[1]] === win &&
        this.state.squares[line[2]] === win
      ) {
        this.setState({ bool: true });
        this.setState({ winnerPlayer: win + " is Winner" });
        return;
      }
    }
    if (this.state.count === 8) {
      this.setState({ bool: true });
      this.setState({ winnerPlayer: "Draw" });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="tic-tac-toe">
          {this.state.squares.map((square, i) => (
            <div
              className="square"
              style={{ pointerEvents: this.state.bool ? "none" : "unset" }}
              key={i}
              data={i}
              onClick={this.check}
            >
              {square}
            </div>
          ))}
        </div>
        <div
          className="message"
          style={{
            transform: this.state.bool
              ? "translateX(-50%) perspective(850px) rotateX(0deg)"
              : "translateX(-50%) perspective(850px) rotateX(-90deg)",
          }}
        >
          <p>{this.state.winnerPlayer}</p>
          <button
            onClick={() => {
              this.setState({ squares: new Array(9).fill(null) });
              this.setState({ count: 0 });
              this.setState({ bool: false });
              setTimeout(() => {
                this.setState({ winnerPlayer: "" });
              }, 1000);
              for (let i = 0; i < this.lines.length; i++) {
                let line = this.lines[i];
                let squares = document.querySelectorAll(".square");
                line.forEach((i) => {
                  squares[i].classList.remove("win-line-X");
                  squares[i].classList.remove("win-line-O");
                });
              }
            
            }}
          >
            Start again
          </button>
          <span>X : {this.state.x}</span>
          <span>О : {this.state.o}</span>
        </div>
        <div className="player">
          PLAYER :{" "}
          <span
            style={{
              textShadow:
                this.state.count % 2 === 0
                  ? "0 0 2px deeppink,0 0 5px deeppink,0 0 10px deeppink,0 0 20px deeppink,0 0 50px deeppink,0 0 100px deeppink,0 0 200px deeppink"
                  : "0 0 2px deepskyblue,0 0 5px deepskyblue,0 0 10px deepskyblue,0 0 20px deepskyblue,0 0 50px deepskyblue,0 0 100px deepskyblue,0 0 200px deepskyblue",
            }}
          >
            {this.state.count % 2 === 0 ? "X" : "O"}
          </span>
        </div>
      </div>
    );
  }
}
