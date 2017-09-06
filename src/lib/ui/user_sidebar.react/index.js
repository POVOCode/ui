import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import { mergeClassNames } from "../../util/methods";

import "./style.styl";

const UserSidebar = ({ currentLocation, navigate, onClose, links }) => {
  return (
    <div id="pvc-user-sidebar">
      <div id="pvc-us-close">
        <i
          className="icon-cancel"
          onClick={onClose}
        />
      </div>

      <ul>
        {links.map(l =>
          <li
            key={l.label}
            className={mergeClassNames({
              last: l.last,
            })}
          >
            <a
              href="javascript:void(0)"
              onClick={l.onClick ? l.onClick : (e) => {
                navigate(Immutable.fromJS({
                  route: l.route,
                  props: l.props || {},
                }));
              }}
            >
              <i className={l.icon} />
              <p>{l.label}</p>
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

UserSidebar.propTypes = {
  currentLocation: PropTypes.object,
  navigate: PropTypes.func.isRequired,
  links: PropTypes.array.isRequired,
  onClose: PropTypes.func,
};

export default UserSidebar;
