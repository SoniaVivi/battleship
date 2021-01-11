const Grid = (props) => {
  const getSquareClass = (squareValue) => {
    if (squareValue === "0") {
      return "empty";
    } else if (squareValue === "X") {
      return "hit";
    } else if (squareValue === "M") {
      return "miss";
    } else {
      return "ship";
    }
  };

  const createScale = (useNumbers = true) => {
    let scaleElements = [<div></div>];
    for (let i = 0; i < 10; i += 1) {
      scaleElements.push(
        <div>{useNumbers ? i + 1 : String.fromCharCode(65 + i)}</div>
      );
    }
    return scaleElements;
  };

  const obscurePositions = (value) => {
    if (value === "0") {
      return "";
    } else if (!props.isTargetBoard || value === "X" || value === "M") {
      return value;
    }
  };

  let topScale = createScale();
  let sideScale = createScale(false).slice(1);

  return (
    <div className={props.className ? props.className : "grid"}>
      <div className="scale top">{topScale.map((elem) => elem)}</div>
      <div className="scale side">{sideScale.map((elem) => elem)}</div>
      {props.grid.map((row, y) => {
        return row.map((square, x) => {
          return (
            <div
              className={`square ${getSquareClass(square)}`}
              onClick={
                "attackFunc" in props ? () => props.attackFunc(y, x) : () => {}
              }
            >
              {obscurePositions(square)}
            </div>
          );
        });
      })}
    </div>
  );
};

export default Grid;