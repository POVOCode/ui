/**
 * Simple helper that helps reduce the size of ternary expressions in react
 * component render() methods.
 *
 * @param {boolean} condition
 * @param {function} trueCb executed if the condition is truthy
 * @param {function} [falseCb] executed if the condition is falsy
 * @return {*} cb result
 *
 * @flow
 */
export default (condition, trueCb, falseCb) => {
  return condition ? trueCb() : (falseCb ? falseCb() : null);
};

