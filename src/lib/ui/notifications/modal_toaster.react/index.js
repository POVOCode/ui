import React from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import { ternaryFunc, mergeClassNames } from "../../../util/methods";
import "./style.styl";

const ModalToaster = ({ toast }) => {
  return (
    <div id="pv-modal-toaster">
      {ternaryFunc(toast, () =>
        <div
          id="pv-modal-toast"
          onClick={toast.get("onClick")}
        >
          <div>
            <p>{toast.get("message")}</p>

            {ternaryFunc(toast.get("onClick"), () =>
              <span className="pt-icon-standard pt-icon-chevron-right" />
            )}
          </div>

          <span
            className="pt-icon-standard pt-icon-cross"
            onClick={toast.get("onClose")}
          />
        </div>
      )}
    </div>
  );
};

ModalToaster.propTypes = {
  toast: PropTypes.object,
};

export default ModalToaster;
