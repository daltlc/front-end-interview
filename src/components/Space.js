import React from "react";
import { render } from "react-dom";
class Space extends React.Component {
  jumpAllowed = (board, row, col, isKing) => {
    if (this.props.playersTurn === 1 || isKing) {
      try {
        let inBetween = board[row + 1][col + 1];
        if (
          board[row + 2][col + 2] === 0 &&
          inBetween !== 0 &&
          inBetween !== this.props.playersTurn
        ) {
          return true;
        }
      } catch (e) {
        console.log("Jumping is not allowed here");
      }
      try {
        let inBetween = board[row + 1][col - 1];
        if (
          board[row + 2][col - 2] === 0 &&
          inBetween !== 0 &&
          inBetween !== this.props.playersTurn
        ) {
          return true;
        }
      } catch (e) {
        console.log("Jumping is not allowed here");
      }
    }
    if (this.props.playersTurn === 2 || isKing) {
      try {
        let inBetween = board[row - 1][col + 1];
        if (
          board[row - 2][col + 2] === 0 &&
          inBetween !== 0 &&
          inBetween !== this.props.playersTurn
        ) {
          return true;
        }
      } catch (e) {
        console.log("Jumping is not allowed here");
      }
      try {
        let inBetween = board[row - 1][col - 1];
        if (
          board[row - 2][col - 2] === 0 &&
          inBetween !== 0 &&
          inBetween !== this.props.playersTurn
        ) {
          return true;
        }
      } catch (e) {
        console.log("Jumping is not allowed here");
      }
    }
    return false;
  };

  spaceOnClick = () => {
    console.log(this.props.selected);
    let spaceSize = this.props.spaceSize;
    let spaceCol = this.props.x / spaceSize;
    let spaceRow = this.props.y / spaceSize;
    let board = this.props.board;
    let selected = this.props.selected;
    let selectedRow = selected[0];
    let selectedCol = selected[1];
    if (!(board[selectedRow][selectedCol] < 0)) {
      let oneBelow;
      if (this.props.playersTurn === 1) {
        oneBelow = spaceRow - selectedRow;
      } else {
        oneBelow = selectedRow - spaceRow;
      }
      if (
        board[spaceRow][spaceCol] === 0 &&
        oneBelow === 1 &&
        Math.abs(spaceCol - selectedCol) === 1 &&
        this.props.moves < 1
      ) {
        this.movePiece(
          board,
          selectedRow,
          selectedCol,
          selected,
          spaceRow,
          spaceCol,
          -1,
          -1
        );
        this.switchPlayer(board, spaceRow, spaceCol);
      } else if (
        board[spaceRow][spaceCol] === 0 &&
        oneBelow === 2 &&
        Math.abs(spaceCol - selectedCol) === 2
      ) {
        let inBetweenRow;
        let inBetweenCol;
        if (spaceCol > selectedCol) {
          inBetweenCol = spaceCol - 1;
        } else {
          inBetweenCol = spaceCol + 1;
        }
        if (this.props.playersTurn === 1) {
          inBetweenRow = spaceRow - 1;
        } else {
          inBetweenRow = spaceRow + 1;
        }
        if (
          board[inBetweenRow][inBetweenCol] !== 0 &&
          board[inBetweenRow][inBetweenCol] !== this.props.playersTurn
        ) {
          this.movePiece(
            board,
            selectedRow,
            selectedCol,
            selected,
            spaceRow,
            spaceCol,
            inBetweenRow,
            inBetweenCol
          );
          if (!this.jumpAllowed(board, spaceRow, spaceCol, false)) {
            this.switchPlayer(board, spaceRow, spaceCol);
          }
        }
      } else {
        console.log("Nope");
      }
    } else {
      if (
        board[spaceRow][spaceCol] === 0 &&
        Math.abs(spaceRow - selectedRow) === 1 &&
        Math.abs(spaceCol - selectedCol) === 1 &&
        this.props.moves < 1
      ) {
        this.movePiece(
          board,
          selectedRow,
          selectedCol,
          selected,
          spaceRow,
          spaceCol,
          -1,
          -1
        );
        this.switchPlayer(board, spaceRow, spaceCol);
      } else if (
        board[spaceRow][spaceCol] === 0 &&
        Math.abs(spaceRow - selectedRow) === 2 &&
        Math.abs(spaceCol - selectedCol) === 2
      ) {
        let inBetweenRow;
        let inBetweenCol;
        if (spaceCol > selectedCol) {
          inBetweenCol = spaceCol - 1;
        } else {
          inBetweenCol = spaceCol + 1;
        }
        if (spaceRow > selectedRow) {
          inBetweenRow = spaceRow - 1;
        } else {
          inBetweenRow = spaceRow + 1;
        }
        if (
          board[inBetweenRow][inBetweenCol] !== 0 &&
          Math.abs(board[inBetweenRow][inBetweenCol]) !== this.props.playersTurn
        ) {
          this.movePiece(
            board,
            selectedRow,
            selectedCol,
            selected,
            spaceRow,
            spaceCol,
            inBetweenRow,
            inBetweenCol
          );
          if (!this.jumpAllowed(board, spaceRow, spaceCol, true)) {
            this.switchPlayer(board, spaceRow, spaceCol);
          }
        }
      }
    }
  };

  movePiece = (
    board,
    selectedRow,
    selectedCol,
    selected,
    spaceRow,
    spaceCol,
    inBetweenRow,
    inBetweenCol
  ) => {
    let temp = board[selectedRow][selectedCol];
    board[selectedRow][selectedCol] = 0;
    selected = [spaceRow, spaceCol];
    if (
      this.props.playersTurn === 1 &&
      spaceRow === board.length - 1 &&
      temp > 0
    ) {
      board[spaceRow][spaceCol] = -1 * temp;
    } else if (this.props.playersTurn === 2 && spaceRow === 0 && temp > 0) {
      board[spaceRow][spaceCol] = -1 * temp;
    } else {
      board[spaceRow][spaceCol] = temp;
    }
    let newMoves = this.props.moves;
    newMoves++;
    if (inBetweenRow > 0 && inBetweenCol > 0) {
      board[inBetweenRow][inBetweenCol] = 0;
    }
    this.props.spaceOnClick(board, selected, newMoves);
  };

  switchPlayer = (board, spaceRow, spaceCol) => {
    board[spaceRow][spaceCol] /= 10;
    if (this.props.playersTurn === 1) {
      this.props.switchPlayer(2, board);
    } else {
      this.props.switchPlayer(1, board);
    }
  };
  render() {
    return (
      <rect
        fill={this.props.shade ? "grey" : "lightgray"}
        height={this.props.size}
        width={this.props.size}
        x={this.props.x}
        y={this.props.y}
        onClick={this.spaceOnClick}
      />
    );
  }
}
export default Space;
