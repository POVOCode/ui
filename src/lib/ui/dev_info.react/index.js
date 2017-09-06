import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import Bus from "../../bus/bus";
import Config from "../../../config";
import "./style.styl";

const DevInfoBar = ({ currentLocation, routes, onLocationChange }) => {
  return (
    <div id="pvc-dev-info-bar">
      <p>DEV MODE</p>

      <p className="label">Config:</p>
      <p className="value">{JSON.stringify(Config)}</p>

      <p className="label">Loc:</p>
      <p className="value">{JSON.stringify(currentLocation.toJS())}</p>

      <p className="label">Bus state:</p>
      <p className="value">{Bus.getDebugInfo()}</p>

      <div id="pvc-dib-route">
        <select
          name="pvc-dib-current-route"
          value={currentLocation.get("route")}
          disabled={!onLocationChange}
          onChange={(e) => {
            if (!onLocationChange) return;

            return onLocationChange(Immutable.fromJS({
              route: e.target.value,
              props: {}
            }));
          }}
        >
          {routes.map(r =>
            <option
              key={r}
              value={r}
            >{r}</option>
          )}
        </select>
      </div>
    </div>
  );
};

DevInfoBar.propTypes = {
  routes: PropTypes.array.isRequired,
  currentLocation: PropTypes.object.isRequired,
  onLocationChange: PropTypes.func,
};

export default DevInfoBar;
