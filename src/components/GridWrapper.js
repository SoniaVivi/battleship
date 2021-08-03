import React from "react";
import PropTypes from "prop-types";
import ShipViewer from "./ShipViewer";

const GridWrapper = (props) => {
  return (
    <div
      className={`${
        props.isTargetBoard ? "col-12 target-container" : "col-12 col-xl-6"
      } row`}
    >
      <div className="col-3"></div>
      <h1 className="col-9">{props.playerName}&apos;s Ships</h1>
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
        <div className={`${props.className} grid`}>{props.grid}</div>
      </div>
    </div>
  );
};

GridWrapper.propTypes = {
  playerName: PropTypes.string.isRequired,
  fleetData: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
  grid: PropTypes.element.isRequired,
  isTargetBoard: PropTypes.bool,
  obscureHits: PropTypes.bool,
};

export default GridWrapper;
