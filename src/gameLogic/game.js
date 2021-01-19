import { player } from "./player";
import { computerPlayer } from "./computerPlayer";

export const game = (
  firstPlayerName,
  secondPlayerName,
  useComputerPlayer = true,
  test = false
) => {
  let playerOne = player(firstPlayerName);
  let playerTwo = player(secondPlayerName);
  const _isComputerPlayer = useComputerPlayer;
  let _isPlayerOneTurn = true;
  let _gameVictor = false;

  const launchAttack = (coords) => {
    if (_gameVictor || !_checkIfShipsPlaced()) {
      return;
    }

    let validMove;
    if (_isPlayerOneTurn) {
      validMove = playerTwo.receiveAttack(coords);
    } else {
      validMove = playerOne.receiveAttack(coords);
    }
    _changeTurn(validMove);
    _checkVictoryStatus();
  };

  const getCurrentBoards = () =>
    _isPlayerOneTurn
      ? [playerOne.getBoard(), playerTwo.getBoard()]
      : [playerTwo.getBoard(), playerOne.getBoard()];

  const getVictor = () => (_gameVictor ? _gameVictor : false);

  const getPlayerShips = () =>
    _isPlayerOneTurn
      ? [playerOne.getShipStatistics(), playerTwo.getShipStatistics()]
      : [playerTwo.getShipStatistics(), playerOne.getShipStatistics()];

  const getPlayers = () =>
    _isPlayerOneTurn
      ? [playerOne.name, playerTwo.name]
      : [playerTwo.name, playerOne.name];

  const restart = () => {
    if (_isComputerPlayer) {
      computerPlayer.reset();
    }
  };

  const placeShip = (start, end) => {
    const player = _isPlayerOneTurn ? "playerOne" : "playerTwo";
    if (
      start[0] - end[1] !== 0 &&
      ((start[1] - end[1]) / (start[0] - end[1])) % 1 !== 0
    ) {
      return null;
    }
    const length =
      Math.sqrt((start[0] - end[0]) ** 2 + (start[1] - end[1]) ** 2) + 1;
    if (!_shipData[player][length]) {
      return;
    }
    const shipInitial = _shipData[player][length].pop();
    if (!shipInitial) {
      return null;
    }
    _isPlayerOneTurn
      ? playerOne.board.placeShip(start, end, shipInitial)
      : playerTwo.board.placeShip(start, end, shipInitial);
  };

  const _changeTurn = (result) => {
    if (!result) {
      return;
    }

    if (_isComputerPlayer) {
      playerOne.receiveAttack(computerPlayer.generateRandomMove());
    } else {
      _isPlayerOneTurn = _isPlayerOneTurn === true ? false : true;
    }
  };

  const _checkVictoryStatus = () => {
    if (playerOne.getRemainingShips().length === 0) {
      _gameVictor = playerTwo.name;
    } else if (playerTwo.getRemainingShips().length === 0) {
      _gameVictor = playerOne.name;
    }
  };

  const _checkIfShipsPlaced = () => {
    for (const length in _shipData["playerOne"]) {
      if (_shipData["playerOne"][length].length !== 0) {
        return false;
      }
    }
    return true;
  };

  const _shipData = {
    playerOne: { 5: ["C"], 4: ["B"], 3: ["D", "S"], 2: ["A"] },
    playerTwo: { 5: ["C"], 4: ["B"], 3: ["D", "S"], 2: ["A"] },
  };

  if (test) {
    let coordinates = [
      [[0, 0], [4, 0], "C"],
      [[0, 1], [3, 1], "B"],
      [[0, 2], [2, 2], "D"],
      [[0, 3], [2, 3], "S"],
      [[0, 4], [1, 4], "A"],
    ];
    for (const data of coordinates) {
      playerOne.board.placeShip(...data);
    }
  }

  if (_isComputerPlayer) {
    for (const placement of computerPlayer.placeShips()) {
      playerTwo.board.placeShip(...placement);
    }
  }

  return {
    launchAttack,
    getCurrentBoards,
    getVictor,
    getPlayerShips,
    getPlayers,
    restart,
    placeShip,
  };
};
