import React, { useState } from "react";
import ShipViewer from "./ShipViewer";

const Grid = (props) => {
  const [shipCoordinates, setShipCoordinates] = useState([]);

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
      <div
        className={`${
          props.isTargetBoard ? "col-12 target-container" : "col-12 col-xl-6"
        } row`}
      >
        <div className="col-3"></div>
        <h1 className="col-9">{props.playerName}'s Ships</h1>
        <div className="w-100"></div>
        <div className="row col-12">
          {props.isTargetBoard ? (
            <div className="col-1 col-xl-3 xl-padding"></div>
          ) : (
            ""
          )}
          <ShipViewer
            fleetData={props.fleetData}
            className={props.isTargetBoard ? "col-2 col-xl-1" : "col-3"}
            obscureHits={props.obscureHits}
          ></ShipViewer>
          <div className={`${props.className} grid`}>
            <div className="scale top">{topScale.map((elem) => elem)}</div>
            <div className="scale side">{sideScale.map((elem) => elem)}</div>
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
                      ? () => props.attackFunc(y, x)
                      : placeShip
                  }
                  data-pos={[y, x]}
                >
                  {obscurePositions(square)}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Grid;
