import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import "./style.styl";

const Modal = ({ content, children, onBlur, innerID }) => {
  return (
    <div
      id="pvc-modal"
      onClick={onBlur}
    >
      <div
        id={innerID || "pvc-modal-inner"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }}
      >
        {content || children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  content: PropTypes.object,
  onBlur: PropTypes.func,
  innerID: PropTypes.string,
};

export default Modal;
