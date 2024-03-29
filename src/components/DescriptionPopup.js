import React from "react";
import PropTypes from "prop-types";
import Popup from "./Popup";

const DescriptionPopup = (props) => {
  return (
    <Popup
      title="How to Play"
      body={
        <React.Fragment>
          <p>
            Place Ships by clicking on where you want the ship to start and end
            in the top-left grid
          </p>
          <p>Attack Enemy Ships by clicking on the big center grid</p>
        </React.Fragment>
      }
      close={props.close}
    />
  );
};

DescriptionPopup.propTypes = {
  close: PropTypes.func.isRequired,
};

export default DescriptionPopup;
