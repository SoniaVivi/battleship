import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { game } from "../gameLogic/game";
import Grid from "./Grid";
import Popup from "./Popup";
import GridWrapper from "./GridWrapper";
import Header from "./Header";

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
    setPlayerName(gameRef.current.getPlayers());
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
      <Header restart={restartGame} />
      <GridWrapper
        playerName={playerName[0]}
        fleetData={playerShips[0]}
        className="col-9"
        grid={<Grid grid={boardData[0]} placeShip={placeShipFunc} />}
      />
      <GridWrapper
        className="target-board col-9"
        playerName={playerName[1]}
        fleetData={playerShips[1]}
        obscureHits={true}
        isTargetBoard={true}
        grid={
          <Grid
            grid={boardData[1]}
            attackFunc={gameVictor === false ? attackSquare : () => {}}
            isTargetBoard={true}
          ></Grid>
        }
      />

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

GameInterface.propTypes = {
  playerOneName: PropTypes.string.isRequired,
  playerTwoName: PropTypes.string.isRequired,
  restartFunc: PropTypes.func.isRequired,
};
export default GameInterface;
