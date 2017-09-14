import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import SidebarView from "../../sidebar_view.react";
import SidebarWrapper from "../../sidebar_wrapper.react";
import SidebarContentWrapper from "../../sidebar_content_wrapper.react";

import { forms as Forms, ternaryFunc } from "../../../util/methods";
import "./style.styl";

class AdminUserView extends React.Component {

  constructor(props) {
    super(props);

    this.initialState = {
      dirty: false,
      selectedUser: null,
      isNewUser: false,
      initialSelectedUser: null,
    };

    Forms.setupComponentFormElements(this, { dirty: true }, [
      { c: this, key: "password", val: "", cb: "onPasswordChange" },
      { c: this, key: "confirmPassword", val: "", cb: "onConfirmPasswordChange" },
    ]);

    this.state = Object.assign({}, this.initialState);

    this.onResetSelectedUser = this.onResetSelectedUser.bind(this);
    this.onClearSelectedUser = this.onClearSelectedUser.bind(this);
    this.onSubmitSidebar = this.onSubmitSidebar.bind(this);
    this.onCreateNewUser = this.onCreateNewUser.bind(this);

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onAdminFlagChange = this.onAdminFlagChange.bind(this);
    this.onPostcodeChange = this.onPostcodeChange.bind(this);
    this.onInterestsChange = this.onInterestsChange.bind(this);
  }

  onUsernameChange(e) {
    const { selectedUser } = this.state;
    const { value } = e.target;

    if (selectedUser) {
      this.setState(() => ({
        selectedUser: selectedUser.set("username", value),
        dirty: true,
      }));
    }
  }

  onEmailChange(e) {
    const { selectedUser } = this.state;
    const { value } = e.target;

    if (selectedUser) {
      this.setState(() => ({
        selectedUser: selectedUser.set("email", value),
        dirty: true,
      }));
    }
  }

  onAdminFlagChange(e) {
    const { selectedUser } = this.state;
    const { checked } = e.target;

    if (selectedUser) {
      this.setState(() => ({
        selectedUser: selectedUser.set("admin", checked),
        dirty: true,
      }));
    }
  }

  onPostcodeChange(e) {
    const { selectedUser } = this.state;
    const { value } = e.target;

    if (selectedUser) {
      this.setState(() => ({
        selectedUser: selectedUser.set("postcode", value),
        dirty: true,
      }));
    }
  }

  onInterestsChange(e) {
    const { selectedUser } = this.state;
    const { value } = e.target;

    if (selectedUser) {
      this.setState(() => ({
        selectedUser: selectedUser.set("interests", value),
        dirty: true,
      }));
    }
  }

  onSelectUser(selectedUser) {
    this.setState(() => ({
      selectedUser,
      initialSelectedUser: selectedUser,
      isNewUser: false,
      dirty: false,
    }));
  }

  onResetSelectedUser() {
    this.setState(() => ({
      selectedUser: this.state.initialSelectedUser,
      dirty: false,
    }));
  }

  onClearSelectedUser() {
    this.setState(() => ({
      selectedUser: null,
      isNewUser: false,
      dirty: false,
    }));
  }

  onSubmitSidebar() {
    if (this.isNewUser) {
      return alert("User creation unimplemented");
    }

    this.props.actions.user
      .update(Immutable.Map(this.stateToUserDataPayload()))
      .then(this.props.onClearSelectedUser);
  }

  stateToUserDataPayload() {
    const { selectedUser } = this.state;

    if (!selectedUser) return {};

    return {
      username: selectedUser.get("username"),
      email: selectedUser.get("email"),
      interests: selectedUser.get("interests"),
      postcode: selectedUser.get("postcode"),

      password: this.state.password,
      verifyPassword: this.state.confirmPassword, // TODO: UI/API key mismatch
      currentPassword: "",
    };
  }

