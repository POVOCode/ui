import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import Modal from "../../modal";
import CloseButton from "../../modal/close_button.react";
import Logo from "../../logo.react";

import { ternaryFunc, mergeClassNames } from "../../../util/methods";

import "./style.styl";

const PreRegisterConfirmationModal = ({ onClose }) => {
  return (
    <Modal onBlur={onClose} innerID="pvc-prcm">
      <CloseButton onClick={onClose} />
      <Logo />
     
      <p>Great! We'll send you an email when your account is ready.</p>
    </Modal>
  );
};

PreRegisterConfirmationModal.propTypes = {
  onClose: PropTypes.func,
};

export default PreRegisterConfirmationModal;
