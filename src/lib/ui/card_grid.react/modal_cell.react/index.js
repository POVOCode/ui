import React from "react";
import PropTypes from "prop-types";

import { mergeClassNames } from "../../../util/methods";
import "./style.styl";

const CardGridModalCell = (props) => {
  const { className, ...extraProps } = props;

  return (
    <div
      className={mergeClassNames("pvc-cg-modal-cell", className || "")}
      {...extraProps}
    />
  );
};

export default CardGridModalCell;
