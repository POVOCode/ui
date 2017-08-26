import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import Dropdown from "../../dropdown.react";
import PollCard from "../../poll/card.react";
import TextCard from "../../poll/text_card.react";

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
   * TODO: Flesh out poll schema w/ PollCard
   */
  render() {
    return (
      <div id="pv-home">
        <section id="pv-collection-browser">
          <div id="pv-cb-inner">
            {/*<header>
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
            </header>*/}

            <p id="pv-h-teaser-text">Povo is an online marketplace for users to share ideas and gain feedback from other users about the purchases they are making online. Users are rewarded upon creating, sharing and up-voting content to offer the ultimate online shopping experience.</p>

            <div className="pv-card-grid">
              <div className="pv-cg-column pv-cgc-two">
                <div className="pv-cgg-quarter-cell">
                  <PollCard
                    poll={Immutable.fromJS({
                      title: "Best keyboard of 2017?",
                      author: "rachelmk",
                      date: Date.now(),
                      rewards: [
                        { image: "/img/products/keyboards/1.jpg" },
                        { image: "/img/products/keyboards/2.jpg" },
                        { image: "/img/products/keyboards/3.jpg" },
                        { image: "/img/products/keyboards/4.jpg" },
                      ]
                    })}
                  />

                  <PollCard
                    poll={Immutable.fromJS({
                      title: "Which LEGO set do you want?",
                      author: "xansal",
                      date: Date.now(),
                      rewards: [
                        { image: "/img/products/lego/1.jpg" },
                        { image: "/img/products/lego/2.jpg" },
                        { image: "/img/products/lego/3.jpg" },
                        { image: "/img/products/lego/4.jpg" },
                      ]
                    })}
                  />
                </div>

                <div className="pv-cgg-quarter-cell">
                   <TextCard>
                    <p>Some things users will be able to do include:</p>

                    <ul>
                      <li>
                        <p>Create polls to gather feedback from the real world, and to identify winning products</p>
                      </li>

                      <li>
                        <p>Vote &amp; comment on polls to help other users find the products that suite their needs best</p>
                      </li>

                      <li>
                        <p>Purchase products via our platform for rewards including POVO points, free shipping, and exclusive discount opportunities</p>
                      </li>
                    </ul>
                  </TextCard>
                </div>

                <div className="pv-cgg-quarter-cell">
                  <PollCard
                    poll={Immutable.fromJS({
                      title: "Which sofa for a studio flat?",
                      author: "sytchen",
                      date: Date.now(),
                      rewards: [
                        { image: "/img/products/sofas/1.jpg" },
                        { image: "/img/products/sofas/2.jpg" },
                        { image: "/img/products/sofas/3.jpg" },
                      ]
                    })}
                  />

                  <PollCard
                    poll={Immutable.fromJS({
                      title: "Teapots: Are these any good?",
                      author: "mike",
                      date: Date.now(),
                      rewards: [
                        { image: "/img/products/teapots/1.jpg" },
                        { image: "/img/products/teapots/2.jpg" },
                        { image: "/img/products/teapots/3.jpg" },
                      ]
                    })}
                  />
                </div>
              </div>

              <div className="pv-cg-column pv-cgc-two">
                <div className="pv-cgg-modal-cell">
                  <PollCard
                    large={true}
                    poll={Immutable.fromJS({
                      title: "Which Fallout game is the best?",
                      teaser: "I'm new to fallout, and want to know where to start.",
                      author: "gman42",
                      date: Date.now(),
                      rewards: [
                        { image: "/img/products/fallout/1.jpg" },
                        { image: "/img/products/fallout/2.jpg" },
                        { image: "/img/products/fallout/3.png" },
                        { image: "/img/products/fallout/4.png" },
                      ]
                    })}
                  />
                </div>

                <div className="pv-cgg-quarter-cell">
                  <PollCard
                    poll={Immutable.fromJS({
                      title: "Headphones; in or over ear?",
                      author: "rachelmk",
                      date: Date.now(),
                      rewards: [
                        { image: "/img/products/headphones/1.jpg" },
                        { image: "/img/products/headphones/2.jpg" },
                      ]
                    })}
                  />

                  <PollCard
                    poll={Immutable.fromJS({
                      title: "Winter is coming",
                      author: "bash",
                      date: Date.now(),
                      rewards: [
                        { image: "/img/products/jackets/1.jpg" },
                        { image: "/img/products/jackets/2.jpg" },
                        { image: "/img/products/jackets/3.jpg" },
                      ]
                    })}
                  />
                </div>
              </div>
            </div>

            {/*<div className="pv-cb-load">
              <button>Load More</button>
            </div>*/}
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
