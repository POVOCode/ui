import { default as BaseAPI } from "./base";

class PollAPI extends BaseAPI {

  constructor() {
    super("pv.api.poll");
  }

  /**
   * @return {promise} promise
   */
  getAll() {
    return this._get("/polls");
  }

  /**
   * @param {Map} poll
   * @return {promise} promise
   */
  create(poll) {
    return this._post("/polls", { poll });
  }

  /**
   * @param {Map} poll
   * @return {promise} promise
   */
  update(poll) {
    return this._put(`/polls/${poll.get("id")}`, { poll });
  }

  /**
   * @param {Map} poll
   * @return {promise} promise
   */
  delete(poll) {
    return this._delete(`/polls/${poll.get("id")}`);
  }

};

const instance = new PollAPI();

export default instance;
