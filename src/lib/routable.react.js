import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

/**
 * Implements basic navigation w/ history tracking. Relies on the extending
 * class for actual rendering.
 */
class Routable extends React.Component {

  /**
   * @param {Object} props 
   * @param {String} id used for localStorage key
   */
  constructor(props, id) {
    super(props);
    this.id = id;

    const loc = this.getStoredLocation();
    const locationHistory = loc
      ? Immutable.List([ loc ])
      : props.defaultLocation
        ? Immutable.List([ props.defaultLocation ])
        : Immutable.List();

    this.state = {
      locationHistory,
    };

    this.navigate = this.navigate.bind(this);
  }

  getKey() {
    return `dt.routable.${this.id}`;
  }

  getStoredLocation() {
    try {
      return Immutable.fromJS(JSON.parse(localStorage[this.getKey()]));
    } catch (e) {
      return null;
    }
  }

  storeLocation(l) {
    localStorage[this.getKey()] = JSON.stringify(l.toJS());
  }

  getCurrentLocation() {
    return this.state.locationHistory.last();
  }

  /**
   * Checks if we are already at the specified location.
   *
   * @param {Object{route,props}} loc
   */
  isCurrentLocation(loc) {
    const currentLoc = this.state.locationHistory.last();

    return loc === currentLoc ||
           (loc.get("route") === currentLoc.get("route") &&
           loc.get("props") === currentLoc.get("props"));
  }

  /**
   * Navigates to the specified target route/props, *only* if we are not
   * already there.
   * 
   * TODO: Handle URL updates
   * TODO: Implement back() method (pop)
   * 
   * @param {Object{route,props}} loc route/props combo to nav to
   */
  navigate(loc) {
    if (this.isCurrentLocation(loc)) return;

    this.setState(() => ({
      locationHistory: this.state.locationHistory.push(loc),
    }));

    this.storeLocation(loc);

    if (this.props.onNavigate) {
      this.props.onNavigate(loc);
    }
  }

  /**
   * Returns the specific view to render for the requested location.
   *
   * @param {Map} loc location to render
   * @return {html} content
   */
  getViewForLocation(loc) {
    return null;
  }

  /**
   * Provides the raw props hash that gets passed to the current view
   * 
   * @param {Map} loc
   * @return {Object} props
   */
  getViewProps(loc) {
    return {};
  }

  /**
   * Handles view selection & prop generation.
   *
   * @return {html} content
   */
  renderView() {
    const loc = this.state.locationHistory.last();
    const V = this.getViewForLocation(loc);

    const viewProps = this.getViewProps(loc);
    const locProps = loc.get("props");

    if (locProps) {
      Object.assign(viewProps, locProps.toJS());
    }

    return (
      <V {...viewProps} />
    );
  }

  /**
   * Actual render method, by default just passes the view through.
   * 
   * @return {html}
   */
  render() {
    return this.renderView();
  }

};

Routable.propTypes = {
  defaultLocation: PropTypes.object,
  onNavigate: PropTypes.func,
};

export default Routable;

