import loglevel from "../vendor/loglevel";

class BasicNode {

  /**
   * Initialise us with an ID for logging
   *
   * @param {string} id
   */
  constructor(id) {
    this._id = id;

    this.log = loglevel.getLogger(id);
    this.log.setLevel(0); // TODO: Break this out
  }

  /**
   * Returns our current ID
   *
   * @return {string} ID
   */
  getID() {
    return this._id;
  }

}

export default BasicNode;
