import RewardAPI from "../../api/reward";
import { apiChainGenFor } from "../../util/promise_chains";

const RewardActions = (bus) => {
  const rewardChainGen = apiChainGenFor({
    bus,
    model: "reward",
    nSingle: "reward",
    nMultiple: "rewards",
  });

  return {
    autoload: "loadAll",

    loadAll() {
      return rewardChainGen({
        type: "multiple",
        p: RewardAPI.getAll(),
      });
    },
  };

};

export default RewardActions;
