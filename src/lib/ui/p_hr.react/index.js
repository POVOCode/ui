import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import "./style.styl";

const PHR = ({ label, children }) => {
  return (
    <div className="pvc-p-hr">
      <span />
      <p>{label || children}</p>
      <span />
    </div>
  );
};

PHR.propTypes = {
  label: PropTypes.string,
};

export default PHR;
