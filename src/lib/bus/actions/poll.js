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

    create(data) {
      return pollChainGen({
        type: "single",
        p: PollAPI.create(data),
      });
    },

    update(data) {
      return pollChainGen({
        type: "single",
        p: PollAPI.update(data),
      });
    },

    delete(data) {
      return pollChainGen({
        type: "delete",
        p: PollAPI.delete(data),
      });
    },
  };

};

export default PollActions;
