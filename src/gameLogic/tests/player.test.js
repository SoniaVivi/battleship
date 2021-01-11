import { player } from "../player";
import { gameBoard } from "../gameBoard";

describe("Player", () => {
  let tempEnemyBoard = gameBoard();
  tempEnemyBoard.placeShip([0, 0], [0, 3], "cruiser");

  let testPlayer = player("Test", tempEnemyBoard);
  const initials = ["M", "X", "0"];

  test("Should return name of the player", () => {
    expect(testPlayer.name).toMatch(/Test/);
  });
});
