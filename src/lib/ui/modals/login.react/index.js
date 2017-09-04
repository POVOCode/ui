import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import Modal from "../../modal";
import CloseButton from "../../modal/close_button.react";
import PHR from "../../p_hr.react";
import Logo from "../../logo.react";

import {
  forms as Forms,
  ternaryFunc,
  mergeClassNames,
} from "../../../util/methods";

import "./style.styl";

class ModalLoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.initialState = {};
    this.state = {
      dirty: false,
    };

    Forms.setupComponentFormElements(this, { dirty: true }, [
      { c: this, key: "email", val: "", cb: "onEmailChange" },
      { c: this, key: "password", val: "", cb: "onPasswordChange" },
    ]);

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.onLoginWithFBClick = this.onLoginWithFBClick.bind(this);
    this.onLoginWithGPClick = this.onLoginWithGPClick.bind(this);
  }

  componentDidMount() {
    this.emailInput.focus();
  }

  clearState() {
    this.setState(() => ({
      email: "",
      password: "",
    }));
  }

  onCloseClick() {
    this.clearState();
    this.props.onClose();
  }

  onSubmitClick() {
    this.props.onSubmit({
      email: this.state.email,
      password: this.state.password,
    });
  }

  // TODO
  onLoginWithFBClick() {}
  onLoginWithGPClick() {}

  render() {
    return (
      <Modal onBlur={this.onCloseClick} innerID="pvc-modal-login">
        <CloseButton onClick={this.onCloseClick} />
        <Logo />

        <div id="pvc-mlf-form">
          <input
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onEmailChange}
            ref={(i) => { this.emailInput = i }}
          />

          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
        </div>

        <button
          id="pvc-mlf-continue"
          onClick={this.onSubmitClick}
        >Login</button>

        <PHR label="or" />

        <button
          id="pvc-mlf-fb"
          onClick={this.onSignupWithFBClick}
        >Login with Facebook</button>

        <button
          id="pvc-mlf-gp"
          onClick={this.onSignupWithGPClick}
        >Login with Google+</button>

        {ternaryFunc(this.props.onSignupClick, () =>
          <p
            id="pvc-mlf-signup"
            onClick={this.props.onSignupClick}
          >Not registered? Sign up!</p>
        )}
      </Modal>
    );
  }

};

ModalLoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,

  // Relevant text is hidden if this is not provided
  onSignupClick: PropTypes.func,
};

export default ModalLoginForm;
