import styled from "styled-components";

const Grid = (props) => {
  const getSquareClass = (squareValue) => {
    if (squareValue === "0") {
      return "empty";
    } else if (squareValue === "X") {
      return "hit";
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

  let topScale = createScale();
  let sideScale = createScale(false).slice(1);

  return (
    <div className={props.className ? props.className : "grid"}>
      <div className="header top">{topScale.map((elem) => elem)}</div>
      <div className="header side">{sideScale.map((elem) => elem)}</div>
      {props.grid.map((row) => {
        return row.map((square) => {
          return (
            <div className={`square ${getSquareClass(square)}`}>
              {square === "0" ? "" : square}
            </div>
          );
        });
      })}
    </div>
  );
};

export default Grid;
