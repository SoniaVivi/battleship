import { gameBoard } from "./gameBoard";

export const player = (playerName, enemyBoard = "") => {
  const name = playerName;
  const board = gameBoard();
  const getTargetBoard = () => {
    let tempBoard = [..._enemyBoard.getBoard()];
    tempBoard.forEach((row, i) => {
      row.forEach((column, y) => {
        if (!_nonShipInitials.includes(column)) {
          tempBoard[i][y] = "0";
        }
      });
    });
    return tempBoard;
  };

  const attack = async (coords) => {
    await _enemyBoard.receiveAttack(coords);
  };

  const setEnemyBoard = (enemyBoard) => {
    _enemyBoard = enemyBoard;
  };

  let _enemyBoard = enemyBoard;
  const _nonShipInitials = ["X", "0"];

  return { name, getTargetBoard, attack, board, setEnemyBoard };
};
