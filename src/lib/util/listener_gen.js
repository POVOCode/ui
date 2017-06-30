/**
 * Generates a method triplet for adding, removing, and notifying a collection
 * of listeners.
 *
 * @return {object} iface
 */
const genListenerInterface = () => {
  const listeners = [];

  return {

    /**
     * Add a single listener method. Does not enforce uniqueness
     *
     * @param {function} cb
     */
    add(cb) {
      listeners.push(cb);
    },

    /**
     * Removes the first matching listener
     *
     * @param {function} cb
     */
    remove(cb) {
      let i = -1;

      listeners.forEach((l, index) => {
        if(l == cb) {
          i = index;
        }
      });

      if(i != -1) {
        listeners.splice(i, 1);
      }
    },

    /**
     * Passes a data packet to every registered listener
     *
     * @param {object} packet
     */
    notify(packet) {
      listeners.forEach((cb) => {
        cb(packet);
      });
    },

    /**
     * Get the full listener array
     *
     * @return {array<method>} listeners
     */
    all() {
      return listeners;
    }
  };
};

export default genListenerInterface;

