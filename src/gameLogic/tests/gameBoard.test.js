import { gameBoard } from "../gameBoard";

describe("gameBoard", () => {
  let board = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => "0")
  );
  let testGameBoard = gameBoard();

  test("Initial board should be blank", () => {
    expect(testGameBoard.getBoard()).toEqual(board);
  });

  test("Should be able to place ships", () => {
    board[0][0] = "S";
    board[1][0] = "S";
    board[2][0] = "S";
    testGameBoard.placeShip([0, 0], [2, 0], "S");
    expect(testGameBoard.getBoard()).toEqual(board);
  });

  test("Should be able track attacks and report if all ships have been sunk", () => {
    board[0][1] = "M";
    testGameBoard.receiveAttack([0, 1]);
    expect(testGameBoard.getBoard()).toEqual(board);
    expect(testGameBoard.doShipsRemain()).toBeTruthy();

    board[0][0] = "X";
    testGameBoard.receiveAttack([0, 0]);
    expect(testGameBoard.getBoard()).toEqual(board);
    expect(testGameBoard.doShipsRemain()).toBeTruthy();

    board[1][0] = "X";
    board[2][0] = "X";
    testGameBoard.receiveAttack([1, 0]);
    testGameBoard.receiveAttack([2, 0]);
    expect(testGameBoard.getBoard()).toEqual(board);
    expect(testGameBoard.doShipsRemain()).toBeFalsy();
  });
});
