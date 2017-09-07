import React from "react";
import PropTypes from "prop-types";

import { mergeClassNames } from "../../../util/methods";
import "./style.styl";

const CardGridQuarterCell = (props) => {
  const { className, ...extraProps } = props;

  return (
    <div
      className={mergeClassNames("pvc-cg-quarter-cell", className || "")}
      {...extraProps}
    />
  );
};

export default CardGridQuarterCell;
