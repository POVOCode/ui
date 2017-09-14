import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import Bus from "./lib/bus/bus";
import Routable from "./lib/routable.react";
import NavBar from "./lib/ui/nav/navbar.react";
import ModalToaster from "./lib/ui/notifications/modal_toaster.react";
import BottomBar from "./lib/ui/nav/bottombar.react";
import DevBar from "./lib/ui/dev_info.react";
import UserSidebar from "./lib/ui/user_sidebar.react";

import HomeView from "./lib/ui/public/home.react";
import UserProfileView from "./lib/ui/user/profile.react";
import PollView from "./lib/ui/poll/view.react";
import PollIndexView from "./lib/ui/poll/index.react";
import PollEditView from "./lib/ui/poll/edit.react";
import PollResultsView from "./lib/ui/poll/results.react";
import RewardView from "./lib/ui/reward/view.react";
import RewardIndexView from "./lib/ui/reward/index.react";
import AdminUserView from "./lib/ui/admin/users.react";
import AdminRewardView from "./lib/ui/admin/rewards.react";

import ModalLoginForm from "./lib/ui/modals/login.react";
import ModalSignupForm from "./lib/ui/modals/signup.react";
import ModalPreRegisterForm from "./lib/ui/modals/pre_register.react";
import ModalPreRegisterConfirmation from "./lib/ui/modals/pre_register_confirmation.react";

import { ternaryFunc } from "./lib/util/methods";

import "./lib/ui/css_components/fake_logo.styl";
import "./lib/ui/css_components/li_active_marker.styl";
import "./lib/ui/css_components/screen_fader.styl";
import "./lib/ui/css_components/content_wrapper.styl";
import "./lib/ui/css_components/button.styl";
import "./lib/ui/css_components/admin.styl";

const RouteTable = {
  "p.home": {
    view: HomeView,
    bottombar: true,
  },

  "u.profile": UserProfileView,

  "u.poll": PollView,
  "u.polls": PollIndexView,
  "u.poll.edit": PollEditView,
  "u.poll.results": PollResultsView,

  "u.reward": RewardView,
  "u.rewards": RewardIndexView,

  "a.users": AdminUserView,
  "a.rewards": AdminRewardView,
};

class POVO extends Routable {