  onCreateNewUser() {
    const user = this.genNewUser();

    this.setState(() => ({
      selectedUser: user,
      initialSelectedUser: user,
      isNewUser: true,
      password: "",
      confirmPassword: "",
    }));
  }

  genNewUser() {
    return Immutable.fromJS({
      id: "",
      email: "",
      username: "",
      admin: false,
      postcode: "",
      interests: "",
    });
  }

  render() {
    const busState = this.props.state;
    const users = busState.get("user");
    const usersJS = users ? users.toJS() : {};
    const { selectedUser } = this.state;

    delete usersJS.active;

    return (
      <SidebarView id="pvc-admin-user-view">
        <SidebarWrapper>
          {ternaryFunc(!selectedUser, () =>
            <div className="pvc-admin-sidebar-empty-filler">
              <p>No user selected</p>
            </div>
          )}

          {ternaryFunc(selectedUser, () =>
            <div>
              <h3 className="pvc-admin-sidebar-header">
                {this.state.isNewUser ? "Create User" : "Edit User"}
              </h3>

              <div className="pvc-admin-sidebar-control">
                <label>ID</label>
                <input
                  type="text"
                  disabled={true}
                  value={selectedUser.get("id")}
                />
              </div>

              <div className="pvc-admin-sidebar-control">
                <label>Email</label>
                <input
                  type="email"
                  value={selectedUser.get("email")}
                  onChange={this.onEmailChange}
                />
              </div>

              <div className="pvc-admin-sidebar-control">
                <label>Username</label>
                <input
                  type="text"
                  value={selectedUser.get("username")}
                  onChange={this.onUsernameChange}
                />
              </div>

              <div className="pvc-admin-sidebar-control">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Change Password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                />
              </div>

              <div className="pvc-admin-sidebar-control">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={this.state.confirmPassword}
                  onChange={this.onConfirmPasswordChange}
                />
              </div>

              <div className="pvc-admin-sidebar-control">
                <label>Is Admin</label>
                <input
                  type="checkbox"
                  checked={selectedUser.get("admin")}
                  onChange={this.onAdminFlagChange}
                />
              </div>

              <div className="pvc-admin-sidebar-control">
                <label>Postcode</label>
                <input
                  type="text"
                  value={selectedUser.get("postcode")}
                  onChange={this.onPostcodeChange}
                />
              </div>

              <div className="pvc-admin-sidebar-control">
                <label>Interests</label>
                <textarea
                  value={selectedUser.get("interests")}
                  onChange={this.onInterestsChange}
                  rows="5"
                />
              </div>

              <div className="pvc-admin-sidebar-submit">
                <div>
                  <button
                    onClick={this.onResetSelectedUser}
                    disabled={!this.state.dirty}
                  >Reset</button>
                </div>

                <div>
                  <button
                    className="pvc-btn-cancel"
                    onClick={this.onClearSelectedUser}
                  >Cancel</button>
                </div>

                <div>
                  <button
                    className="pvc-btn-save"
                    onClick={this.onSubmitSidebar}
                    disabled={!this.state.dirty}
                  >{this.state.isNewUser ? "Create" : "Save"}</button>
                </div>
              </div>
            </div>
          )}
        </SidebarWrapper>

        <SidebarContentWrapper>
          <table className="pvc-admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(usersJS).map(id =>
                <tr
                  key={id}
                  onClick={this.onSelectUser.bind(this, users.get(id))}
                >
                  <td>
                    <p>{usersJS[id].id}</p>
                  </td>
                  <td>
                    <p>{usersJS[id].username}</p>
                  </td>
                  <td>
                    <p>{usersJS[id].email}</p>
                  </td>
                  <td>
                    <p>{usersJS[id].createdAt}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <button
            className="pvc-btn-save"
            onClick={this.onCreateNewUser}
          >Create User</button>
        </SidebarContentWrapper>
      </SidebarView>
    );
  }
};

AdminUserView.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default AdminUserView;
