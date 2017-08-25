import React from "react";
import PropTypes from "prop-types";

import { mergeClassNames, ternaryFunc } from "../../util/methods";

import "./style.styl";

const Leaderboard = ({ title, data, valColor, italics }) => {
  return (
    <div className={mergeClassNames("pvc-leaderboard", {
      italics,
    })}>
      <p>{title}</p>

      <ul>
        {data.map(entry =>
          <li
            key={entry.label}
            className={mergeClassNames({
              noValue: typeof entry.value === "undefined",
            })}
          >
            <p className="pvc-l-label">{entry.label}</p>

            {ternaryFunc(typeof entry.value !== "undefined", () =>
              <p
                className="pvc-l-value"
                style={{
                  color: valColor || "auto",
                }}
              >{entry.value}</p>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

Leaderboard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,

  valColor: PropTypes.string,
  italics: PropTypes.bool,
}

export default Leaderboard;
