import { useState } from "react";
import React from "react";
import "./styles.css";

const Square = (props) => {
  return (
    <button
      className="Square"
      onClick={() => {
        props.onClick();
      }}
    >
      {props.value}
    </button>
  );
};

export default Square;
