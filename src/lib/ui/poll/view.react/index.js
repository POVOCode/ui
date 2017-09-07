import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import SidebarView from "../../sidebar_view.react";
import SidebarWrapper from "../../sidebar_wrapper.react";
import SidebarContentWrapper from "../../sidebar_content_wrapper.react";
import CommentForm from "../../comment/form.react";
import RewardCard from "../../reward/card.react";
import PollBottomBar from "../bottombar.react";

import CardGrid from "../../card_grid.react";
import CardGridColumn from "../../card_grid.react/column.react";
import CardGridHalfCell from "../../card_grid.react/half_cell.react";

import { ternaryFunc } from "../../../util/methods";
import "./style.styl";

class PollView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SidebarView id="pv-poll-view">
        <SidebarWrapper id="pv-pv-sidebar">
          <i className="icon-chart-bar" />

          <h3>Which would be the perfect father's day gift?</h3>

          <p>My dad's been needing a new couch but I'm worried it's a boring gift. Should I get this or this grill? He's a pretty partical kind of guy, but I think he's been eyeing for a new grill since BBQ season is coming up.</p>

          <CommentForm
            placeholder="Write a comment to earn an additional 20 points"
            disabled={true}
          />
        </SidebarWrapper>

        <SidebarContentWrapper id="pv-pv-content">
          <h3>Vote for one of the following</h3>

          <CardGrid
            itemsPerRow={2}
            items={[{
              label: "Reward A",
              brand: "Brand A",
              image_url: "http://loremflickr.com/640/480",
            }, {
              label: "Reward B",
              brand: "Brand B",
              image_url: "http://loremflickr.com/640/480",
            }]}

            renderItem={(item) =>
              <RewardCard
                reward={item}
                hoverable={true}
                selected={false}
                onSelectClick={true}
              />
            }
          />
        </SidebarContentWrapper>

        <PollBottomBar
          label="At the polls"
          buttons={[{
            label: "Skip to next poll",
          }, {
            label: "Submit Vote",
            className: "pvc-button-primary",
          }]}
        />
      </SidebarView>
    );
  }
};

PollView.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default PollView;
