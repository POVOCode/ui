import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import Logo from "../../logo.react";
import { mergeClassNames } from "../../../util/methods";
import "./style.styl";

const NavBar = ({ logoRoute, logoPayload, currentLocation, navigate, links }) => {
  const route = currentLocation.get("route");

  return (
    <nav id="pv-navbar">
      <Logo
        onClick={(e) => {
          navigate(new Immutable.Map({
            route: logoRoute || "p.home",
          }));
        }}
      />

      <ul>
        {links.map(l =>
          <li key={l.label}>
            <a
              href={l.href}

              className={mergeClassNames({
                bordered: l.bordered,
              })}

              onClick={l.onClick ? l.onClick : (e) => {
                if (typeof l.loc === "undefined" || !l.loc) return;

                navigate(l.loc);

                e.preventDefault();
                e.stopPropagation();
                return false;
              }}
            >
              {l.label}
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

NavBar.propTypes = {
  navigate: PropTypes.func.isRequired,
  currentLocation: PropTypes.object,
  links: PropTypes.array,

  logoRoute: PropTypes.string,
  logoPayload: PropTypes.object,
};

export default NavBar;
