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
