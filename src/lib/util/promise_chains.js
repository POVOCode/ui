/**
 * Utility to generate a common promise change for handling API responses.
 * Supports single & multiple model updates, and single model deletions.
 * 
 * @param {Object} opts 
 * @option opts {Bus} bus instance to apply changes to
 * @option opts {String} type updater type (single/multiple/delete)
 * @option opts {String} model name of collection to affect
 * @option opts {String} nSingle key name on single-model API responses
 * @option opts {String} nMultiple key name on multi-model API responses
 * @option opts {Promise} p promise to build chain upon
 * @option opts {Function,String} toastMessage optional
 * @return {Promise} p
 */
const genAPIChain = (opts) => {
  const { bus, type, model, nSingle, nMultiple, p, toastMessage } = opts;

  return p
    .then(bus.updates[type](model, nSingle, nMultiple))
    .then((res) => {
      if (typeof toastMessage === "string") {
        console.info(toastMessage);
      } else if (typeof toastMessage === "function") {
        console.info(toastMessage(res));
      }

      return res;
    }).catch(console.error);
};

/**
 * Generates a generator (I know) for a specific model/bus combo. Saves some
 * typing...
 *
 * @param {Object} opts
 * @option opts {String} model name of target collection for generator
 * @option opts {String} nSingle key name on single-model API responses
 * @option opts {String} nMultiple key name on multi-model API responses
 * @option opts {String} bus target bus for changes
 * @return {Function} gen generator that does not require a model name
 */
const apiChainGenFor = ({ model, nSingle, nMultiple, bus }) => {
  return (opts) => {
    return genAPIChain(Object.assign({
      model,
      nSingle,
      nMultiple,
      bus,
    }, opts));
  };
};

export { genAPIChain, apiChainGenFor };
