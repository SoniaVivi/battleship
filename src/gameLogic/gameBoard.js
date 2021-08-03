export const gameBoard = () => {
  const getBoard = () => _board;
  const placeShip = (start, end, shipInitial) => {
    let currentValues = _iterateBoard(start, end, (y, x) => _board[y][x]);
    if (currentValues.every((val) => val == "0")) {
      _iterateBoard(start, end, (y, x) => {
        _board[y][x] = shipInitial;
      });
      return true;
    }
    return null;
  };

  const receiveAttack = (coords) => {
    const [y, x] = coords;
    if (_board[y][x] === "X" || _board[y][x] === "M") {
      return false;
    }
    const hitResult = _board[y][x];
    return [
      _board[y][x] !== "0" ? (_board[y][x] = "X") : (_board[y][x] = "M"),
      hitResult,
    ];
  };

  const doShipsRemain = () => {
    for (const row of _board) {
      for (const column of row) {
        if (column !== "0" && column !== "X" && column !== "M") {
          return true;
        }
      }
    }
    return false;
  };

  let _board = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => "0")
  );

  const _iterateBoard = (startPoint, endPoint, func) => {
    let [y, x] = startPoint;
    let results = [func(y, x)];
    while ([y, x].join("") != endPoint.join("")) {
      if (y != endPoint[0]) {
        y < endPoint[0] ? (y += 1) : (y -= 1);
      }
      if (x != endPoint[1]) {
        x < endPoint[1] ? (x += 1) : (x -= 1);
      }
      results.push(func(y, x));
    }
    return results;
  };

  // const obscurePositions = () => {
  //   const _nonShipInitials = ["X", "0"];
  //   let tempBoard = [..._board];
  //   tempBoard.forEach((row, i) => {
  //     row.forEach((column, y) => {
  //       if (!_nonShipInitials.includes(column)) {
  //         tempBoard[i][y] = "0";
  //       }
  //     });
  //   });
  //   return tempBoard;
  // };

  return {
    getBoard,
    placeShip,
    receiveAttack,
    doShipsRemain,
    // obscurePositions,
  };
};
