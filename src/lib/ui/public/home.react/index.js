import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import Dropdown from "../../dropdown.react";
import PollCard from "../../poll/card.react";

import { ternaryFunc } from "../../../util/methods";
import "./style.styl";

const genRewardImage = () => {
  return `http://unsplash.it/512/512/?image=${Math.floor(Math.random() * 1000)}`;
};

const newDummyPoll = () => {
  const nRewards = Math.floor(Math.random() * 5) + 1;
  const poll = {
    title: "Which would be the perfect father's day gift?",
    teaser: "My dad's been needing a new couch but I'm worried it's a boring gift. Should I get this one or that one?",
    author: "rachelmk",
    date: Date.now(),
    rewards: [],
  };

  for (let i = 0; i < nRewards; i += 1) {
    poll.rewards.push({ image: genRewardImage() });
  }

  return Immutable.fromJS(poll);
};

class HomeView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  /**
   * TODO: external CollectionBrowser
   * TODO: external CollectionFilterDropdown
   * TODO: external CardGrid
   * TODO: external pv-li-active-marker css-only component
   * TODO: Flesh out poll schema w/ PollCard
   */
  render() {
    return (
      <div id="pv-home">
        <section id="pv-collection-browser">
          <div id="pv-cb-inner">
            <header>
              <ul>
                <li>
                  <a href="#">Newest</a>
                  <span className="pv-li-active-marker" />
                </li>

                <li>
                  <a href="#">Popular</a>
                </li>

                <li>
                  <a href="#">Ending Soon</a>
                </li>
              </ul>

              <Dropdown
                value={Immutable.Map({
                  value: "view_all",
                  label: "View all Polls",
                })}

                options={Immutable.fromJS([{
                  value: "view_all",
                  label: "View all Polls",
                }])}
              />
            </header>

            <div className="pv-card-grid">
              <div className="pv-cg-column pv-cgc-two">
                <div className="pv-cgg-modal-cell">
                  <PollCard large={true} poll={newDummyPoll()} />
                </div>

                <div className="pv-cgg-quarter-cell">
                  {[1, 2].map((i) =>
                    <PollCard key={i} poll={newDummyPoll()} />
                  )}
                </div>
              </div>

              <div className="pv-cg-column pv-cgc-two">
                <div className="pv-cgg-quarter-cell">
                  {[1, 2, 3, 4].map((i) =>
                    <PollCard key={i} poll={newDummyPoll()} />
                  )}
                </div>

                <div className="pv-cgg-quarter-cell">
                  {[1, 2].map((i) =>
                    <PollCard key={i} poll={newDummyPoll()} />
                  )}
                </div>
              </div>
            </div>

            <div className="pv-cb-load">
              <button>Load More</button>
            </div>
          </div>
        </section>
      </div>
    );
  }
};

HomeView.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default HomeView;
