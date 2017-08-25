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

class PollIndexView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SidebarView id="pv-polls">
        <SidebarWrapper>
          <span className="pvc-sw-icon">Icon</span>

          <h1>My Polls</h1>

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
            title="Created Recently"
            italics={true}
            data={[
              { label: "Sisters Birthday?", value: 8 },
              { label: "What gear is more suitable for outasdfasfdasfd", value: 0 },
              { label: "Approaching 10 year wedding anniversaryasdfasdf", value: 2 },
              { label: "Dogs or cats?", value: 3 },
              { label: "Gift for a 4 year old", value: 4 },
            ]}
          />

          <hr />

          <Leaderboard
            title="Most Popular Polls"
            italics={true}
            data={[
              { label: "Sisters Birthday?" },
              { label: "What gear is more suitable for outasdfasfdasfd" },
              { label: "Approaching 10 year wedding anniversaryasdfasdf" },
              { label: "Dogs or cats?" },
              { label: "Gift for a 4 year old" },
            ]}
          />

          <hr />
        </SidebarWrapper>

        <SidebarContentWrapper id="pv-p-poll-list">
          <header>
            <ul>
              <li>
                <Dropdown
                  value={Immutable.Map({
                    value: "date_desc",
                    label: "Sort (Newest - Oldest)",
                  })}

                  options={Immutable.fromJS([{
                    value: "date_desc",
                    label: "Sort (Newest - Oldest)",
                  }])}
                />
              </li>

              <li>
                <input
                  type="text"
                  placeholder="Search for Polls"
                />
              </li>
            </ul>
          </header>

          <article>
          </article>
        </SidebarContentWrapper>
      </SidebarView>
    );
  }
};

PollIndexView.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default PollIndexView;
