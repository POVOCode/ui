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

    create(data) {
      return rewardChainGen({
        type: "single",
        p: RewardAPI.create(data),
      });
    },

    update(data) {
      return rewardChainGen({
        type: "single",
        p: RewardAPI.update(data),
      });
    },

    delete(data) {
      return rewardChainGen({
        type: "delete",
        p: RewardAPI.delete(data),
      });
    },

  };

};

export default RewardActions;
