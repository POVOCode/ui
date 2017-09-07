import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import SidebarView from "../../sidebar_view.react";
import SidebarWrapper from "../../sidebar_wrapper.react";
import SidebarContentWrapper from "../../sidebar_content_wrapper.react";
import PollBottomBar from "../bottombar.react";
import RewardCard from "../../reward/card.react";
import CardGrid from "../../card_grid.react";

import Dropdown from "../../dropdown.react";

import { forms as Forms, ternaryFunc } from "../../../util/methods";
import "./style.styl";

class PollEditView extends React.Component {

  constructor(props) {
    super(props);

    this.initialState = {};
    this.state = {
      dirty: false,
    };

    Forms.setupComponentFormElements(this, { dirty: true }, [{
      c: this, key: "title", val: "", cb: "onTitleChange",
    }]);
  }

  render() {
    const { title } = this.state;
    const testReward = {
      label: "Reward A",
      brand: "Brand A",
      image_url: "http://loremflickr.com/640/480",
    };

    const rewards = [];

    for (let i = 0; i < 20; i += 1) {
      rewards.push(testReward);
    }

    return (
      <SidebarView id="pv-poll-edit">
        <SidebarWrapper>
          <i className="icon-chart-bar" />

          <input
            type="text"
            placeholder="Poll Title/Question Here"
            value={this.state.title}
            onChange={this.onTitleChange}
          />

          <textarea
            placeholder="Poll description here"
            value={this.state.description}
            onChange={this.onDescriptionChange}
            rows={10}
          />
        </SidebarWrapper>

        <SidebarContentWrapper id="pv-pe-products">
          <header>
            <p>Select Product(s)</p>

            <input
              type="search"
              placeholder="Search for products"
            />
          </header>

          <CardGrid
            itemsPerRow={4}
            items={rewards}
            renderItem={(r) =>
              <RewardCard
                reward={r}
                small={true}
                hoverable={true}
                onSelectClick={true}
              />
            }
          />
        </SidebarContentWrapper>

        <PollBottomBar
          steps={["Create Poll", "Preview", "Publish"]}
          activeStep={0}

          buttons={[{
            label: "Cancel",
          }, {
            label: "Preview",
            className: "pvc-button-primary",
          }]}
        />
      </SidebarView>
    );
  }
};

PollEditView.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default PollEditView;
