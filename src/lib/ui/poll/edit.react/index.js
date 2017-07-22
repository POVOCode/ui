import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import Dropdown from "../../dropdown.react";

import { forms as Forms, ternaryFunc } from "../../../util/methods";
import "./style.styl";

class PollEditView extends React.Component {

  constructor(props) {
    super(props);

    this.initialState = {};
    this.state = {
      dirty: false,
    };

    Forms.setupComponentFormElements(this, { dirty: true }, [{
      c: this, key: "title", val: "", cb: "onTitleChange",
    }]);
  }

  render() {
    const { title } = this.state;

    /**
     * TODO: external LabelledDropdown
     */
    return (
      <div id="pv-poll-edit">
        <section id="pv-pe-sidebar">
          <span>Icon</span>

          <input
            type="text"
            placeholder="Poll Title/Question Here"
            value={this.state.title}
            onChange={this.onTitleChange}
          />

          <textarea
            placeholder="Poll description here"
            value={this.state.description}
            onChange={this.onDescriptionChange}
            rows={10}
          />
        </section>

        <section id="pv-pe-products">
          <header>
            <div>
              <p>Select Product(s)</p>
              <span>4 / 4</span>
            </div>

            <select value="d">
              <option value="d">Search for products</option>
            </select>
          </header>

          <article>
            <ul>
              <li className="pv-product-card-small" />
              <li className="pv-product-card-small selected" />
              <li className="pv-product-card-small" />
              <li className="pv-product-card-small" />
              <li className="pv-product-card-small selected" />
              <li className="pv-product-card-small" />
              <li className="pv-product-card-small" />
              <li className="pv-product-card-small selected" />
              <li className="pv-product-card-small selected" />
              <li className="pv-product-card-small" />
              <li className="pv-product-card-small" />
              <li className="pv-product-card-small" />
            </ul>
          </article>
        </section>

        <div id="pc-form-bottombar">
          <ul>
            <li>
              <a
                href="#"
              >Cancel</a>
            </li>
            
            <li>
              <button>
                <span>Finish</span>
                <span className="pt-icon-standard pt-icon-arrow-right" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};

PollEditView.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default PollEditView;
