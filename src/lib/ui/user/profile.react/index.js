import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import SidebarView from "../../sidebar_view.react";
import SidebarWrapper from "../../sidebar_wrapper.react";
import SidebarContentWrapper from "../../sidebar_content_wrapper.react";

import { ternaryFunc } from "../../../util/methods";
import "./style.styl";

class UserProfileView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * TODO: external SidebarIconLink
   *       external WonProductCard
   *       external TabButton
   *       external IconButton
   *       external Button
   */
  render() {
    const fakeActivityData = [
      { label: "Earned 12pt", date: Date.now() },
      { label: "Created a Poll", date: Date.now() },
      { label: "Voted on a Poll", date: Date.now() },
      { label: "Poll ended!", date: Date.now() },
      { label: "Signed up", date: Date.now() },
    ];

    return (
      <SidebarView>
        <SidebarWrapper id="pv-up-sidebar">
          <span className="pvc-fake-avatar" />

          <div id="pv-up-basic-info">
            <p id="pv-upbi-name">Daniel Carter</p>
            <p id="pv-upbi-email">cecile.stracke@hotmail.com</p>
            <p id="pv-upbi-birthday">05 Nov 2017</p>
            <p id="pv-upbi-joined">Joined: 31 Mar, 2017</p>
          </div>

          <hr />

          <div id="pv-up-reward-info">
            <p>Level 8</p>
            <span id="pv-upri-points">98873pts</span>

            <div className="pvc-sidebar-icon-link">
              <span className="pt-icon-standard pt-icon-grid-view" />
              <p>Reward Details</p>
              <span className="pt-icon-standard pt-icon-chevron-right" />
            </div>
          </div>

          <hr />

          <div className="pvc-labelled-keys-values">
            <p>Activities</p>
            <ul>
              {fakeActivityData.map(entry =>
                <li>
                  <p className="pvc-lkv-label">{entry.label}</p>
                  <p className="pvc-lkv-value">{new Date(entry.date).toLocaleDateString()}</p>
                </li>
              )}
            </ul>
          </div>

        </SidebarWrapper>

        <SidebarContentWrapper id="pv-up-content">
          <header id="pv-up-products-header">
            <h1>Your Winning Products</h1>
            <ul>
              <li className="pvc-tab-button active">
                <a
                  href="#"
                >
                  <span className="pt-icon-standard pt-icon-time" />
                  <p>Recent</p>
                </a>
              </li>

              <li className="pvc-tab-button">
                <a
                  href="#"
                >
                  <span className="pt-icon-standard pt-icon-star" />
                  <p>Saved</p>
                </a>
              </li>
            </ul>
          </header>

          <article>
            <ul>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) =>
                <li className="pvc-won-product-card" key={i}>
                  <div className="pvc-wpc-header">
                    <p>2 June</p>
                    <a
                      href="#"
                    >
                      View Poll Results
                    </a>
                  </div>

                  <div className="pvc-wpc-image" />

                  <div className="pvc-wpc-footer">
                    <ul>
                      <li>
                        <button className="pvc-icon-button">
                          <span className="pt-icon-standard pt-icon-star" />
                          <p>Save For Later</p>
                        </button>
                      </li>

                      <li className="pvc-button">
                        <p>BUY NOW</p>
                      </li>
                    </ul>
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

UserProfileView.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default UserProfileView;
