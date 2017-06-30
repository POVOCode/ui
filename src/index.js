import React from "react";
import { render } from "react-dom";
import Immutable from "immutable";

import POVO from "./povo";
import Bus from "./lib/bus/bus";

import "./index.styl";

document.addEventListener("DOMContentLoaded", (event) => {
  const { state } = Bus;

  render((
    <POVO
      defaultLocation={Immutable.Map({
        route: state && state.has("user") && state.getIn(["user", "active"])
          ? "u.poll"
          : "p.home",
      })}
    />
  ), document.getElementById("root"));
});