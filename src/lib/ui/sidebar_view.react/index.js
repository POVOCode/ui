import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import "./style.styl";

const SidebarView = (props) => {
  return (
    <div
      className={`pvc-sidebar-view ${props.className || ""}`}
      {...props}
    >
      {props.children}
    </div>
  );
};

SidebarView.propTypes = {};

export default SidebarView;
