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
    selected: []
  };

  switchPlayer = (nextPlayer, newBoard) => {
    this.setState({
      playersTurn: nextPlayer,
      moves: 0,
      board: newBoard
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

    return (
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
    );
  }
}

const container = document.createElement("div");
document.body.appendChild(container);
render(<CheckersBoard size={400} />, container);
