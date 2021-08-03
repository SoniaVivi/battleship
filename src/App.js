import React, { useState } from "react";
import "./styles/style.scss";
import GameInterface from "./components/GameInterface";
import Popup from "./components/Popup";

function App() {
  const [gameInfo, setGameInfo] = useState({
    playerOneName: "Player1",
    playerTwoName: "Computer",
    startGame: false,
  });

  const restartGame = () =>
    setGameInfo((prevInfo) => {
      return {
        ...prevInfo,
        startGame: !prevInfo.startGame,
      };
    });

  if (!gameInfo.startGame) {
    return (
      <div className="popup-wrapper">
        <Popup
          title="Please enter your username"
          body={
            <input
              type="text"
              onChange={(e) =>
                setGameInfo((prevState) => {
                  return { ...prevState, playerOneName: e.target.value };
                })
              }
            ></input>
          }
          className="center"
          close={restartGame}
          closeText="Start!"
        />
      </div>
    );
  } else {
    return (
      <div className="col-12 col-l-10">
        <GameInterface
          playerOneName={gameInfo.playerOneName}
          playerTwoName={gameInfo.playerTwoName}
          restartFunc={restartGame}
        ></GameInterface>
      </div>
    );
  }
}

export default App;
