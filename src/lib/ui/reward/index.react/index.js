import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import SidebarView from "../../sidebar_view.react";
import SidebarWrapper from "../../sidebar_wrapper.react";
import SidebarContentWrapper from "../../sidebar_content_wrapper.react";
import Dropdown from "../../dropdown.react";

import { ternaryFunc } from "../../../util/methods";
import "./style.styl";

class RewardIndexView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * TODO: external LeadboardList
   * TODO: external RedeemEventList
   */
  render() {
    const fakeLeaderboardData = [
      { label: "Big Screen TV", score: 1290 },
      { label: "4k Ultra Monitor", score: 1800 },
      { label: "Ultimate Fishing Gears", score: 3000 },
      { label: "Wearable Watch", score: 6000 },
      { label: "Home Monitoring System", score: 9080 },
    ];

    const fakeRedeemHistory = [
      { label: "Big Screen TV", date: Date.now() },
      { label: "$5 Gift Card", date: Date.now() },
      { label: "$5 Gift Card", date: Date.now() },
      { label: "8GB USB Key", date: Date.now() },
    ];

    return (
      <SidebarView id="pv-rewards">
        <SidebarWrapper>
          <span className="pvc-sw-icon">Icon</span>

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

          <div className="pvc-labelled-keys-values">
            <p>Top Picks</p>
            <ul>
              {fakeLeaderboardData.map(entry =>
                <li>
                  <p className="pvc-lkv-label">{entry.label}</p>
                  <p className="pvc-lkv-value">{entry.score}pts</p>
                </li>
              )}
            </ul>
          </div>

          <hr />

          <div className="pvc-labelled-keys-values">
            <p>Staff Picks</p>
            <ul>
              {fakeLeaderboardData.map(entry =>
                <li>
                  <p className="pvc-lkv-label">{entry.label}</p>
                  <p className="pvc-lkv-value">{entry.score}pts</p>
                </li>
              )}
            </ul>
          </div>

          <hr />

          <div className="pvc-labelled-keys-values pvc-redeem-event-list">
            <p>Redeem History</p>
            <ul>
              {fakeRedeemHistory.map(entry =>
                <li>
                  <p className="pvc-lkv-label">{entry.label}</p>
                  <p className="pvc-lkv-value">{new Date(entry.date).toLocaleDateString()}</p>
                </li>
              )}
            </ul>
          </div>
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
                <li className="pvc-reward-card-small">
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
