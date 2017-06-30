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

};

const instance = new PollAPI();

export default instance;
