import React, { useState } from "react";
import { game } from "./gameLogic/game";
import Grid from "./components/grid";
import "./styles/style.scss";

function App() {
  const [currentGame, setCurrentGame] = useState(game("Test1", "Test2", true));
  let currentPlayer = useState("0");
  const [playerBoardData, targetBoardData] = currentPlayer
    ? currentGame.getPlayerOneBoards()
    : currentGame.getPlayerTwoBoards();
  return (
    <div className="body">
      <Grid grid={playerBoardData.getBoard()} className="grid" />
      <Grid grid={targetBoardData} className="target-board"></Grid>
    </div>
  );
}

export default App;
