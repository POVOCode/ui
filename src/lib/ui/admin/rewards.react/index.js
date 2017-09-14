import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import SidebarView from "../../sidebar_view.react";
import SidebarWrapper from "../../sidebar_wrapper.react";
import SidebarContentWrapper from "../../sidebar_content_wrapper.react";

import { forms as Forms, ternaryFunc } from "../../../util/methods";
import "./style.styl";

class AdminRewardView extends React.Component {

  constructor(props) {
    super(props);

    this.initialState = {
      dirty: false,
      selectedReward: null,
      isNewReward: false,
      initialSelectedReward: null,
    };

    this.state = Object.assign({}, this.initialState);

    this.onResetSelectedReward = this.onResetSelectedReward.bind(this);
    this.onClearSelectedReward = this.onClearSelectedReward.bind(this);
    this.onSubmitSidebar = this.onSubmitSidebar.bind(this);
    this.onCreateNewReward = this.onCreateNewReward.bind(this);

    this.onLabelChange = this.onLabelChange.bind(this);
    this.onBrandChange = this.onBrandChange.bind(this);
    this.onPointsChange = this.onPointsChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }

  onLabelChange(e) {
    const { selectedReward } = this.state;
    const { value } = e.target;

    if (selectedReward) {
      this.setState(() => ({
        selectedReward: selectedReward.set("label", value),
        dirty: true,
      }));
    }
  }

  onBrandChange(e) {
    const { selectedReward } = this.state;
    const { value } = e.target;

    if (selectedReward) {
      this.setState(() => ({
        selectedReward: selectedReward.set("brand", value),
        dirty: true,
      }));
    }
  }

  onPointsChange(e) {
    const { selectedReward } = this.state;
    const { value } = e.target;

    if (selectedReward) {
      this.setState(() => ({
        selectedReward: selectedReward.set("points", Number(value)),
        dirty: true,
      }));
    }
  }

  onDescriptionChange(e) {
    const { selectedReward } = this.state;
    const { value } = e.target;

    if (selectedReward) {
      this.setState(() => ({
        selectedReward: selectedReward.set("description", value),
        dirty: true,
      }));
    }
  }

  onSelectReward(selectedReward) {
    this.setState(() => ({
      selectedReward,
      initialSelectedReward: selectedReward,
      isNewReward: false,
      dirty: false,
    }));
  }

  onResetSelectedReward() {
    this.setState(() => ({
      selectedReward: this.state.initialSelectedReward,
      dirty: false,
    }));
  }

  onClearSelectedReward() {
    this.setState(() => ({
      selectedReward: null,
      isNewReward: false,
      dirty: false,
    }));
  }

  onSubmitSidebar() {
    if (this.state.isNewReward) {
      this.onDoCreate();
    } else {
      this.onDoSave();
    }
  }

  onDoCreate() {
    this.props.actions.reward
      .create(Immutable.Map(this.stateToRewardDataPayload()))
      .then(this.props.onClearSelectedReward);
  }

  onDoSave() {
    this.props.actions.reward
      .update(Immutable.Map(this.stateToRewardDataPayload()))
      .then(this.props.onClearSelectedReward);
  }

  stateToRewardDataPayload() {
    const { selectedReward } = this.state;

    if (!selectedReward) return {};

    return {
      label: selectedReward.get("label"),
      brand: selectedReward.get("brand"),
      point_cost: selectedReward.get("point_cost"),
      description: selectedReward.get("description"),
      image_urls: [],
    };
  }

  onCreateNewReward() {
    const reward = this.genNewReward();

    this.setState(() => ({
      selectedReward: reward,
      initialSelectedReward: reward,
      isNewReward: true,
      password: "",
      confirmPassword: "",
    }));
  }

  genNewReward() {
    return Immutable.fromJS({
      id: "",
      label: "",
      brand: "",
      point_cost: 0,
      description: "",
    });
  }

  render() {
    const busState = this.props.state;
    const rewards = busState.get("reward");
    const rewardsJS = rewards ? rewards.toJS() : {};
    const { selectedReward } = this.state;

    return (
      <SidebarView id="pvc-admin-reward-view">
        <SidebarWrapper>
          {ternaryFunc(!selectedReward, () =>
            <div className="pvc-admin-sidebar-empty-filler">
              <p>No reward selected</p>
            </div>
          )}

          {ternaryFunc(selectedReward, () =>
            <div>
              <h3 className="pvc-admin-sidebar-header">
                {this.state.isNewReward ? "Create Reward" : "Edit Reward"}
              </h3>

              <div className="pvc-admin-sidebar-control">
                <label>ID</label>
                <input
                  type="text"
                  disabled={true}
                  value={selectedReward.get("id")}
                />
              </div>

              <div className="pvc-admin-sidebar-control">
                <label>Label</label>
                <input
                  type="text"
                  value={selectedReward.get("label")}
                  onChange={this.onLabelChange}
                />
              </div>

              <div className="pvc-admin-sidebar-control">
                <label>Brand</label>
                <input
                  type="text"
                  value={selectedReward.get("brand")}
                  onChange={this.onBrandChange}
                />
              </div>

              <div className="pvc-admin-sidebar-control">
                <label>Description</label>
                <textarea
                  value={selectedReward.get("description")}
                  onChange={this.onDescriptionChange}
                  rows="5"
                />
              </div>

              <div className="pvc-admin-sidebar-control">
                <label>Point Cost</label>
                <input
                  type="number"
                  value={selectedReward.get("point_cost")}
                  onChange={this.onPointsChange}
                />
              </div>

              <div className="pvc-admin-sidebar-submit">
                <div>
                  <button
                    onClick={this.onResetSelectedReward}
                    disabled={!this.state.dirty}
                  >Reset</button>
                </div>

                <div>
                  <button
                    className="pvc-btn-cancel"
                    onClick={this.onClearSelectedReward}
                  >Cancel</button>
                </div>

                <div>
                  <button
                    className="pvc-btn-save"
                    onClick={this.onSubmitSidebar}
                    disabled={!this.state.dirty}
                  >{this.state.isNewReward ? "Create" : "Save"}</button>
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
                <th>Label</th>
                <th>Brand</th>
                <th>Point Cost</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(rewardsJS).map(id =>
                <tr
                  key={id}
                  onClick={this.onSelectReward.bind(this, rewards.get(id))}
                >
                  <td>
                    <p>{rewardsJS[id].id}</p>
                  </td>
                  <td>
                    <p>{rewardsJS[id].label}</p>
                  </td>
                  <td>
                    <p>{rewardsJS[id].brand}</p>
                  </td>
                  <td>
                    <p>{rewardsJS[id].point_cost}</p>
                  </td>
                  <td>
                    <p>{rewardsJS[id].createdAt}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <button
            className="pvc-btn-save"
            onClick={this.onCreateNewReward}
          >Create Reward</button>
        </SidebarContentWrapper>
      </SidebarView>
    );
  }
};

AdminRewardView.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default AdminRewardView;
