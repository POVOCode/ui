import PollAPI from "../../api/poll";
import { apiChainGenFor } from "../../util/promise_chains";

const PollActions = (bus) => {
  const pollChainGen = apiChainGenFor({
    bus,
    model: "poll",
    nSingle: "poll",
    nMultiple: "polls",
  });

  return {
    autoload: "loadAll",

    loadAll() {
      return pollChainGen({
        type: "multiple",
        p: PollAPI.getAll(),
      });
    },
  };

};

export default PollActions;
