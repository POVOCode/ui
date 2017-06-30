import nanoajax from "nanoajax";
import _chunk from "lodash.chunk";
import _uniqBy from "lodash.uniqby";
import _merge from "lodash.merge";

import { default as BasicNode } from "../nodes/basic";
import { APIError } from "../errors";
import Config from "../../config";

/**
 * API base class, providing a global endpoint and helper methods for cleaner
 * API calls + logging.
*/
class BaseAPI extends BasicNode {

  /**
   * @param {string} id API id for logging
  */
  constructor(id) {
    super(id);

    // Requests are given IDs before being executed, saved on this hash, and
    // removed upon finish. This is used to implement the abortAll() method
    this._activeRequests = {};
    this.url = Config.apiURL;

    this.log.info(`Registered API ${id}`);
  }

  /**
   * Used for request tracking on the backend. Expected to unique-enough.
   *
   * @return {string} id
   */
  _getRequestID() {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  /**
   * Calls abort() on all currently active requests (that we know of)
   */
  abortAll() {
    Object.keys(this._activeRequests).forEach((id) => {
      if(this._activeRequests[id] && this._activeRequests[id].abort) {
        try {
          this._activeRequests[id].abort();
        } catch (e) {}
      }
    });

    this._activeRequests = {};
  }

  /**
   * Helper to construct a valid API route
   *
   * @param {String} path absolute or relative API route/command
   * @return {String} url
   */
  getURLForPath(path) {
    if(/^http?:\/\//.test(path)) {
      return path;
    } else {
      return "" + this.url + path;
    }
  }

  /**
   * @param {string} method
   * @param {string} path
   * @param {object} data
   * @param {object} extraParams
   * @private
   */
  _sendRequest(method, path, data, extraParams) {
    const url = this.getURLForPath(path);
    const requestId = this._getRequestID();

    let params = {
      method,
      url,
      headers: {
        "X-Request-Id": requestId
      },
      body: data,
      withCredentials: true,
      cors: true
    };

    if (!(data instanceof FormData)) {
      params.body = JSON.stringify(data);
      params.headers["Content-Type"] = "application/json";
    }

    params = _merge(params, extraParams);

    let callback = undefined;
    const promise = new Promise((resolve, reject) => {
      callback = this._handleResponse(resolve, reject, requestId);
    });

    this.log.debug(`${method} ${path}`);
    promise.xhr = this._activeRequests[requestId] = nanoajax.ajax(params, callback);

    return promise;
  }

  /**
   * Generates a nano ajax response callback which calls either one of a
   * resolve/reject method pair based on the response result. Handles active
   * request ID cleanup.
   *
   * @param {function} resolve
   * @param {function} reject
   * @param {string} requestId
   * @return {function} handler
   */
  _handleResponse(resolve, reject, requestId) {
    return (code, res, req) => {
      delete this._activeRequests[requestId];

      if (res) {
        try {
          res = JSON.parse(res);
        } catch (e) {}
      }

      if (res == "Abort") {
        reject(new APIError("Request aborted"));
      } else if (res == "Timeout") {
        reject(new APIError("Request timed out"));
      } else if (res == "Error") {
        reject(new APIError("Request failed before completing"));
      } if (code == 0) {
        reject(new APIError("Could not connect"));
      } else if (code >= 400) {
        reject(new APIError(res));
      } else {
        resolve(res, code);
      }
    };
  }

  /**
   * Perform a GET request on the specified path
   *
   * @param {string} path
   * @param {object} [extraParams]
   * @return {Promise} promise
   */
  _get(path, extraParams = {}) {
    return this._sendRequest("GET", path, undefined, extraParams);
  }

  /**
   * Perform a POST request on the specified path
   *
   * @param {string} path
   * @param {object} [data]
   * @param {object} [extraParams]
   * @return {Promise} promise
   */
  _post(path, data = {}, extraParams = {}) {
    return this._sendRequest("POST", path, data, extraParams);
  }

  /**
   * Perform a PUT request on the specified path
   *
   * @param {string} path
   * @param {object} [data]
   * @param {object} [extraParams]
   * @return {Promise} promise
   */
  _put(path, data = {}, extraParams = {}) {
    return this._sendRequest("PUT", path, data, extraParams);
  }

  /**
   * Perform a DELETE request on the specified path
   *
   * @param {string} path
   * @param {object} [extraParams]
   * @return {Promise} promise
   */
  _delete(path, extraParams = {}) {
    return this._sendRequest("DELETE", path, undefined, extraParams);
  }

}

export default BaseAPI;
