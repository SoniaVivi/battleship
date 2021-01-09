export const gameBoard = () => {
  const getBoard = () => _board;
  const placeShip = (start, end, shipInitial) => {
    let [y, x] = start;
    _board[y][x] = shipInitial;

    while (x !== end[1]) {
      x < end[1] ? (x += 1) : (x -= 1);
      _board[y][x] = shipInitial;
    }
    while (y !== end[0]) {
      y < end[0] ? (y += 1) : (y -= 1);
      _board[y][x] = shipInitial;
    }
  };

  const receiveAttack = (coords) => {
    const [y, x] = coords;
    const initials = ["X", "0"];
    !initials.includes(_board[y][x])
      ? (_board[y][x] = "X")
      : (_board[y][x] = "M");
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

  return { getBoard, placeShip, receiveAttack, doShipsRemain };
};
