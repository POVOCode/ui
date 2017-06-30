import { default as BaseAPI } from "./base";

class RewardAPI extends BaseAPI {

  constructor() {
    super("pv.api.reward");
  }

  /**
   * @return {promise} promise
   */
  getAll() {
    return this._get("/rewards");
  }

};

const instance = new RewardAPI();

export default instance;
