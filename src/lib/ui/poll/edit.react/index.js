import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import { ternaryFunc } from "../../../util/methods";
import "./style.styl";

class PollEditView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="pv-poll-edit">
      </div>
    );
  }
};

PollEditView.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default PollEditView;
