import React, { useState } from "react";
import PropTypes from "prop-types";

const Grid = (props) => {
  const [shipCoordinates, setShipCoordinates] = useState([]);

  const getSquareClass = (squareValue) => {
    const classes = { 0: "empty", X: "hit", M: "miss" };
    return squareValue in classes ? classes[squareValue] : "ship";
  };

  const createScale = (useNumbers = true) => {
    let scaleElements = [<div key={"s"}></div>];
    for (let i = 0; i < 10; i += 1) {
      scaleElements.push(
        <div key={i}>{useNumbers ? i + 1 : String.fromCharCode(65 + i)}</div>
      );
    }
    return scaleElements;
  };

  const obscurePositions = (val) =>
    val != "0" && (!props.isTargetBoard || ["X", "M"].includes(val)) ? val : "";

  const placeShip = (e) => {
    const [y, x] = e.target.dataset.pos
      .split(",")
      .map((char) => parseInt(char));
    if (shipCoordinates.length == 1) {
      props.placeShip(...shipCoordinates, [y, x]);
      return setShipCoordinates([]);
    }
    setShipCoordinates([[y, x]]);
  };

  let topScale = createScale();
  let sideScale = createScale(false).slice(1);

  return (
    <React.Fragment>
      <div className="scale top">{topScale}</div>
      <div className="scale side">{sideScale}</div>
      {props.grid.map((row, y) =>
        row.map((square, x) => (
          <div
            key={y + x}
            className={`square ${getSquareClass(square)}${
              shipCoordinates.length > 0 &&
              [y, x].toString() == shipCoordinates[0].toString()
                ? " ship-begin"
                : ""
            }`}
            onClick={
              "attackFunc" in props
                ? () => {
                    props.attackFunc(y, x);
                  }
                : placeShip
            }
            data-pos={[y, x]}
          >
            {obscurePositions(square)}
          </div>
        ))
      )}
    </React.Fragment>
  );
};

Grid.propTypes = {
  grid: PropTypes.array.isRequired,
  attackFunc: PropTypes.func,
  isTargetBoard: PropTypes.bool,
  placeShip: PropTypes.func,
};

export default Grid;