  constructor(props) {
    super(props, "pv");

    this.state.busState = Bus.state;
    this.state.fadeScreen = false;
    this.state.loginFormOpen = false;
    this.state.signupFormOpen = false;
    this.state.preRegisterFormOpen = false;
    this.state.preRegisterConfirmationOpen = false;
    this.state.userSidebarVisible = false;
    this.state.welcomeToastDismissed = false;

    this.onLogout = this.onLogout.bind(this);
    this.onBusUpdate = this.onBusUpdate.bind(this);

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLoginCloseClick = this.onLoginCloseClick.bind(this);
    this.onLoginSubmitClick = this.onLoginSubmitClick.bind(this);

    this.onSignupClick = this.onSignupClick.bind(this);
    this.onSignupCloseClick = this.onSignupCloseClick.bind(this);
    this.onSignupSubmitClick = this.onSignupSubmitClick.bind(this);

    this.onPreRegisterClick = this.onPreRegisterClick.bind(this);
    this.onPreRegisterCloseClick = this.onPreRegisterCloseClick.bind(this);
    this.onPreRegisterCompletion = this.onPreRegisterCompletion.bind(this);
    this.onPreRegisterConfirmationCloseClick = this.onPreRegisterConfirmationCloseClick.bind(this);

    this.onDevBarLocationChange = this.onDevBarLocationChange.bind(this);
    this.onDismissWelcomeToast = this.onDismissWelcomeToast.bind(this);

    this.onMenuIconClick = this.onMenuIconClick.bind(this);
    this.onCloseUserSidebar = this.onCloseUserSidebar.bind(this);
    this.onUserSidebarNavigate = this.onUserSidebarNavigate.bind(this);
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
            route: "p.home",
          }));
        }

      }).catch((err) => {
        Bus.resetState({ noUpdate: true });

        this.navigate(Immutable.Map({
          route: "p.home",
        }));
      });
  }

  loadAllData() {
    const collections = [
      "poll",
      "reward",
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
      preRegisterFormOpen: false,
      preRegisterConfirmationOpen: false,
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
      preRegisterFormOpen: false,
      preRegisterConfirmationOpen: false,
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
        loginFormOpen: false,
      }));

      this.navigate(Immutable.fromJS({
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

  onPreRegisterClick() {
    this.setState(() => ({
      preRegisterFormOpen: true,
      preRegisterConfirmationOpen: false,
      loginFormOpen: false,
      signupFormOpen: false,
    }));
  }

  onPreRegisterCloseClick() {
    this.setState(() => ({
      preRegisterFormOpen: false,
    }));
  }

  onPreRegisterConfirmationCloseClick() {
    this.setState(() => ({
      preRegisterConfirmationOpen: false,
    }));
  }

  onPreRegisterCompletion() {
     this.setState(() => ({
      preRegisterFormOpen: false,
      preRegisterConfirmationOpen: true,
    }));
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
    const v = RouteTable[loc.get("route")];

    if (typeof v === "object" && v.view) {
      return v.view;
    } else {
      return v;
    }
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
          userSidebarVisible: false,
        }));
      });
  }

  onDevBarLocationChange(loc) {
    this.navigate(loc);
  }

  onMenuIconClick() {
    const { userSidebarVisible } = this.state;

    this.setState(() => ({
      userSidebarVisible: !userSidebarVisible,
    }));
  }

  onCloseUserSidebar() {
    this.setState(() => ({
      userSidebarVisible: false,
    }));
  }

  onUserSidebarNavigate(loc) {
    this.navigate(loc);

    this.setState(() => ({
      userSidebarVisible: false,
    }));
  }

  onDismissWelcomeToast() {
    this.setState(() => ({
      welcomeToastDismissed: true,
    }));
  }

  render() {
    const viewHTML = this.renderView();
    const loc = this.getCurrentLocation();
    const viewConfig = RouteTable[loc.get("route")];
    const user = this.state.busState.getIn(["user", "active"]);
    const navLinks = [];

    if (!viewConfig) {
      this.navigate(Immutable.fromJS({
        route: "p.home",
      }));

      return null;
    }

    const { bottombar } = viewConfig || {};

    if (user) {
      navLinks.push({
        bordered: true,
        label: "Create Poll",
        href: "javascript:void(0)",
        loc: Immutable.fromJS({
          route: "u.poll.create",
        }),
      });

      navLinks.push({
        label: "My Account",
        href: "javascript:void(0)",
        loc: Immutable.fromJS({
          route: "u.profile",
        }),
      });

      navLinks.push({
        icon: "menu",
        href: "javascript:void(0)",
        onClick: this.onMenuIconClick,
      });
    } else {
      navLinks.push({
        label: "Login",
        href: "javascript:void(0)",
        onClick: this.onLoginClick,
      });

      navLinks.push({
        bordered: true,
        label: "Pre-Register",
        href: "javascript:void(0)",
        onClick: this.onPreRegisterClick,
      });
    }

    return (
      <div id="pv">
        {ternaryFunc(this.state.fadeScreen, () =>
          <div id="pv-screen-fader" />
        )}

        {ternaryFunc(user && user.get("admin"), () =>
          <DevBar
            currentLocation={loc}
            routes={Object.keys(RouteTable)}
            onLocationChange={this.onDevBarLocationChange}
          />
        )}

        <NavBar
          navigate={this.navigate}
          currentLocation={loc}
          logoRoute="p.home"
          links={navLinks}
        />

        {ternaryFunc(!user && !this.state.welcomeToastDismissed, () =>
          <ModalToaster
            toast={Immutable.Map({
              message: "Get 40 points when you sign up!",
              onClick: this.onLoginClick,
              onClose: this.onDismissWelcomeToast,
            })}
          />
        )}

        {viewHTML}

        {ternaryFunc(bottombar, () =>
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
        )}

        {ternaryFunc(this.state.userSidebarVisible, () =>
          <UserSidebar
            currentLocation={loc}
            navigate={this.onUserSidebarNavigate}
            onClose={this.onCloseUserSidebar}
            links={[{
              route: "p.home",
              icon: "icon-home",
              label: "Home",
              last: true,
            }, {
              route: "u.profile",
              icon: "icon-user",
              label: "My Account",
            }, {
              route: "u.polls",
              icon: "icon-chart-bar",
              label: "My Polls",
            }, {
              route: "u.rewards",
              icon: "icon-gift",
              label: "Rewards",
              last: true,
            }, {
              icon: "icon-logout",
              label: "Logout",
              onClick: this.onLogout,
            }]}
          />
        )}

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

        {ternaryFunc(this.state.preRegisterFormOpen, () =>
          <ModalPreRegisterForm
            onCompletion={this.onPreRegisterCompletion}
            onClose={this.onPreRegisterCloseClick}
          />
        )}

        {ternaryFunc(this.state.preRegisterConfirmationOpen, () =>
          <ModalPreRegisterConfirmation
            onClose={this.onPreRegisterConfirmationCloseClick}
          />
        )}
     </div>
    );
  }
}

POVO.propTypes = {};

export default POVO;
