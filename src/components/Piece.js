import React from "react";
import { render } from "react-dom";
class Piece extends React.Component {
  onPieceClick = () => {
    let spaceSize = this.props.spaceSize;
    let col = (this.props.centerX - this.props.radius / 0.75) / spaceSize;
    let row = (this.props.centerY - this.props.radius / 0.75) / spaceSize;
    let board = this.props.board;

    if (
      Math.abs(board[row][col]) === this.props.playersTurn &&
      this.props.moves === 0
    ) {
      let selected = [row, col];
      let selectedRow = selected[0];
      let selectedCol = selected[1];

      if (this.props.selected.length > 0) {
        let lastRowSelected = this.props.selected[0];
        let lastColSelected = this.props.selected[1];
        board[lastRowSelected][lastColSelected] /= 10;
      }

      if (selected.length > 0) {
        board[selectedRow][selectedCol] *= 10;
        this.props.onPieceClick(board, selected, this.props.moves);
      }
    }
  };
  render() {
    return (
      <g style={{ cursor: "pointer" }} onClick={this.onPieceClick}>
        <circle
          cx={this.props.centerX}
          cy={this.props.centerY}
          fill={
            Math.abs(this.props.player) === 1 ||
            Math.abs(this.props.player) === 10
              ? "red"
              : "blue"
          }
          r={this.props.radius}
          stroke={
            Math.abs(this.props.player) === 10 ||
            Math.abs(this.props.player) === 20
              ? "yellow"
              : "black"
          }
          strokeWidth="3"
        />
        {this.props.player < 0 && (
          <text x={this.props.centerX - 5} y={this.props.centerY + 5}>
            K
          </text>
        )}
      </g>
    );
  }
}
export default Piece;
