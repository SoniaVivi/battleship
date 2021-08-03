import React, { useState } from "react";
import PropTypes from "prop-types";
import DescriptionPopup from "./DescriptionPopup";

const Header = (props) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <React.Fragment>
      {showDescription ? (
        <DescriptionPopup close={() => setShowDescription(false)} />
      ) : (
        ""
      )}
      <ul className="nav nav-pills">
        <li className="nav-item oval-button">
          <button className="nav-link" onClick={props.restart}>
            Restart
          </button>
        </li>
        <li className="nav-item description oval-button">
          <button
            className="nav-link "
            onClick={() => setShowDescription(true)}
          >
            How to Play
          </button>
        </li>
      </ul>
    </React.Fragment>
  );
};

Header.propTypes = {
  restart: PropTypes.func.isRequired,
};

export default Header;
