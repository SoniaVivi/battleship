import { gameBoard } from "./gameBoard";
import { ship } from "./ship";

export const player = (playerName) => {
  const name = playerName;
  const board = gameBoard();
  const receiveAttack = (coords) => {
    const attackResult = board.receiveAttack(coords);
    if (attackResult[1] !== undefined && attackResult[1] !== "0") {
      _fleet[attackResult[1]][1].hit();
    }
    return attackResult[0];
  };

  const getBoard = () => board.getBoard();
  const _initialShips = () => {
    const fleetData = [
      ["carrier", "C", 5],
      ["battleship", "B", 4],
      ["destroyer", "D", 3],
      ["submarine", "S", 3],
      ["patrol boat", "A", 2],
    ];
    let createdShips = {}; // {C: [carrier, {ship}]}
    fleetData.forEach((shipData) => {
      createdShips[shipData[1]] = [shipData[0], ship(shipData[1], shipData[2])];
    });
    return createdShips;
  };

  const getRemainingShips = () => {
    const checkFunc = (shipData) => {
      if (!shipData[1].isSunk()) {
        return shipData[0];
      }
    };
    return _iterateFleet(checkFunc);
  };

  const getShipStatistics = () => {
    const statisticsFunc = (shipData) => {
      return {
        name: shipData[0],
        length: shipData[1].length,
        hits: shipData[1].getHits(),
      };
    };
    return _iterateFleet(statisticsFunc);
  };

  const _iterateFleet = (func) => {
    let results = [];

    for (const shipInitial in _fleet) {
      results.push(func(_fleet[shipInitial]));
    }
    return results.filter((result) => result !== undefined);
  };

  let _fleet = _initialShips();
  return {
    name,
    board,
    receiveAttack,
    getBoard,
    getRemainingShips,
    getShipStatistics,
  };
};
