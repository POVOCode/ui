import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import Bus from "./lib/bus/bus";
import Routable from "./lib/routable.react";
import NavBar from "./lib/ui/nav/navbar.react";
import ModalToaster from "./lib/ui/notifications/modal_toaster.react";
import BottomBar from "./lib/ui/nav/bottombar.react";

import HomeView from "./lib/ui/public/home.react";
import UserProfileView from "./lib/ui/user/profile.react";
import PollView from "./lib/ui/poll/view.react";
import PollIndexView from "./lib/ui/poll/index.react";
import PollEditView from "./lib/ui/poll/edit.react";
import PollResultsView from "./lib/ui/poll/results.react";
import RewardView from "./lib/ui/reward/view.react";
import RewardIndexView from "./lib/ui/reward/index.react";

import { ternaryFunc } from "./lib/util/methods";

const RouteTable = {
  "p.home": HomeView,
  "u.profile": UserProfileView,

  "u.poll": PollView,
  "u.polls": PollIndexView,
  "u.poll.edit": PollEditView,
  "u.poll.results": PollResultsView,

  "u.reward": RewardView,
  "u.rewards": RewardIndexView,
};

class POVO extends Routable {

  constructor(props) {
    super(props);

    this.state.busState = Bus.state;
    this.state.fadeScreen = false;

    this.onLogout = this.onLogout.bind(this);
    this.onBusUpdate = this.onBusUpdate.bind(this);
  }

  componentDidMount() {
    Bus.registerUpdateListener(this.onBusUpdate);

    this.doAuthTestAndRedirect();
  }

  componentWillUnmount() {
    Bus.unregisterUpdateListener(this.onBusUpdate);
  }

  /**
   * Attempt to load the active user; if that fails, then reset all local data
   * and navigate to the login page.
   * 
   * Otherwise, navigate to the dashboard.
   */
  doAuthTestAndRedirect() {
    Bus.actions.user
      .loadActive()
      .then(() => {
        this.loadAllData();

        const l = this.getCurrentLocation();

        if (l.get("route")[0] !== "u") {
          this.navigate(Immutable.Map({
            route: "u.poll",
          }));
        }

      }).catch((err) => {
        console.error(err);

        Bus.resetState({ noUpdate: true });

        this.navigate(Immutable.Map({
          // route: "p.home",
          route: "u.profile",
        }));
      });
  }

  loadAllData() {
    const collections = [
      "polls",
      "rewards",
    ];

    for (let i = 0; i < collections.length; i++) {
      const actions = Bus.actions[collections[i]];

      if (actions[actions.autoload]) {
        actions[actions.autoload]();
      }
    }
  }

  onBusUpdate({ prev, curr }) {
    this.setState(() => ({
      busState: curr,
    }));

    if ((!prev.get("user") || !prev.getIn(["user", "active"])) && (curr.get("user") && curr.getIn(["user", "active"]))) {
      this.loadAllData();
    }
  }

  getViewForLocation(loc) {
    return RouteTable[loc.get("route")];
  }

  getViewProps(loc) {
    return {
      actions: Bus.actions,
      state: this.state.busState,
      navigate: this.navigate,
    };
  }

  onLogout() {
    this.setState(() => ({
      fadeScreen: true,
    }));

    Bus.actions.user
      .logout()
      .then(() => {
        this.navigate(Immutable.Map({
          route: "p.home",
        }));

        this.setState(() => ({
          fadeScreen: false,
        }));
      });
  }

  render() {
    const viewHTML = this.renderView();
    const loc = this.getCurrentLocation();

    return (
      <div id="pv">
        <NavBar
          navigate={this.navigate}
          currentLocation={loc}
          links={[{
            bordered: true,
            label: "Create Poll",
            href: "#",
          }, {
            label: "Login",
            href: "#",
          }, {
            label: "Sign up",
            href: "#",
          }]}

        />

        <ModalToaster
          toast={Immutable.Map({
            message: "Get 40 points when you sign up",
            onClick: (() => {}), // To get the icon
          })}
        />

        {viewHTML}

        <BottomBar
          navigate={this.navigate}
          currentLocation={loc}
          links={[{
            label: "About",
            href: "#",
          }, {
            label: "FAQ",
            href: "#",
          }, {
            label: "Contact",
            href: "#",
          }, {
            label: "Partner",
            href: "#",
          }]}
        />
      </div>
    );
  }
}

POVO.propTypes = {};

export default POVO;
