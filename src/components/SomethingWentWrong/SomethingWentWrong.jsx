import React from "react";
import "./SomethingWentWrong.scss";

const SomethingWentWrong = ({ h1, h2, p1, p2, ...props }) => {
  return (
    <div className="uni-error" {...props}>
      <h1>{h1}</h1>
      <h2>{h2}</h2>
      <p>{p1}</p>
      <p>{p2}</p>
    </div>
  );
};

export default SomethingWentWrong;
