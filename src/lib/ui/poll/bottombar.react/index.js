import React from "react";
import PropTypes from "prop-types";

import { mergeClassNames, ternaryFunc } from "../../../util/methods";
import "./style.styl";

const PollBottomBar = ({ steps, activeStep, label, buttons }) => {
  const stepElements = [];

  if (steps && steps.length > 0) {
    for (let i = 0; i < steps.length; i += 1) {
      stepElements.push(steps[i]);

      if (i !== steps.length - 1) {
        stepElements.push(null);
      }
    }
  }

  return (
    <div id="pvc-poll-bottom-bar">
      <i className="icon-chart-bar" />

      {ternaryFunc(stepElements.length === 0, () =>
        <p>{label || ""}</p>
      )}

      {ternaryFunc(stepElements.length > 0, () =>
        <ul>
          {stepElements.map((s, i) =>
            <li key={i}>
              {s === null ? (
                <i className="icon-right-open" />
              ) : (
                <p
                  className={mergeClassNames({
                    active: i === activeStep,
                  })}
                >{s}</p>
              )}
            </li>
          )}
        </ul>
      )}

      {buttons.map(b =>
        <div key={b.label}>
          <a
            href="javascript:void(0)"
            className={b.className || ""}
            onClick={b.onClick}
          >{b.label}</a>
        </div>
      )}
    </div>
  );
};

PollBottomBar.propTypes = {
  buttons: PropTypes.array.isRequired,
  label: PropTypes.string,
  steps: PropTypes.array,
  activeStep: PropTypes.number,
};

export default PollBottomBar;
