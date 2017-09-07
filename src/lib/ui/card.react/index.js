import React from "react";
import PropTypes from "prop-types";

import { mergeClassNames } from "../../util/methods";
import "./style.styl";

const Card = (props) => {
  const { hoverable, className, ...extraProps } = props;

  return (
    <div
      className={mergeClassNames("pvc-card", className || "", {
        hoverable,
      })}

      {...extraProps}
    />
  );
};

Card.propTypes = {
  hoverable: PropTypes.bool,
};

export default Card;
