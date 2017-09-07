import React from "react";
import PropTypes from "prop-types";

import { ternaryFunc, mergeClassNames } from "../../../util/methods";
import "./style.styl";

const CommentForm = ({
  disabled, label, placeholder, value, onChange, onSubmit,
}) => {
  return (
    <div className={mergeClassNames("pvc-comment-form", {
      disabled,
    })}>
      <h5>{label || "Comment"}</h5>

      <textarea
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={!onSubmit || disabled}
        onKeyPress={!onSubmit ? undefined : (e) => {
          if (e.which === 43) {
            onSubmit();
          }
        }}
      />

      <button
        disabled={!onSubmit || disabled}
        onClick={onSubmit}
      >Post</button>
    </div>
  );
};

CommentForm.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CommentForm;
