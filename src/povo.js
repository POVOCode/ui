import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import Bus from "./lib/bus/bus";
import Routable from "./lib/routable.react";
import NavBar from "./lib/ui/nav/navbar.react";
import ModalToaster from "./lib/ui/notifications/modal_toaster.react";
import BottomBar from "./lib/ui/nav/bottombar.react";
import DevInfoBar from "./lib/ui/dev_info.react";

import HomeView from "./lib/ui/public/home.react";
import UserProfileView from "./lib/ui/user/profile.react";
import PollView from "./lib/ui/poll/view.react";
import PollIndexView from "./lib/ui/poll/index.react";
import PollEditView from "./lib/ui/poll/edit.react";
import PollResultsView from "./lib/ui/poll/results.react";
import RewardView from "./lib/ui/reward/view.react";
import RewardIndexView from "./lib/ui/reward/index.react";

import ModalLoginForm from "./lib/ui/modals/login.react";
import ModalSignupForm from "./lib/ui/modals/signup.react";

import { ternaryFunc } from "./lib/util/methods";

import "./lib/ui/css_components/fake_logo.styl";
import "./lib/ui/css_components/li_active_marker.styl";
import "./lib/ui/css_components/screen_fader.styl";

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
    super(props, "pv");

    this.state.busState = Bus.state;
    this.state.fadeScreen = false;
    this.state.loginFormOpen = false;
    this.state.signupFormOpen = false;

    this.onLogout = this.onLogout.bind(this);
    this.onBusUpdate = this.onBusUpdate.bind(this);

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLoginCloseClick = this.onLoginCloseClick.bind(this);
    this.onLoginSubmitClick = this.onLoginSubmitClick.bind(this);

    this.onSignupClick = this.onSignupClick.bind(this);
    this.onSignupCloseClick = this.onSignupCloseClick.bind(this);
    this.onSignupSubmitClick = this.onSignupSubmitClick.bind(this);
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
          route: "u.poll.edit",
          // route: "u.profile",
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

  onSignupClick() {
    this.setState(() => ({
      signupFormOpen: true,
      loginFormOpen: false,
    }));
  }

  onSignupCloseClick() {
    this.setState(() => ({
      signupFormOpen: false,
    }));
  }

  onSignupSubmitClick({ username, email, postcode }) {
    console.log({ username, email, postcode });
  }

  onLoginClick() {
    this.setState(() => ({
      loginFormOpen: true,
      signupFormOpen: false,
    }));
  }

  onLoginCloseClick() {
    this.setState(() => ({
      loginFormOpen: false,
    }));
  }

  onLoginSubmitClick({ email, password }) {
    this.setState(() => ({
      fadeScreen: true,
    }));

    Bus.actions.user.login({
      email,
      password,
    }).then(() => {
      this.setState(() => ({
        fadeScreen: false,
        lastError: null,
      }));

      this.props.navigate(Immutable.Map({
        route: "u.polls"
      }));
    }).catch((e) => {
      if (e && e.message) {
        this.setState(() => ({
          fadeScreen: false,
          lastError: e.message,
        }));
      }
    });
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

    // TODO: Remove these
    console.log("Rendered route:");
    console.log(JSON.stringify(loc.toJS()));

    return (
      <div id="pv">
        {ternaryFunc(this.state.fadeScreen, () =>
          <div id="pv-screen-fader" />
        )}

        <DevInfoBar
          currentLocation={loc}
        />

        <NavBar
          navigate={this.navigate}
          currentLocation={loc}
          logoRoute="p.home"
          links={[{
            bordered: true,
            label: "Create Poll",
            href: "#",
          }, {
            label: "Login",
            href: "javascript:void(0)",
            onClick: this.onLoginClick,
          }, {
            label: "Sign up",
            href: "javascript:void(0)",
            onClick: this.onSignupClick,
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

        {ternaryFunc(this.state.loginFormOpen, () =>
          <ModalLoginForm
            onSubmit={this.onLoginSubmitClick}
            onClose={this.onLoginCloseClick}
            onSignupClick={this.onSignupClick}
          />
        )}

         {ternaryFunc(this.state.signupFormOpen, () =>
          <ModalSignupForm
            onSubmit={this.onSignupSubmitClick}
            onClose={this.onSignupCloseClick}
            onLoginClick={this.onLoginClick}
          />
        )}
     </div>
    );
  }
}

POVO.propTypes = {};

export default POVO;
