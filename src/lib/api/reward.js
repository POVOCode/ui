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

  /**
   * @param {Map} reward
   * @return {promise} promise
   */
  create(reward) {
    return this._post("/rewards", { reward });
  }

  /**
   * @param {Map} reward
   * @return {promise} promise
   */
  update(reward) {
    return this._put(`/rewards/${reward.get("id")}`, { reward });
  }

  /**
   * @param {Map} reward
   * @return {promise} promise
   */
  delete(reward) {
    return this._delete(`/rewards/${reward.get("id")}`);
  }

};

const instance = new RewardAPI();

export default instance;
