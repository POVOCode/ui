import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import { mergeClassNames, ternaryFunc } from "../../util/methods";
import "./style.styl";

/**
 * Very simple static dropdown implementation, with custom POVO CSS.
 */
class Dropdown extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.onLabelClick = this.onLabelClick.bind(this);
  }

  /**
   * Toggle option list expansion on label click, if there are options.
   *
   * @param {Event} e
   */
  onLabelClick(e) {
    if (!this.props.options || this.props.options.count() === 0) return;

    const { expanded } = this.state;

    this.setState(() => ({
      expanded: !expanded,
    }));
  }

  render() {
    const { expanded } = this.state;
    const { value, placeholder, options, onChange } = this.props;

    return (
      <div className="pv-dropdown">
        <div
          className="pv-dd-label"
          onClick={this.onLabelClick}
        >
          {value ? value.get("label") : ("Select an option" || placeholder)}

          <span className="pt-icon-standard pt-icon-chevron-down" />
        </div>

        {ternaryFunc(expanded && options && options.size > 0, () =>
          <ul>
            {options.map(o =>
              <li
                key={o.get("value")}
                onClick={!onChange ? null : () => onChange(o)}

                className={mergeClassNames({
                  selected: o.get("value") === value.get("value"),
                })}

              >{o.get("label")}</li>
            ).toJS()}
          </ul>
        )}
      </div>
    );
  }
};

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.object,

  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default Dropdown;
