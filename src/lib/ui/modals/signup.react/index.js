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

class ModalSignupForm extends React.Component {

  constructor(props) {
    super(props);

    this.initialState = {};
    this.state = {
      dirty: false,
    };

    Forms.setupComponentFormElements(this, { dirty: true }, [
      { c: this, key: "username", val: "", cb: "onUsernameChange" },
      { c: this, key: "email", val: "", cb: "onEmailChange" },
      { c: this, key: "postcode", val: "", cb: "onPostCodeChange" },
    ]);

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.onSignupWithGPClick = this.onSignupWithGPClick.bind(this);
    this.onSignupWithFBClick = this.onSignupWithFBClick.bind(this);
  }

  componentDidMount() {
    this.usernameInput.focus();
  }

  clearState() {
    this.setState(() => ({
      username: "",
      email: "",
      postcode: "",
    }));
  }

  onCloseClick() {
    this.clearState();
    this.props.onClose();
  }

  onSubmitClick() {
    this.props.onSubmit({
      username: this.state.username,
      email: this.state.email,
      postcode: this.state.postcode,
    });
  }

  // TODO
  onSignupWithFBClick() {}
  onSignupWithGPClick() {}

  render() {
    return (
      <Modal onBlur={this.onCloseClick} innerID="pvc-modal-signup" >
        <CloseButton onClick={this.onCloseClick} />
        <Logo />

        <p>Sign up and earn 40 points</p>

        <div id="pvc-msf-form">
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onUsernameChange}
            ref={(i) => { this.usernameInput = i }}
          />

          <input
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onEmailChange}
          />

          <input
            type="text"
            placeholder="Postal Code"
            value={this.state.postcode}
            onChange={this.onPostCodeChange}
          />
        </div>

        <button
          id="pvc-msf-continue"
          onClick={this.onSubmitClick}
        >Continue</button>

        <PHR label="or" />

        <button
          id="pvc-msf-fb"
          onClick={this.onSignupWithFBClick}
        >Sign up with Facebook</button>

        <button
          id="pvc-msf-gp"
          onClick={this.onSignupWithGPClick}
        >Sign up with Google+</button>

        {ternaryFunc(this.props.onLoginClick, () =>
          <p
            id="pvc-msf-login"
            onClick={this.props.onLoginClick}
          >Already registered? Sign in</p>
        )}
      </Modal>
    );
  }

};

ModalSignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,

  // Relevant text is hidden if this is not provided
  onLoginClick: PropTypes.func,
};

export default ModalSignupForm;
