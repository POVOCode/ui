import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import "./style.styl";

const SidebarContentWrapper = (props) => {
  return (
    <section
      className={`pvc-sidebar-content-wrapper ${props.className || ""}`}
      {...props}
    >
      {props.children}
    </section>
  );
};

SidebarContentWrapper.propTypes = {};

export default SidebarContentWrapper;
