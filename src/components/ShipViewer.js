import React from "react";
import PropTypes from "prop-types";

const ShipViewer = (props) => {
  const shipName = (name) => name.slice(0, 1).toUpperCase() + name.slice(1);

  const generateHealthBar = (length, hits) =>
    [...Array(length)].map((_, i) => (
      <div
        key={i}
        className={`health-segment${
          i <= hits - 1 && hits != 0 && (hits == length || !props.obscureHits)
            ? " hit"
            : ""
        }`}
      ></div>
    ));

  return (
    <div className={`${props.className} ship-viewer`}>
      {props.fleetData.map((ship, i) => (
        <div className="health-bar" key={i}>
          <p className={ship.length == ship.hits ? "sunk" : ""}>
            {shipName(ship.name)}
          </p>
          {generateHealthBar(ship.length, ship.hits)}
        </div>
      ))}
    </div>
  );
};

ShipViewer.propTypes = {
  className: PropTypes.string.isRequired,
  fleetData: PropTypes.array.isRequired,
  obscureHits: PropTypes.bool,
};

export default ShipViewer;
