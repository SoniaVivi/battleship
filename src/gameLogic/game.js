import { player } from "./player";
import { ship } from "./ship";

export const game = (firstPlayerName, secondPlayerName, test = false) => {
  let playerOne = player(firstPlayerName);
  let playerTwo = player(secondPlayerName, playerOne.board);
  playerOne.setEnemyBoard(playerTwo.board);

  const launchAttack = async (coords, attackingPlayer) => {
    if (!attackingPlayer) {
      new Promise(() => playerOne.attack(coords))
        .then(() => playerTwo.board.receiveAttack(coords))
        .then(console.log("Done!"));
    } else {
      new Promise(() => playerTwo.attack(coords)).then(
        playerOne.board.receiveAttack(coords)
      );
    }
  };

  const getPlayerOneBoards = () => [
    playerOne.board,
    playerOne.getTargetBoard(),
  ];

  const getPlayerTwoBoards = () => [
    playerTwo.board,
    playerTwo.getTargetBoard(),
  ];

  const _initialShips = (playerName) => {
    const fleetData = [
      ["carrier", "C", 5],
      ["battleship", "B", 4],
      ["destroyer", "D", 3],
      ["submarine", "S", 3],
      ["patrol boat", "A", 2],
    ];
    let fleet = {};
    fleetData.forEach(
      (data) => (fleet[data[0]] = ship(data[1], data[2], playerName))
    );
    return fleet;
  };

  const _playerOneShips = { ..._initialShips(firstPlayerName) };
  const _playerTwoShips = { ..._initialShips(secondPlayerName) };

  if (test) {
    let coordinates = [
      [[0, 0], [5, 0], "C"],
      [[0, 1], [4, 1], "B"],
      [[0, 2], [3, 2], "D"],
      [[0, 3], [3, 3], "S"],
      [[0, 4], [2, 4], "A"],
    ];
    for (const data of coordinates) {
      playerOne.board.placeShip(...data);
    }
    for (const data of coordinates) {
      playerTwo.board.placeShip(...data);
    }
    launchAttack([0, 0], 0);
  }

  return { launchAttack, getPlayerOneBoards, getPlayerTwoBoards };
};
