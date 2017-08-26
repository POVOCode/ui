import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import { mergeClassNames, ternaryFunc } from "../../../util/methods";
import "./style.styl";

const TextCard = (props) => {
  return (
    <div className="pv-text-card">
      {props.text || props.children || ""}
    </div>
  );
};

TextCard.propTypes = {
  text: PropTypes.string,
};

export default TextCard;
