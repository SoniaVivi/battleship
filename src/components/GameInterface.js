import React, { useState, useRef } from "react";
import { game } from "../gameLogic/game";
import Grid from "./Grid";
import ShipViewer from "./ShipViewer";

const GameInterface = (props) => {
  const gameRef = useRef(game(props.playerOneName, props.playerTwoName));
  const [gameVictor, setGameVictor] = useState(false);
  const [playerName, setPlayerName] = useState(gameRef.current.getPlayers());
  const [playerShips, setPlayerShips] = useState(
    gameRef.current.getPlayerShips
  );

  const [boardData, setBoardData] = useState(
    gameRef.current.getCurrentBoards()
  );

  const updatePlayerData = () => {
    setPlayerShips(gameRef.current.getPlayerShips());
    setPlayerName(gameRef.current.getPlayers);
    setBoardData(gameRef.current.getCurrentBoards());
  };

  const attackSquare = (y, x) => {
    const tempData = gameRef.current;
    tempData.launchAttack([y, x]);
    const gameWinner = tempData.getVictor();
    gameRef.current = tempData;

    updatePlayerData();
    if (gameWinner !== false) {
      setGameVictor(gameWinner);
    }
  };

  const restartGame = () => {
    let tempData = gameRef.current;
    tempData.restart();
    gameRef.current = tempData;

    updatePlayerData();
    props.restartFunc();
  };

  const placeShipFunc = (start, end) => {
    const tempData = gameRef.current;
    tempData.placeShip(start, end);
    gameRef.current = tempData;
    updatePlayerData();
  };

  return (
    <div className="body">
      <h1>{playerName[0]}'s Ships</h1>
      <div className="grid-container">
        <ShipViewer fleetData={playerShips[0]}></ShipViewer>
        <Grid grid={boardData[0]} className="grid" placeShip={placeShipFunc} />
      </div>
      <h1>Attack Board</h1>
      <div className="grid-container target-board">
        <Grid
          grid={boardData[1]}
          attackFunc={gameVictor === false ? attackSquare : () => {}}
          className="target-board"
          isTargetBoard="true"
        ></Grid>
        <ShipViewer fleetData={playerShips[1]} obscureHits="true"></ShipViewer>
      </div>
      {gameVictor
        ? (() => {
            return (
              <div className="victory">
                <div></div>
                <h1>{gameVictor} has won!</h1>
              </div>
            );
          })()
        : ""}
      <button className="game-menu" onClick={restartGame}>
        Restart
      </button>
    </div>
  );
};
export default GameInterface;
