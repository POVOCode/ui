import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import { mergeClassNames } from "../../../util/methods";
import "./style.styl";

const BottomBar = ({ currentLocation, navigate, links }) => {
  const route = currentLocation.get("route");

  return (
    <nav id="pv-bottombar">
      <p>&copy; Povo 2017</p>

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

BottomBar.propTypes = {
  bordered: PropTypes.bool,
  navigate: PropTypes.func.isRequired,
  currentLocation: PropTypes.object,
  links: PropTypes.array,
};

export default BottomBar;