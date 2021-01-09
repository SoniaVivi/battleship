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

  test("Target board should hide enemy ships", async () => {
    let tempBoard = [...tempEnemyBoard.getBoard()];

    for (let i = 0; i < 10; i += 1) {
      for (let y = 0; y < 10; y += 1) {
        if (!initials.includes(tempBoard[i][y])) {
          tempBoard[i][y] = "0";
        }
      }
    }
    const board = await testPlayer.getTargetBoard();
    expect(board).toEqual(tempBoard);
  });

  test("Target board should report hits", async () => {
    await testPlayer.attack([0, 0]);
    const board = await testPlayer.getTargetBoard();
    window.setTimeout(() => expect(board[0][0]).toMatch(/X/), 50);
  });
});
