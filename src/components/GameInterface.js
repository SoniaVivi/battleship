import React, { useState, useRef } from "react";
import { game } from "../gameLogic/game";
import Grid from "./Grid";
import DescriptionPopup from "./DescriptionPopup";
import Popup from "./Popup";

const GameInterface = (props) => {
  const gameRef = useRef(game(props.playerOneName, props.playerTwoName));
  const [gameVictor, setGameVictor] = useState(false);
  const [playerName, setPlayerName] = useState(gameRef.current.getPlayers());
  const [showDescription, setShowDescription] = useState(false);
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
    if (gameWinner) {
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
    <React.Fragment>
      {showDescription ? (
        <DescriptionPopup close={() => setShowDescription(false)} />
      ) : (
        ""
      )}
      <ul className="nav nav-pills">
        <li className="nav-item oval-button">
          <button className="nav-link" onClick={restartGame}>
            Restart
          </button>
        </li>
        <li className="nav-item description oval-button">
          <button
            className="nav-link "
            onClick={() => setShowDescription(true)}
          >
            How to Play
          </button>
        </li>
      </ul>
      <Grid
        grid={boardData[0]}
        className="col-9"
        placeShip={placeShipFunc}
        playerName={playerName[0]}
        fleetData={playerShips[0]}
      />
      <Grid
        grid={boardData[1]}
        attackFunc={gameVictor === false ? attackSquare : () => {}}
        className="target-board col-9"
        isTargetBoard={true}
        playerName={playerName[1]}
        fleetData={playerShips[1]}
        obscureHits={true}
      ></Grid>
      {gameVictor ? (
        <Popup
          title={gameVictor == props.playerOneName ? "Victory!" : "Defeat!"}
          body={`${gameVictor} has won!`}
          close={restartGame}
          closeText="Restart"
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
export default GameInterface;
