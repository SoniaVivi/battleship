// import { intersect } from "mathjs";
import { gameBoard } from "./gameBoard";

export const computerPlayer = (() => {
  const generateRandomMove = () => _validCoordinates.pop();

  const reset = () => {
    _validCoordinates = _generateValidMoves();
  };

  const _generateValidMoves = () => _shuffle(_generateCoordinatePairs());

  let _generateCoordinatePairs = () => {
    let pairs = [];
    for (let y = 0; y < 10; y += 1) {
      for (let x = 0; x < 10; x += 1) {
        pairs.push([y, x]);
      }
    }
    return pairs;
  };

  let _shuffle = (items) => {
    let array = items;
    for (let i = array.length - 1; i > 0; i -= 1) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const placeShips = () => {
    const fleetData = [
      ["C", 5],
      ["B", 4],
      ["D", 3],
      ["S", 3],
      ["A", 2],
    ];
    let shipPlacements = [];
    let tempBoard = gameBoard();
    for (const shipData of fleetData) {
      let intersectsWithPreviousShips = true;
      let newPlacement;

      while (intersectsWithPreviousShips) {
        intersectsWithPreviousShips = false;
        newPlacement = [..._createPlacement(shipData[1]), shipData[0]];
        if (tempBoard.placeShip(...newPlacement) !== true) {
          intersectsWithPreviousShips = true;
        }
        if (!intersectsWithPreviousShips) {
          shipPlacements.push(newPlacement);
        }
      }
    }

    return shipPlacements;
  };

  const _getRandomNumber = (max) => Math.floor(Math.random() * Math.floor(max));

  const _createPlacement = (size) => {
    let boundPos = _getRandomNumber(10 - size);
    let unboundPos = _getRandomNumber(10);
    let endPointOne = [boundPos, unboundPos];
    let endPointTwo = [boundPos + size - 1, unboundPos];
    if (_getRandomNumber(2) === 0) {
      endPointOne.reverse();
      endPointTwo.reverse();
    }
    return [endPointOne, endPointTwo];
  };

  let _validCoordinates = _generateValidMoves();

  return { generateRandomMove, reset, placeShips };
})();
