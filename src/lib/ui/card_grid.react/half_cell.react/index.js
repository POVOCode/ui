import React from "react";
import PropTypes from "prop-types";

import { mergeClassNames } from "../../../util/methods";
import "./style.styl";

const CardGridHalfCell = (props) => {
  const { className, ...extraProps } = props;

  return (
    <div
      className={mergeClassNames("pvc-cg-half-cell", className || "")}
      {...extraProps}
    />
  );
};

export default CardGridHalfCell;
