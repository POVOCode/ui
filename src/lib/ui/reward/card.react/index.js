import React from "react";
import PropTypes from "prop-types";

import { mergeClassNames, ternaryFunc } from "../../../util/methods";

import Card from "../../card.react";

const RewardCard = ({
  reward, onClick, onInfoClick, small, hoverable, selected, onSelectClick,
}) => {
  return (
    <Card
      onClick={onClick}
      hoverable={hoverable}

      className={mergeClassNames("pvc-reward-card", {
        small,
      })}
    >
      {ternaryFunc(onInfoClick && !onSelectClick, () =>
        <div className="pvc-rc-icon">
          <i
            className="icon-info-circled"
            onClick={onInfoClick}
          />

          <i className="icon-info-circled-alt" />
        </div>
      )}

      {ternaryFunc(onSelectClick && !onInfoClick, () =>
        <div
          className="pvc-rc-icon"
          onClick={onSelectClick}
        >
          <i className={selected ? "icon-ok-circled" : "icon-plus"} />
        </div>
      )}

      <div
        className="img-wrapper"
        style={{
          backgroundImage: `url("${reward.image_url}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      <article>
        <h3>{reward.label}</h3>

        <cite>By {reward.brand}</cite>
      </article>
    </Card>
  );
};

RewardCard.propTypes = {
  reward: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onInfoClick: PropTypes.func,
  small: PropTypes.bool,

  hoverable: PropTypes.bool,
  selected: PropTypes.bool,
  onSelectClick: PropTypes.bool,
};

export default RewardCard;
