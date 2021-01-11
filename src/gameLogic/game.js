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
    if (_gameVictor) {
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
    let computerShips = computerPlayer.placeShips();
    for (const placement of computerShips) {
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
  };
};
