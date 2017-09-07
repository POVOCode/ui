import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import SidebarView from "../../sidebar_view.react";
import SidebarWrapper from "../../sidebar_wrapper.react";
import SidebarContentWrapper from "../../sidebar_content_wrapper.react";
import Dropdown from "../../dropdown.react";
import Leaderboard from "../../leaderboard.react";

import { ternaryFunc } from "../../../util/methods";

import "./style.styl";

class RewardIndexView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SidebarView id="pv-rewards">
        <SidebarWrapper>
          <i className="icon-chart-bar" />

          <h1>Rewards</h1>

          <Dropdown
            value={Immutable.Map({
              value: "all",
              label: "All Categories",
            })}

            options={Immutable.fromJS([{
              value: "all",
              label: "All Categories",
            }])}
          />
       
          <hr />

          <Leaderboard
            title="Top Picks"
            data={[
              { label: "Big Screen TV", value: 1290 },
              { label: "4k Ultra Monitor", value: 1800 },
              { label: "Ultimate Fishing Gears", value: 3000 },
              { label: "Wearable Watch", value: 6000 },
              { label: "Home Monitoring System", value: 9080 },
            ]}
          />

          <hr />

          <Leaderboard
            title="Staff Picks"
            data={[
              { label: "Big Screen TV", value: 1290 },
              { label: "4k Ultra Monitor", value: 1800 },
              { label: "Ultimate Fishing Gears", value: 3000 },
              { label: "Wearable Watch", value: 6000 },
              { label: "Home Monitoring System", value: 9080 },
            ]}
          />

          <hr />

          <Leaderboard
            title="Redeem History"
            valColor="#999"
            data={[
              { label: "Big Screen TV", value: new Date().toLocaleDateString() },
              { label: "$5 Gift Card", value: new Date().toLocaleDateString() },
              { label: "$25 Gift Card", value: new Date().toLocaleDateString() },
              { label: "8GB USB Key", value: new Date().toLocaleDateString() },
            ]}
          />
        </SidebarWrapper>

        <SidebarContentWrapper id="pv-r-reward-list">
          <header>
            <ul>
              <li>
                <Dropdown
                  value={Immutable.Map({
                    value: "points_asc",
                    label: "Sort by Pts (low - high)",
                  })}

                  options={Immutable.fromJS([{
                    value: "points_asc",
                    label: "Sort by Pts (low - high)",
                  }])}
                />
              </li>

              <li>
                <input
                  type="text"
                  placeholder="Search for products"
                />
              </li>
            </ul>
          </header>

          <article>
            <ul>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) =>
                <li className="pvc-reward-card-small" key={i}>
                  <div>
                    <div className="pvc-rcs-img" />
                    <p className="pvc-rcs-value">{i * 100}pts</p>
                  </div>
                </li>
              )}
            </ul>
          </article>
        </SidebarContentWrapper>
      </SidebarView>
    );
  }
};

RewardIndexView.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default RewardIndexView;
