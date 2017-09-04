import React from "react";
import PropTypes from "prop-types";

import "./style.styl";

const CloseButton = ({ onClick }) => {
  return (
    <button
      className="pvc-modal-close-button icon-cancel"
      onClick={onClick}
    ></button>
  );
}

CloseButton.propTypes = {
  onClick: PropTypes.func,
};

export default CloseButton;
