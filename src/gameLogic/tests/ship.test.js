import { ship } from "../ship";

describe("ship", () => {
  test("Ship should return proper initial attributes", () => {
    let testShip = ship("S", 5, "Player1");
    let testShipTwo = ship("S", 5);
    expect(testShip.length).toBe(5);
    expect(testShip.belongsTo()).toMatch(/Player1/);
    expect(testShipTwo.belongsTo()).toMatch(/none/);
    expect(testShip.isSunk()).toBeFalsy();
  });

  test("Ship should accurately call isSunk", () => {
    let testShip = ship("S", 3);
    testShip.hit();
    expect(testShip.isSunk()).toBeFalsy();
    testShip.hit();
    expect(testShip.isSunk()).toBeFalsy();
    testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();
  });
});
