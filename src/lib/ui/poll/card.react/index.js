import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import { mergeClassNames, ternaryFunc } from "../../../util/methods";
import "./style.styl";

const PollCard = ({ large, poll, onVoteClick }) => {
  const rewards = poll.get("rewards");
  const title = poll.get("title");

  return (
    <div className={mergeClassNames("pv-poll-card", {
      large,
    })}>
      {ternaryFunc(rewards && rewards.size > 0, () =>
        <ul className={mergeClassNames("pv-pc-reward-images", {
          quarters: rewards.size >= 4,
          thirds: rewards.size === 3,
          halves: rewards.size === 2,
          single: rewards.size <= 1,
        })}>
          {rewards.map((r, i) => {
            if (i >= 4) return null;

            return (
              <li
                key={i}
                style={{
                  backgroundImage: `url('${r.get("image")}')`,
                }}
              />
            );
          })}
        </ul>
      )}

      <article>
        {large ? (<h3>{title}</h3>) : (<h5>{title}</h5>)}

        <div className="pv-pc-lower-wrapper">
          <div className="pv-pclw-info">
            {ternaryFunc(large, () =>
              <p className="pv-pclwi-teaser">{poll.get("teaser")}</p>
            )}

            <p className="pv-pclwi-byline">
              {`By ${poll.get("author")} \u2022 ${new Date(poll.get("date")).toLocaleDateString()}`}
            </p>
          </div>

          {ternaryFunc(large, () =>
            <div>
              <button
                onClick={onVoteClick}
              >Vote</button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

PollCard.propTypes = {
  large: PropTypes.bool,
  poll: PropTypes.object.isRequired,
  onVoteClick: PropTypes.func,
};

export default PollCard;
