import React from "react";
import PropTypes from "prop-types";

import Bus from "../../bus/bus";
import Config from "../../../config";
import "./style.styl";

const DevInfoBar = ({ bus, currentLocation }) => {
  return (
    <div id="pvc-dev-info-bar">
      <p>DEV MODE</p>

      <p className="label">Config:</p>
      <p className="value">{JSON.stringify(Config)}</p>

      <p className="label">Loc:</p>
      <p className="value">{JSON.stringify(currentLocation.toJS())}</p>

      <p className="label">Bus state:</p>
      <p className="value">{Bus.getDebugInfo()}</p>
    </div>
  );
};

DevInfoBar.propTypes = {
  currentLocation: PropTypes.object.isRequired,
};

export default DevInfoBar;
