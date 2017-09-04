import React from "react";
import PropTypes from "prop-types";

import { mergeClassNames, ternaryFunc } from "../../util/methods";
import "./style.styl";

const InlineCheckbox = (props) => {
  const { iconChecked, iconUnchecked, label, onChange, value } = props;

  return (
    <div className={mergeClassNames("pvc-inline-checkbox", props.className || "")}>
      <i
        onClick={!onChange ? undefined : () => onChange(!value)}
        className={mergeClassNames({
          [`icon-${iconChecked}`]: value,
          [`icon-${iconUnchecked}`]: !value,

          checked: value,
          unchecked: !value,
        })}
      />

      <p>{label}</p>
    </div>
  );
};

InlineCheckbox.propTypes = {
  iconChecked: PropTypes.string.isRequired,
  iconUnchecked: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,

  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
}

export default InlineCheckbox;
