import React from "react";
import PropTypes from "prop-types";

import { mergeClassNames } from "../../util/methods";
import "./style.styl";

const CardGrid = (props) => {
  const {
    items, itemsPerRow, renderItem, className, children, ...extraProps,
  } = props;

  const finalClassName = mergeClassNames("pvc-card-grid", className || "");

  // Pass through to children by default
  if (!items || !renderItem) {
    return (
      <div
        className={finalClassName}
        {...extraProps}
      >{children}</div>
    );
  }

  // Allow uniform list rendering
  return (
    <div
      className={finalClassName}
      {...extraProps}
    >
      <ul>
        {items.map((item, i) => 
          <li
            key={i}
            style={{
              width: `calc((100% - (17px * ${itemsPerRow})) * ${1 / itemsPerRow})`
            }}
          >{renderItem(item)}</li>
        )}
      </ul>
    </div>
  );
};

CardGrid.propTypes = {
  items: React.PropTypes.array,
  renderItem: React.PropTypes.func,
  itemsPerRow: React.PropTypes.number,
};

export default CardGrid;
