import "./styles/style.scss";
import GameInterface from "./components/GameInterface";
import React, { useState } from "react";

function App() {
  const [gameInfo, setGameInfo] = useState({
    playerOneName: "",
    playerTwoName: "Computer",
    startGame: "false",
  });

  const changeInfo = () => {
    setGameInfo((prevInfo) => {
      let newInfo = { ...prevInfo };
      if (newInfo.playerOneName && newInfo.playerTwoName) {
        newInfo.startGame = newInfo.startGame === "false" ? "true" : "false";
      }
      return newInfo;
    });
  };

  if (gameInfo.startGame === "false") {
    return (
      <div className="start-game-screen">
        <label>Please enter username</label>
        <input
          type="text"
          onChange={(e) => (gameInfo.playerOneName = e.target.value)}
        ></input>
        <button onClick={changeInfo}>Start!</button>
      </div>
    );
  } else if (gameInfo.startGame === "true") {
    return (
      <div>
        <GameInterface
          playerOneName={gameInfo.playerOneName}
          playerTwoName={gameInfo.playerTwoName}
          restartFunc={changeInfo}
        ></GameInterface>
        <div className="game-description">
          <h1>How To Play:</h1>
          <p>
            Place Ships by clicking on where you want the ship to start and end
            in the top-right grid
          </p>
          <p>Attack Enemy Ships by clicking on the big center grid</p>
        </div>
      </div>
    );
  }
}

export default App;
