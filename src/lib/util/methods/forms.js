export default {
  onChangeCallbackForType({ c, type, key, extraState }) {
    if (type === "checkbox") {
      return (e) => {
        c.setState({
          ...(extraState || {}),
          [key]: e.target.checked,
        });
      };
    } else if (type === "multiselect") {
      return (e) => {
        if (e instanceof Array) {
          c.setState({
            ...(extraState || {}),
            [key]: e.map(i => i.value).join(","),
          });
        } else {
          c.setState({
            ...(extraState || {}),
            [key]: e.target.value,
          });
        }
      };
    } else if (type === "number") {
      return (e) => {
        c.setState({
          ...(extraState || {}),
          [key]: Number(e.target.value),
        });
      };
    }

    return (e) => {
      c.setState({
        ...(extraState || {}),
        [key]: e.target.value,
      });
    };
  },

  onChangeCBForOptionClick({ c, key, extraState }) {
    return (e) => {
      c.setState({
        ...(extraState || {}),
        [key]: `${c.state[key]}{option.value}`,
      });
    };
  },

  /**
   * Sets up a new form-controlled state key/value pair, registering the
   * callback & setting up initial state. See options.
   *
   * @param {Object} elm 
   * @option elm {Object} c component to modify
   * @option elm {String} key name of state key to save data under
   * @option elm {Any} val initial value
   * @option elm {Method} cb name of callback to create & register
   */
  setupComponentFormElement(elm) {
    const { c, key, val, cb } = elm;

    c.initialState[key] = val;
    c[cb] = this.onChangeCallbackForType(elm);
  },

  setupComponentFormElements(c, extraState, elms) {
    for (let i = 0; i < elms.length; i++) {
      elms[i].c = c;

      if (extraState) {
        if (!elms[i].extraState) elms[i].extraState = {};

        Object.assign(elms[i].extraState, extraState);
      }

      this.setupComponentFormElement(elms[i]);
    }
  },
};
