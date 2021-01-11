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
      newInfo.startGame = newInfo.startGame === "false" ? "true" : "false";
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
      </div>
    );
  }
}

export default App;
