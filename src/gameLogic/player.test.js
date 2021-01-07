import { player } from "./player";

describe("Player", () => {
  let testPlayer = player("Test");
  test("Should return name of the player", () => {
    expect(testPlayer.name).toMatch(/Test/);
  });
});
