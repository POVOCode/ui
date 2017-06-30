import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import { ternaryFunc } from "../../../util/methods";
import "./style.styl";

class RewardListView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="pv-reward-list">
      </div>
    );
  }
};

RewardListView.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default RewardListView;
