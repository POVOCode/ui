import ExtendableError from "es6-error";

class APIError extends ExtendableError {

  /**
   * @param {object} response can be a detail string
   * @option opts {number} status
   * @option opts {string} detail
   * @option opts {string} type
   * @option opts {string} title
   */
  constructor(response) {
    if (typeof response == "string") {
      super(response);
      this._response = { detail: response };
    } else {
      super(response.detail);
      this._response = response;
    }
  }

  /**
   * @return {object}
   */
  getResponse() {
    return this._response;
  }

  /**
   * @return {number}
   */
  getStatus() {
    return this._response.status;
  }

  /**
   * @return {string}
   */
  getDetail() {
    return this._response.detail;
  }

  /**
   * @return {string}
   */
  getType() {
    return this._response.type;
  }

  /**
   * @return {string}
   */
  getTitle() {
    return this._response.title;
  }
};

export default APIError;
