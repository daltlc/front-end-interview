//index.js acts basically as Board Component
import React from "react";
import { render } from "react-dom";
import Piece from "./components/Piece.js";
import Space from "./components/Space.js";

class CheckersBoard extends React.Component {
  state = {
    board: [
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [2, 0, 2, 0, 2, 0, 2, 0],
      [0, 2, 0, 2, 0, 2, 0, 2],
      [2, 0, 2, 0, 2, 0, 2, 0]
    ],
    playersTurn: 1,
    moves: 0,
    selected: [],
    gameOver: false
  };

  switchPlayer = (nextPlayer, newBoard) => {
    //Looking through combined array of board state to determine if there are any 1's or 2's left, hence the game would be over
    // let mix = [];
    // let all = [];
    // all.push(this.state.board);
    // for (var i = 0; all.length !== 0; i++) {
    // 	var j = 0;
    // 	while (j < all.length) {
    // 		if (i >= all[j].length) {
    // 			all.splice(j, 1);
    // 		} else {
    // 			mix.push(all[j][i]);
    // 			j += 1;
    // 		}
    // 	}
    // 	mix.forEach((element) => {
    // 		if ((element = 1 && 2)) {
    // 			console.log('keep playing');
    // 		} else {
    // 			this.state.gameOver = true;
    // 			console.log('Out of pieces');
    // 		}
    // 	});
    // }
    // console.log(mix);

    this.setState({
      playersTurn: nextPlayer,
      moves: 0,
      board: newBoard,
      selected: []
    });
  };

  boardChange = (newBoard, newPieceSelected, newMoves) => {
    this.setState({
      board: newBoard,
      selected: newPieceSelected,
      moves: newMoves
    });
  };

  render() {
    const spaceSize = this.props.size / 8;
    const pieceRadius = spaceSize / 2;
    const h2Styles = {
      color: "black",
      textAlign: "center",
      fontFamily: "monospace"
    };
    const boardStyles = { textAlign: "center" };

    return (
      <div style={boardStyles}>
        <h2 style={h2Styles}> PLAYER {this.state.playersTurn}'s TURN</h2>
        <svg
          height={this.props.size}
          width={this.props.size}
          viewBox={`0 0 ${this.props.size} ${this.props.size}`}
        >
          {this.state.board.map((row, y) => {
            const isEvenRow = y % 2;
            const spaceY = spaceSize * y;

            return row.map((space, x) => {
              const isEvenSpace = x % 2;
              const spaceX = spaceSize * x;

              return (
                <Space
                  key={x}
                  shade={
                    (isEvenSpace && !isEvenRow) || (!isEvenSpace && isEvenRow)
                  }
                  size={spaceSize}
                  x={spaceX}
                  y={spaceY}
                  board={this.state.board}
                  spaceSize={spaceSize}
                  selected={this.state.selected}
                  playersTurn={this.state.playersTurn}
                  spaceOnClick={this.boardChange}
                  moves={this.state.moves}
                  switchPlayer={this.switchPlayer}
                />
              );
            });
          })}
          {this.state.board.map((row, y) => {
            const spaceY = spaceSize * y;

            return row.map((space, x) => {
              const spaceX = spaceSize * x;

              if (space === 0) {
                // The space is empty.
                return null;
              }

              return (
                <Piece
                  key={x}
                  centerX={spaceX + pieceRadius}
                  centerY={spaceY + pieceRadius}
                  player={space}
                  radius={pieceRadius * 0.75}
                  onPieceClick={this.boardChange}
                  selected={this.state.selected}
                  spaceSize={spaceSize}
                  moves={this.state.moves}
                  board={this.state.board}
                  playersTurn={this.state.playersTurn}
                />
              );
            });
          })}
        </svg>
      </div>
    );
  }
}

const container = document.createElement("div");
document.body.appendChild(container);
render(<CheckersBoard size={400} />, container);
