import React from "react";
import "./style.styl";

const Logo = (props) => {
  return (
    <div className="pvc-logo" {...props}>
      <img src="/img/logo.png" />
    </div>
  );
};

export default Logo;
