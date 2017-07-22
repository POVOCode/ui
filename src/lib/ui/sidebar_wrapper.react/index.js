import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import "./style.styl";

const SidebarWrapper = (props) => {
  return (
    <div
      className={`pvc-sidebar-wrapper ${props.className || ""}`}
      {...props}
    >
      {props.children}
    </div>
  );
};

SidebarWrapper.propTypes = {};

export default SidebarWrapper;
