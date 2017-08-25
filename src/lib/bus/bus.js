import Immutable from "immutable";

import PollActions from "./actions/poll";
import RewardActions from "./actions/reward";
import UserActions from "./actions/user";

// 0.1 - Initial version
const VERSION = 0.1;
const STORAGE_KEY = "pv.bus";

// Load pre-existing state, check if it's valid
const existingDataJSON = localStorage[STORAGE_KEY];
let existingData;

try {
  const storedData = JSON.parse(existingDataJSON);

  if (storedData.v === VERSION) {
    existingData = Immutable.fromJS(storedData);
  }
} catch (e) {
  existingData = null;
}

const getFreshState = () => {
  return Immutable.Map({
    v: VERSION,
  });
}

const Bus = {
  state: existingData || getFreshState(),
  updateListeners: [],

  getDebugInfo() {
    const jsState = Bus.state.toJS();
    const serialized = JSON.stringify(jsState);

    return [
      `${Object.keys(jsState).length} keys`,
      `${Math.floor((serialized.length / 1024) * 1000) / 1000}kB`,
    ].join(", ");
  },

  resetState(opts) {
    const noUpdate = opts ? !!opts.noUpdate : false;
    const oldState = Bus.state;

    Bus.state = getFreshState();

    if (!noUpdate) {
      Bus.notifyUpdateListeners({
        prev: oldState,
        curr: Bus.state,
      });
    }
  },

  registerUpdateListener(cb) {
    Bus.updateListeners.push(cb);
  },

  unregisterUpdateListener(cb) {
    for (let i = 0; i < Bus.updateListeners.length; i++) {
      if (Bus.updateListeners[i] === cb) {
        Bus.updateListeners.splice(i, 1);
        break;
      }
    }
  },

  notifyUpdateListeners(data) {
    for (let i = 0; i < Bus.updateListeners.length; i++) {
      Bus.updateListeners[i](data);
    }
  },

  update(data) {
    const oldState = Bus.state;
    Bus.state = data;

    Bus.notifyUpdateListeners({
      curr: data,
      prev: oldState,
    });

    Bus.persistState();
  },

  persistState() {
    localStorage[STORAGE_KEY]= JSON.stringify(Bus.state.toJS());
  },

  // Updators, used by promise-chain generator methods for isomorphic updates
  updates: {
    
    // Updates a single model by ID, expects data on the root response
    single: (modelName, nSingle) => {
      return (res) => {
        const data = res[nSingle];

        if (data.id) {
          data.id = String(data.id);
        }

        const iM = Immutable.fromJS(data);

        Bus.update(Bus.state.setIn([modelName, data.id], iM));

        return iM;
      };
    },

    // Updates multiple models by ID, expects an array of data objects on the
    // root response.
    multiple: (modelName, _, nMultiple) => {
      return (res) => {
        const data = res[nMultiple];
        const iData = Immutable.Map();
        let state = Bus.state;

        for (let i = 0; i < data.length; i++) {
          if (data[i].id) {
            data[i].id = String(data[i].id);
          }

          const iM = Immutable.fromJS(data[i]);

          state = state.setIn([modelName, data[i].id], iM);
          iData.set(data[i].id, iM);
        }

        Bus.update(state);

        return iData;
      };
    },

    // Deletes a single model by ID, expects the ID on the root response
    delete: (modelName, nSingle) => {
      return (res) => {
        const data = res[nSingle];

        if (data.id) {
          data.id = String(data.id);
        }

        Bus.update(Bus.state.deleteIn([modelName, data.id]));

        return Immutable.fromJS(data);
      };
    },

    // Expects an array of models w/ IDs on the reponse, and deletes all local
    // matches.
    deleteMultiple: (modelName, _, nMultiple) => {
      return (res) => {
        const data = res[nMultiple];
        const localCollection = Bus.state.get(modelName);
        let state = Bus.state;

        for (let i = 0; i < data.length; i++) {
          if (data[i].id) {
            data[i].id = String(data[i].id);
          }

          if (localCollection.has(data[i].id)) {
            state = state.deleteIn([modelName, data[i].id]);
          }
        }

        Bus.update(state);

        return Immutable.fromJS(data);
      };
    },
  },

};

Bus.actions = {
  reward: RewardActions(Bus),
  poll: PollActions(Bus),
  user: UserActions(Bus),
};

window.bus = Bus;

export default Bus;
