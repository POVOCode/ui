import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import { mergeClassNames } from "../../util/methods";
import "./style.styl";

const NavBar = ({ currentLocation, navigate }) => {
  const route = currentLocation.get("route");

  return (
    <nav id="pv-navbar">
    </nav>
  );
};

NavBar.propTypes = {
  navigate: PropTypes.func.isRequired,
  currentLocation: PropTypes.object,
};

export default NavBar;
