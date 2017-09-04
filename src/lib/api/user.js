import { default as BaseAPI } from "./base";

class UserAPI extends BaseAPI {

  constructor() {
    super("dt.api.users");
  }

  /**
   * @return {promise} promise
   */
  getAll() {
    return this._get("/users");
  }

  /**
   * @return {promise} promise
   */
  getActive() {
    return this._get("/user");
  }

  /**
   * @param {Object} opts
   * @option opts {String} username
   * @option opts {String} email
   * @option opts {String} password optional
   * @option opts {String} verifyPassword optional, confirms password
   * @option opts {String} currentPassword needed for password changes
   * @return {promise} promise
   */
  updateUser({ username, email, password, verifyPassword, currentPassword }) {
    // TODO: Encrypt or hash password over the wire
    return this._post("/user", {
      user: {
        username: username || "",
        email: email || "",
        password: password || "",
        verifyPassword: verifyPassword || "",
        currentPassword: currentPassword || "",
      },
    });
  }

  /**
   * @param {String} username
   * @param {String} password
   * @return {promise} promise
   */
  login({ username, password }) {
    // TODO: Encrypt or hash password over the wire
    return this._post("/login", {
      username,
      password,
    });
  }

  preRegister({
    username, email, password, postcode, interests, enableEmailUpdates
  }) {
    return this._post("/preregister", {
      username,
      email,
      password,
      postcode,
      interests,
      enableEmailUpdates,
    });
  }

  /**
   * @return {promise} promise
   */
  logout() {
    return this._get("/logout");
  }
}

const instance = new UserAPI();

export default instance;
