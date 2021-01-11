import { computerPlayer } from "../computerPlayer";

describe("computerPlayer", () => {
  let moves = [];
  test("generate unique random coordinates between 0 and 9", () => {
    for (let i = 0; i < 100; i += 1) {
      let lastMove = computerPlayer.generateRandomMove();
      expect(moves.includes(lastMove)).toBeFalsy();
      expect(lastMove[0]).toBeLessThan(10);
      expect(lastMove[0]).toBeGreaterThan(-1);
      expect(lastMove[1]).toBeLessThan(10);
      expect(lastMove[1]).toBeGreaterThan(-1);
      moves.push(lastMove);
    }
  });

  test("generateRandomMove() should return undefined", () => {
    expect(computerPlayer.generateRandomMove()).toBeUndefined();
  });

  test("reset past moves", () => {
    computerPlayer.reset();
    expect(moves.includes(computerPlayer.generateRandomMove())).toBeFalsy();
  });
});
