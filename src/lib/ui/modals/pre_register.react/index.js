import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import Bus from "../../../bus/bus";
import Modal from "../../modal";
import CloseButton from "../../modal/close_button.react";
import PHR from "../../p_hr.react";
import Logo from "../../logo.react";
import InlineCheckbox from "../../inline_checkbox.react";

import {
  forms as Forms,
  ternaryFunc,
  mergeClassNames,
} from "../../../util/methods";

import "./style.styl";

class ModalPreRegisterForm extends React.Component {

  constructor(props) {
    super(props);

    this.initialState = {
      dirty: false,
      validContent: false,
      lastContentError: null,
    };

    Forms.setupComponentFormElements(this, { dirty: true }, [
      { c: this, key: "username", val: "", cb: "onUsernameChange" },
      { c: this, key: "email", val: "", cb: "onEmailChange" },
      { c: this, key: "postcode", val: "", cb: "onPostCodeChange" },
      { c: this, key: "password", val: "", cb: "onPasswordChange" },
      { c: this, key: "confirmPassword", val: "", cb: "onConfirmPasswordChange" },
      { c: this, key: "interests", val: "", cb: "onInterestsChange" },

      {
        c: this,
        key: "enableEmailUpdates",
        val: true,
        cb: "onEnableEmailUpdatesChange",
        type: "raw",
      },
    ]);

    this.state = Object.assign({}, this.initialState);

    this.onCloseClick = this.onCloseClick.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.onSignupWithGPClick = this.onSignupWithGPClick.bind(this);
    this.onSignupWithFBClick = this.onSignupWithFBClick.bind(this);
  }

  componentDidMount() {
    this.usernameInput.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      validContent, username, email, password, confirmPassword, lastContentError
    } = this.state;

    // TODO: Make a generic handler for this validation logic. Maybe move it
    //       into the forms helper?
    if (lastContentError !== null) {
      if (
        ((lastContentError === "username") && (prevState.username !== username) && (username.length > 3)) ||
        ((lastContentError === "email") && (prevState.email !== email) && (email.length > 3)) ||
        ((lastContentError === "password") && (prevState.password !== password) && (password.length > 5)) ||
        ((lastContentError === "confirmPassword") && (prevState.confirmPassword !== confirmPassword) && (password !== confirmPassword))
      ) {
        return this.setState(() => ({
          lastContentError: null,
        }));
      }
    }

    // Drop out if the update is for the validContent flag
    //if (prevState.validContent !== validContent) return;

    const newContentError = this.getContentError();

    if (validContent !== (newContentError === null)) {
      this.setState(() => ({
        validContent: newContentError === null,
        lastContentError: newContentError,
      }));
    }
  }

  getContentErrorLabel() {
    const { lastContentError } = this.state;

    switch (lastContentError) {
      case "email":
        return "Invalid email";
      
      case "username":
        return "Username too short";

      case "password":
        return "Password too short";

      case "confirmPassword":
        return "Passwords do not match";

      case "server":
        return "Oops, there was a server error. Try again?";

      case "username-taken":
        return "Username not available";

      case null:
      default:
        break;
    }

    return "";
  }

  getContentError(state) {
    const { username, email, password, confirmPassword } = state || this.state;

    if (username.length < 3) return "username";
    if (email.length < 3) return "email";
    if (password.length < 5) return "password";
    if (confirmPassword !== password) return "confirmPassword";

    return null;
  }

  clearState() {
    this.setState(() => ({
      username: "",
      email: "",
      postcode: "",
      password: "",
      confirmPassword: "",
      interests: "",
      enableEmailUpdates: true,
    }));
  }

  onCloseClick() {
    this.clearState();
    this.props.onClose();
  }

  onSubmitClick() {
    if (!this.state.validContent) {
      if (this.state.lastContentError === null) {
        this.setState(() => ({
          lastContentError: this.getContentError(),
        }));
      }

      return;
    }

    const {
      username, email, password, postcode, interests, enableEmailUpdates,
    } = this.state;

    Bus.actions.user.preRegister({
      username,
      email,
      password,
      postcode,
      enableEmailUpdates,
      interests,
    }).then((user) => {
      this.props.onCompletion();
    }).catch((e) => {
      this.setState(() => ({
        lastContentError: (e.name === "APIError" && e.message === "Unauthorized")
          ? "username-taken"
          : "server",
      }));
    });
  }

  // TODO
  onSignupWithFBClick() {}
  onSignupWithGPClick() {}

  render() {
    return (
      <Modal onBlur={this.onCloseClick} innerID="pvc-modal-pre-register" >
        <CloseButton onClick={this.onCloseClick} />
        <Logo />

        <p>You can register early while POVO is still in development to earn a bonus of 150 points! These points can be exchanged for products &amp; rewards directly through our website.</p>

        <div id="pvc-mprf-form">
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

          <input
            type="password"
            placeholder="Password"
            className="new-group"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChange={this.onConfirmPasswordChange}
          />

          <input
            type="text"
            placeholder="What types of products do you like?"
            className="new-group"
            value={this.state.interests}
            onChange={this.onInterestsChange}
          />

          <InlineCheckbox
            className="new-group"
            label="Subscribe to email updates &amp; news"
            iconChecked="ok-circled"
            iconUnchecked="ok"

            value={this.state.enableEmailUpdates}
            onChange={this.onEnableEmailUpdatesChange}
          />
        </div>

        <button
          id="pvc-mprf-continue"
          onClick={this.onSubmitClick}
          className={mergeClassNames({
            disabled: !this.state.validContent,
          })}
        >Register</button>

        <p id="pvc-mprf-error">{this.getContentErrorLabel()}</p>
      </Modal>
    );
  }

};

ModalPreRegisterForm.propTypes = {
  onCompletion: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalPreRegisterForm;
