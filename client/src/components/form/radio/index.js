"use client";
import React from "react";
const RadioButton = ({ data, handleChange }) => {
  const { id, value, name, checkValue } = data;
  return (
    <>
      <input
        className="mx-4"
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
      ></input>
      <label for={value}>{checkValue}</label>
    </>
  );
};
export default RadioButton;
