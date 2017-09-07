import React from "react";
import PropTypes from "prop-types";

import { mergeClassNames } from "../../../util/methods";
import "./style.styl";

const CardGridColumn = (props) => {
  const { className, ...extraProps } = props;

  return (
    <div
      className={mergeClassNames("pvc-cg-column", className || "")}
      {...extraProps}
    />
  );
};

export default CardGridColumn;
